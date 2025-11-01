import { supabase } from "../lib/supabaseClient";
import { getVisitorId } from "./visitor";

export const trackEvent = async (event_type, event_target) => {
  try {
    await supabase.from("website_events").insert({
      visitor_id: getVisitorId(),
      event_type,
      event_target
    });

    console.log(`✅ Event logged: ${event_type} - ${event_target}`);
  } catch (err) {
    console.error("❌ Event logging error:", err);
  }
};
