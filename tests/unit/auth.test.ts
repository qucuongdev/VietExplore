import { beforeEach, describe, expect, it, vi } from 'vitest';
import { signIn, signOut } from '@/actions/auth';
import { getIdentity, requireAdmin } from '@/lib/auth';

const mocks = vi.hoisted(() => ({
  createClient: vi.fn(), getUser: vi.fn(), passwordSignIn: vi.fn(), signOut: vi.fn(), profile: vi.fn(),
  redirect: vi.fn(({ href, locale }: { href: string; locale: string }): never => { throw new Error(`REDIRECT:${locale}${href}`); }),
}));
vi.mock('@/lib/supabase/server', () => ({ createSupabaseServerClient: mocks.createClient }));
vi.mock('@/i18n/navigation', () => ({ redirect: mocks.redirect }));

function credentials(email = 'editor@example.test', password = 'editor-password') {
  const form = new FormData(); form.set('email', email); form.set('password', password); return form;
}

beforeEach(() => {
  vi.clearAllMocks();
  mocks.createClient.mockResolvedValue({
    auth: { getUser: mocks.getUser, signInWithPassword: mocks.passwordSignIn, signOut: mocks.signOut },
    from: () => ({ select: () => ({ eq: () => ({ maybeSingle: mocks.profile }) }) }),
  });
  mocks.getUser.mockResolvedValue({ data: { user: { id: 'user-id', email: 'editor@example.test', user_metadata: { role: 'admin' } } }, error: null });
  mocks.passwordSignIn.mockResolvedValue({ data: { user: { id: 'user-id' } }, error: null });
  mocks.profile.mockResolvedValue({ data: { role: 'reader', display_name: 'An editor' }, error: null });
});

describe('Login and server authorization', () => {
  it('validates credentials before calling the provider and preserves password whitespace', async () => {
    expect(await signIn('en', {}, credentials('invalid'))).toEqual({ error: 'invalid' });
    expect(mocks.createClient).not.toHaveBeenCalled();
    await expect(signIn('en', {}, credentials('editor@example.test', ' pass word '))).rejects.toThrow('REDIRECT:en/');
    expect(mocks.passwordSignIn).toHaveBeenCalledWith({ email: 'editor@example.test', password: ' pass word ' });
  });
  it('reports missing configuration without a fake login', async () => {
    mocks.createClient.mockResolvedValue(null);
    expect(await signIn('vi', {}, credentials())).toEqual({ error: 'unavailable' });
    expect(await getIdentity()).toBeNull();
  });
  it.each([[400, 'credentials'], [429, 'rateLimit'], [503, 'unavailable']])('handles provider error %s without leaking provider details', async (status, error) => {
    mocks.passwordSignIn.mockResolvedValue({ data: {}, error: { status, message: 'Sensitive provider details' } });
    expect(await signIn('en', {}, credentials())).toEqual({ error });
    expect(mocks.redirect).not.toHaveBeenCalled();
  });
  it('redirects admins to the workspace using a database-controlled role', async () => {
    mocks.profile.mockResolvedValue({ data: { role: 'admin' }, error: null });
    await expect(signIn('vi', {}, credentials())).rejects.toThrow('REDIRECT:vi/admin/posts');
  });
  it('returns readers to the public site and does not grant access from user metadata', async () => {
    await expect(signIn('en', {}, credentials())).rejects.toThrow('REDIRECT:en/');
    expect((await getIdentity())?.role).toBe('reader');
    await expect(requireAdmin('en')).rejects.toThrow('REDIRECT:en/login?error=forbidden');
  });
  it('denies admin access when profile lookup fails or the user is signed out', async () => {
    mocks.profile.mockResolvedValue({ data: null, error: { message: 'database offline' } });
    expect((await getIdentity())?.role).toBe('reader');
    expect(await signIn('en', {}, credentials())).toEqual({ error: 'unavailable' });
    mocks.getUser.mockResolvedValue({ data: { user: null }, error: null });
    await expect(requireAdmin('vi')).rejects.toThrow('REDIRECT:vi/login');
  });
  it('signs out before returning to login', async () => {
    await expect(signOut('en')).rejects.toThrow('REDIRECT:en/login');
    expect(mocks.signOut).toHaveBeenCalledOnce();
  });
});
