import { Provider, AuthApiError } from "@supabase/supabase-js";
import { supabase } from "@/composables/useSupabase";
import { useUtils } from "@/composables/useUtils";
import { ref, Ref } from "vue";
import { Login, Register, Redirect, ErrorResponse } from "@/globalvar";

// user is set outside of the useAuthUser function
// so that it will act as global state and always refer to a single user
const user = ref(null);
const { createErrorResponse, handleRedirect } = useUtils();
type OAuthResponseType = Redirect | ErrorResponse;

export default function useAuthUser(): {
  error: Ref<string | null>;
  register: ({ email, password, accepted }: Register) => Promise<string>;
  signInWithOAuth: (provider: Provider) => Promise<string>;
  logout: () => Promise<void>;
} {
  const error = ref<string | null>(null);

  /**
   * Register with email and password
   */
  const register = async ({
    email,
    password,
    accepted,
  }: Register): Promise<string> => {
    if (!accepted) {
      error.value = "You must accept the terms and conditions.";
      return error.value;
    }

    const { error: Err } = await supabase.auth.signUp({
      email,
      password,
    });

    Err ? (error.value = Err.message) : (error.value = "");
    return error.value;
  };

  /**
   * Login with email and password
   */
  const login = async ({ email, password }: Login): Promise<void> => {
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });
  };

  /**
   * Login with google, github, etc
   */

  const signInWithOAuth = async (provider: Provider): Promise<string> => {
    const { data, error: Err } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: "http://localhost:5173/dashboard/personal",
      },
    });

    Err ? (error.value = Err.message) : (error.value = "");
    return error.value;
  };

  /**
   * Logout
   */
  const logout = async (): Promise<void> => {
    await supabase.auth.signOut();
  };

  /**
   * Check if the user is logged in or not
   */
  const isLoggedIn = () => {};

  /**
   * Update user email, password, or meta data
   */
  const update = async (data) => {};

  /**
   * Send user an email to reset their password
   * (ie. support "Forgot Password?")
   */
  const sendPasswordRestEmail = async (email) => {};

  return {
    register,
    login,
    signInWithOAuth,
    isLoggedIn,
    user,
    logout,
    update,
    sendPasswordRestEmail,
  };
}
