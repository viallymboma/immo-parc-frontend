import type { UserConfig } from 'next-i18next';

import path from 'path';

// Extend the UserConfig type to include localeDetection
interface ExtendedUserConfig extends UserConfig {
    localeDetection?: boolean;
}

const config: ExtendedUserConfig = {
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'fr', 'es'], // Define your supported languages here
  },
  // Disable locale detection if you don't want Next.js to change URLs
  localeDetection: false,
  localePath: path.resolve('./public/locales'), // Path to your translation files
  react: { useSuspense: false },
//   reloadOnPrerender: process.env.NODE_ENV === 'development', // Optional, for development reloads
};

export default config;