import { createClient, AuthApiError } from "@supabase/supabase-js";
// Router
import { useRouter } from "vue-router";
// Vue
import { onMounted } from "vue";

// Supabase keys
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Supabase Clients
const supabase = createClient(supabaseUrl, supabaseAnonKey);
export default {
  setup() {
    // Inialization
    const router = useRouter();

    onMounted(() => {
      supabase.auth.onAuthStateChange((event, session) => {
        console.log("Event", event);
        console.log("session", session);

        if (event === "SIGNED_IN") {
          router.push("/dashboard/personal");
        } else if (event === "SIGNED_OUT") {
          console.log("User signed out");
        }
      });
    });

    return {
      AuthApiError,
    };
  },
};
export { supabase };
