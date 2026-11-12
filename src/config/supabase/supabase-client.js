import { createClient } from "https://esm.sh/@supabase/supabase-js@2.119.0";
import { APP_CONFIG } from "../app.config.js";

export const supabase = createClient(
    APP_CONFIG.supabase.url,
    APP_CONFIG.supabase.publishableKey
);
