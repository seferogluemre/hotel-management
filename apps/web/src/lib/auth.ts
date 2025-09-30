import { env } from '#config/env.ts';
import { betterAuth } from '@onlyjs/api/modules/auth/authentication/instance.ts';
import { customSessionClient } from 'better-auth/client/plugins';
import { createAuthClient } from 'better-auth/react';

export const authClient = createAuthClient({
  baseURL: env.apiUrl,
  basePath: '/auth',
  plugins: [customSessionClient<typeof betterAuth>()],
});
