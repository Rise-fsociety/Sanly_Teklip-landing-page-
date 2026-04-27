import createMiddleware from 'next-intl/middleware';
 
export default createMiddleware({
  locales: ['tm', 'ru', 'en'],
 
  defaultLocale: 'tm'
});
 
export const config = {
  matcher: ['/', '/(tm|ru|en)/:path*', '/((?!api|_next|_vercel|.*\\..*).*)']
};
