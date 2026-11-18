import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { routing } from './i18n/routing';
import { resolvePreferredLocale } from './lib/locale';
import { refreshAuthSession } from './lib/supabase/proxy';

const intlMiddleware = createMiddleware(routing);

export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Root bare URL redirect logic
  if (pathname === '/') {
    const acceptLanguage = request.headers.get('accept-language');
    const cookieLocale = request.cookies.get('NEXT_LOCALE')?.value;
    const targetLocale = resolvePreferredLocale(acceptLanguage, cookieLocale);

    const url = request.nextUrl.clone();
    url.pathname = `/${targetLocale}`;
    const response = NextResponse.redirect(url);
    return response;
  }

  // Next-intl middleware for all other matched paths
  const authResponse = await refreshAuthSession(request);
  const response = intlMiddleware(request);
  // Articles are authored independently per language; a translated sibling may not exist.
  if (/^\/(vi|en)\/blog\/[^/]+\/?$/.test(pathname)) response.headers.delete('link');
  authResponse.cookies.getAll().forEach((cookie) => response.cookies.set(cookie));
  for (const name of ['cache-control', 'expires', 'pragma']) {
    const value = authResponse.headers.get(name);
    if (value) response.headers.set(name, value);
  }

  // Sync NEXT_LOCALE cookie when visiting explicit /vi or /en paths
  const match = pathname.match(/^\/(vi|en)(\/.*)?$/);
  if (match) {
    const pathLocale = match[1];
    response.cookies.set('NEXT_LOCALE', pathLocale, {
      path: '/',
      maxAge: 60 * 60 * 24 * 365,
      sameSite: 'lax',
    });
  }

  return response;
}

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
