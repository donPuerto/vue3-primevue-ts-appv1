import { createClient, Provider, AuthApiError } from "@supabase/supabase-js";
// Router
import { useRouter } from "vue-router";

// Inialization
const router = useRouter();

// Supabase keys
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
// Supabase Clients
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Add an event listener for the onAuthStateChange event
supabase.auth.onAuthStateChange((event, session) => {
  // event can be one of: 'SIGNED_IN', 'SIGNED_OUT', 'USER_UPDATED', 'PASSWORD_RECOVERY'
  // session is the user's session object
  console.log("Event", event);
  console.log("session", session);

  if (event === "SIGNED_IN") {
    // User signed in
    router.replace("http://localhost:5173/dashboard/personal");
  } else if (event === "SIGNED_OUT") {
    // User signed out
    console.log("User signed out");
  }
});

export { supabase };
