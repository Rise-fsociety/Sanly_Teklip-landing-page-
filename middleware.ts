import createMiddleware from 'next-intl/middleware';
 
export default createMiddleware({
  locales: ['tk', 'ru', 'en'],
 
  defaultLocale: 'tk'
});
 
export const config = {
  matcher: ['/', '/(tk|ru|en)/:path*', '/((?!api|_next|_vercel|.*\\..*).*)']
};
