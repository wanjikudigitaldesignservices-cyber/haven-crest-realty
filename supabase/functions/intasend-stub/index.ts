// Supabase Edge Function: intasend-stub
// Stubbed IntaSend (M-Pesa) integration endpoint per Layer 2 & Layer 6 specifications

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    return new Response(
      JSON.stringify({
        status: "disabled_phase_1",
        code: "PAYMENTS_NOT_ACTIVATED",
        message: "IntaSend M-Pesa payments are not activated during Phase 1. Online booking and viewing requests are currently complementary.",
        timestamp: new Date().toISOString(),
      }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
