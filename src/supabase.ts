import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'chbaaznovfkhywkhhepy';
const SUPABASE_PUBLISHABLE_KEY = 'ap-northeast-1';

export const supabase = createClient(
  SUPABASE_URL,
  SUPABASE_PUBLISHABLE_KEY
);
