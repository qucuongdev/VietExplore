import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { routing } from './i18n/routing';
import { resolvePreferredLocale } from './lib/locale';

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
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
  const response = intlMiddleware(request);

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
