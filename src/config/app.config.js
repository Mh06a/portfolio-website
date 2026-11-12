/**
 * Central runtime configuration.
 *
 * The publishable key is designed to be public (it is shipped to every browser).
 * Real protection comes from Row Level Security policies in Supabase, not from hiding this key.
 * NEVER put a service_role / secret key in this file.
 */
export const APP_CONFIG = Object.freeze({
    supabase: Object.freeze({
        // Base project URL only. Do NOT append /rest/v1/ – the SDK adds it itself.
        url: "https://adcarinkypuhatigarfk.supabase.co",
        publishableKey: "sb_publishable_UrJB8CJ_tzBWtCZVC7ULUg_X1au3FL0",
        storageBucket: "portfolio-assets",
    }),
});
