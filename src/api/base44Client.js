import { createClient } from '@base44/sdk';
// import { getAccessToken } from '@base44/sdk/utils/auth-utils';

// Create a client with authentication required
export const base44 = createClient({
  appId: "690553b61c1c5d3e58212524", 
  requiresAuth: true // Ensure authentication is required for all operations
});
