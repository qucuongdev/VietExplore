// A loopback-only Auth/PostgREST/Storage service double for browser tests.
// Production code has no test identity switch or authorization bypass.
import { createServer } from 'node:http';
import { createHmac, randomBytes, randomUUID } from 'node:crypto';

export async function startSupabaseService() {
  const password = randomBytes(24).toString('hex');
  const secret = randomBytes(32);
  const accounts = [
    { id: randomUUID(), email: 'admin@example.test', role: 'admin' },
    { id: randomUUID(), email: 'reader@example.test', role: 'reader' },
  ];
  const tokens = new Map();
  const refreshTokens = new Map();
  const posts = [];
  let baseUrl;
  const user = (account) => ({ id: account.id, email: account.email, aud: 'authenticated', role: 'authenticated', app_metadata: { provider: 'email', providers: ['email'] }, user_metadata: { role: 'admin' }, created_at: new Date().toISOString() });
  const session = (account) => {
    const now = Math.floor(Date.now() / 1000);
    const header = Buffer.from(JSON.stringify({ alg: 'HS256', typ: 'JWT' })).toString('base64url');
    const payload = Buffer.from(JSON.stringify({ sub: account.id, email: account.email, role: 'authenticated', aud: 'authenticated', iat: now, exp: now + 3600, iss: `${baseUrl}/auth/v1` })).toString('base64url');
    const accessToken = `${header}.${payload}.${createHmac('sha256', secret).update(`${header}.${payload}`).digest('base64url')}`;
    const refreshToken = randomUUID();
    tokens.set(accessToken, account);
    refreshTokens.set(refreshToken, account);
    return { access_token: accessToken, token_type: 'bearer', expires_in: 3600, expires_at: now + 3600, refresh_token: refreshToken, user: user(account) };
  };
  const server = createServer(async (req, res) => {
    const reply = (status, body, headers = {}) => {
      res.writeHead(status, { 'content-type': 'application/json', 'access-control-allow-origin': '*', 'access-control-allow-headers': '*', 'access-control-allow-methods': 'GET, POST, PATCH, DELETE, OPTIONS', ...headers });
      res.end(body === undefined ? undefined : JSON.stringify(body));
    };
    if (req.method === 'OPTIONS') return reply(204);
    const url = new URL(req.url, baseUrl);
    const accessToken = req.headers.authorization?.replace(/^Bearer /i, '');
    const account = tokens.get(accessToken);
    let body;
    if (['POST', 'PATCH'].includes(req.method)) {
      const chunks = []; for await (const chunk of req) chunks.push(chunk);
      const raw = Buffer.concat(chunks);
      if (req.headers['content-type']?.includes('application/json')) body = raw.length ? JSON.parse(raw.toString()) : {};
    }
    try {
      if (url.pathname === '/auth/v1/token') {
        const found = url.searchParams.get('grant_type') === 'refresh_token' ? refreshTokens.get(body?.refresh_token) : accounts.find((item) => item.email === body?.email && body?.password === password);
        return found ? reply(200, session(found)) : reply(400, { code: 'invalid_credentials', msg: 'Invalid login credentials' });
      }
      if (url.pathname === '/auth/v1/user') return account ? reply(200, user(account)) : reply(401, { code: 'bad_jwt', msg: 'Invalid token' });
      if (url.pathname === '/auth/v1/logout') { tokens.delete(accessToken); return reply(204); }
      if (url.pathname === '/rest/v1/profiles') {
        const rows = account && url.searchParams.get('id') === `eq.${account.id}` ? [{ id: account.id, display_name: account.email.split('@')[0], role: account.role }] : [];
        return reply(200, req.headers.accept?.includes('vnd.pgrst.object') ? rows[0] ?? null : rows);
      }
      if (url.pathname === '/rest/v1/blog_posts') {
        let rows = posts.filter((post) => account?.role === 'admin' || post.status === 'published');
        for (const [key, value] of url.searchParams) {
          if (value.startsWith('eq.')) rows = rows.filter((post) => String(post[key]) === value.slice(3));
          if (key === 'title' && value.startsWith('ilike.')) rows = rows.filter((post) => post.title.toLowerCase().includes(value.slice(6).replaceAll('%', '').toLowerCase()));
        }
        if (req.method !== 'GET' && account?.role !== 'admin') return reply(403, { code: '42501', message: 'Permission denied' });
        if (req.method === 'POST') {
          if (posts.some((post) => post.locale === body.locale && post.slug === body.slug)) return reply(409, { code: '23505', message: 'Duplicate slug' });
          const post = { id: randomUUID(), created_at: new Date().toISOString(), updated_at: new Date().toISOString(), version: 1, ...body };
          posts.push(post); rows = [post];
        }
        if (req.method === 'PATCH') {
          for (const post of rows) Object.assign(post, body, { version: post.version + 1, updated_at: new Date().toISOString() });
        }
        if (req.method === 'DELETE') for (const post of rows) posts.splice(posts.indexOf(post), 1);
        const total = rows.length;
        if (req.method === 'GET') {
          rows.sort((a, b) => b.updated_at.localeCompare(a.updated_at));
          const offset = Number(url.searchParams.get('offset') || 0);
          rows = rows.slice(offset, offset + Number(url.searchParams.get('limit') || rows.length));
        }
        const headers = { 'content-range': rows.length ? `0-${rows.length - 1}/${total}` : `*/${total}` };
        if (req.headers.accept?.includes('vnd.pgrst.object')) {
          if (rows.length !== 1) return reply(406, { code: 'PGRST116', details: `The result contains ${rows.length} rows`, message: 'Expected a single row' }, headers);
          return reply(200, rows[0], headers);
        }
        return reply(200, rows, headers);
      }
      if (url.pathname.startsWith('/storage/v1/object/blog-images/')) return account?.role === 'admin' ? reply(200, { Key: url.pathname.slice('/storage/v1/object/'.length), Id: randomUUID() }) : reply(403, { message: 'Permission denied' });
      if (url.pathname.startsWith('/storage/v1/object/public/blog-images/')) {
        res.writeHead(200, { 'content-type': 'image/png', 'access-control-allow-origin': '*' });
        return res.end(Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+jWQAAAABJRU5ErkJggg==', 'base64'));
      }
      return reply(404, { message: 'Not found' });
    } catch {
      return reply(500, { message: 'Test service error' });
    }
  });
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
  baseUrl = `http://127.0.0.1:${server.address().port}`;
  return { url: baseUrl, key: 'sb_publishable_browser_test', password, accounts, posts, close: () => new Promise((resolve) => server.close(resolve)) };
}
