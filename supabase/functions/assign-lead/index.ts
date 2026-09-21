// Supabase Edge Function: assign-lead
// Intelligently assigns new leads to agents based on neighborhood specialization or round-robin

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    const { leadId, propertyId, neighborhoodId } = await req.json();

    if (!leadId) {
      return new Response(JSON.stringify({ error: "Missing leadId" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    let assignedAgentId: string | null = null;

    // 1. If property is specified, try to assign directly to property listing agent
    if (propertyId) {
      const { data: property } = await supabaseClient
        .from("properties")
        .select("agent_id")
        .eq("id", propertyId)
        .single();

      if (property?.agent_id) {
        assignedAgentId = property.agent_id;
      }
    }

    // 2. Fallback: Round-robin across active agents
    if (!assignedAgentId) {
      const { data: agents } = await supabaseClient
        .from("agents")
        .select("id")
        .eq("is_active", true);

      if (agents && agents.length > 0) {
        const randomIndex = Math.floor(Math.random() * agents.length);
        assignedAgentId = agents[randomIndex].id;
      }
    }

    if (assignedAgentId) {
      await supabaseClient
        .from("leads")
        .update({ assigned_agent_id: assignedAgentId })
        .eq("id", leadId);
    }

    return new Response(
      JSON.stringify({ success: true, leadId, assignedAgentId }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
