/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SUPABASE_URL: string;
  readonly VITE_SUPABASE_ANON_KEY: string;
  readonly VITE_MAPBOX_TOKEN: string;
  readonly VITE_AGENCY_NAME: string;
  readonly VITE_AGENCY_PHONE: string;
  readonly VITE_AGENCY_EMAIL: string;
  readonly VITE_AGENCY_ADDRESS: string;
  readonly VITE_MAKE_WEBHOOK_URL: string;
  readonly VITE_INTASEND_PUBLIC_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
