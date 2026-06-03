import { createNavigation } from 'next-intl/navigation';
import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['tk', 'ru', 'en'],
  defaultLocale: 'tk'
});

export const { Link, redirect, usePathname, useRouter } = createNavigation(routing);
