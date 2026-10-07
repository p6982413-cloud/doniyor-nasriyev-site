import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://chbaaznovfkhywkhhepy.supabase.co';

const SUPABASE_PUBLISHABLE_KEY = 'sb_publishable_mR2lh6bvLQV2D8b-MFeMPA_fzBwWTtq';

export const supabase = createClient(
  SUPABASE_URL,
  SUPABASE_PUBLISHABLE_KEY
);
