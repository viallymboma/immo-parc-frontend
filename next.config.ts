// next.config.ts
import { NextConfig } from 'next';

import nextI18NextConfig from './next-i18next.config';

const nextConfig: NextConfig = {
  i18n: nextI18NextConfig.i18n, // Include the i18n config
  images: {
    domains: ['photos.fife.usercontent.google.com'],
  },
};

export default nextConfig;