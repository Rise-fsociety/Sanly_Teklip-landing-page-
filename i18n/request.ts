import {getRequestConfig} from 'next-intl/server';
 
export default getRequestConfig(async ({requestLocale}) => {
  let locale = await requestLocale;
  
  if (!locale || !['tm', 'ru', 'en'].includes(locale as string)) {
    locale = 'tm';
  }

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default
  };
});
