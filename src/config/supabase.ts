import { createClient } from '@supabase/supabase-js';

import { env } from './env.js';

// export const supabase = createClient(
//   env.supabaseUrl,
//   env.supabaseKey,
//   {
//     auth: {
//       autoRefreshToken: false,
//       persistSession: false,
//       detectSessionInUrl: false,
//     },
//   },
// );

// Export a factory function (for creating new instances)
export const createSupabaseClient = () => {
  return createClient(env.supabaseUrl, env.supabaseKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
      detectSessionInUrl: false,
    },
  });
};
