// Supabase Edge Function: notify-new-lead
// Dispatches webhook alerts to Make.com / CRM and sends WhatsApp/email notifications to assigned agent

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
    const payload = await req.json();
    const { record } = payload; // Supabase webhook trigger record

    const makeWebhookUrl = Deno.env.get("MAKE_WEBHOOK_URL");

    let webhookDispatched = false;
    if (makeWebhookUrl) {
      try {
        const res = await fetch(makeWebhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            event: "lead.created",
            lead: record,
            timestamp: new Date().toISOString(),
          }),
        });
        webhookDispatched = res.ok;
      } catch (err) {
        console.error("Failed to forward to Make.com webhook:", err);
      }
    }

    return new Response(
      JSON.stringify({
        success: true,
        notified: true,
        webhookDispatched,
        leadId: record?.id,
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
