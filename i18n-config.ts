export const i18n = {
  defaultLocale: "en",
  locales: [ "en",'es','pt','ja','ms-MY','nl'],
};
export type Locale = (typeof i18n)["locales"][number];
