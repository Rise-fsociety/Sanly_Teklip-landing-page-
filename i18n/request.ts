import {getRequestConfig} from 'next-intl/server';
 
export default getRequestConfig(async ({requestLocale}) => {
  let locale = await requestLocale;
  
  if (!locale || !['tk', 'ru', 'en'].includes(locale as string)) {
    locale = 'tk';
  }

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default
  };
});
