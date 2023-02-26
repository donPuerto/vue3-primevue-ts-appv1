<template>
  <div
    class="flex flex-column flex-nowrap justify-content-center align-items-center gap-2 min-h-screen min-w-screen px-3 py-3"
  >
    <Card class="md:w-30rem px-3 md:px-4 py-4 border-round-lg">
      <template #header>
        <div class="flex justify-content-center align-items-center mt-3">
          <img :src="logo" alt="Image" style="height: 4rem; width: 4rem" />
        </div>
      </template>
      <template #title>Welcome Back</template>
      <template #subtitle>Login to your account</template>

      <template #content>
        <div class="flex justify-content-center align-items-center gap-2">
          <Button
            class="google p-1 p-button-rounded p-button-outlined"
            aria-label="Google"
            @click="signInWithGoogleHandler"
          >
            <i class="pi pi-google px-1"></i>
            <span class="px-3">Google</span>
          </Button>

          <Button
            class="facebook p-1 p-button-rounded p-button-outlined"
            aria-label="Facebook"
            @click="signInWithFacebookHandler"
          >
            <i class="pi pi-facebook px-1"></i>
            <span class="px-3">Facebook</span>
          </Button>

          <Button
            class="twitter p-1 p-button-rounded p-button-outlined"
            aria-label="Github"
            @click="signInWithGitHubHandler"
          >
            <i class="pi pi-github px-1"></i>
            <span class="px-3">Github</span>
          </Button>
        </div>

        <Divider align="center" class="py-2">
          <span class="text-400 text-sm font-medium">OR</span>
        </Divider>

        <form @submit.prevent="handleLogin(!v$.$invalid)" class="p-fluid mt-2">
          <!-- Email -->
          <div class="field">
            <span class="p-float-label p-input-icon-left">
              <i class="pi pi-envelope" />
              <InputText
                id="email"
                v-model="v$.email.$model"
                :class="{ 'p-invalid': v$.email.$invalid && submitted }"
                aria-describedby="email-error"
              />
              <label
                for="email"
                :class="{ 'p-error': v$.email.$invalid && submitted }"
                >Email*</label
              >
            </span>
            <span v-if="v$.email.$error && submitted">
              <span
                id="email-error"
                v-for="(error, index) of v$.email.$errors"
                :key="index"
              >
                <small class="p-error">{{ error.$message }}</small>
              </span>
            </span>
            <small
              v-else-if="(v$.email.$invalid && submitted) || v$.email.$pending"
              class="p-error"
              >{{ v$.email.required.$message.replace("Value", "Email") }}</small
            >
          </div>

          <!-- Password -->
          <div class="field mt-4">
            <span class="p-float-label p-input-icon-left">
              <i class="pi pi-lock" />
              <Password
                id="password"
                v-model="v$.password.$model"
                :class="{ 'p-invalid': v$.password.$invalid && submitted }"
                :feedback="false"
                toggleMask
              >
              </Password>
              <label
                for="password"
                :class="{ 'p-error': v$.password.$invalid && submitted }"
                >Password*</label
              >
            </span>
            <small
              v-if="(v$.password.$invalid && submitted) || v$.password.$pending"
              class="p-error"
              >{{
                v$.password.required.$message.replace("Value", "Password")
              }}</small
            >
          </div>

          <!-- Remember Me -->
          <div
            class="field-checkbox flex align-items-center justify-content-between"
          >
            <div class="flex align-items-center">
              <Checkbox
                id="rememberMe"
                name="rememberMe"
                v-model="rememberMe"
                :binary="true"
              />
              <label for="binary"
                ><span class="font-medium ml-2 text-gray-600">Remember me</span>
              </label>
            </div>
            <a
              class="font-medium no-underline ml-2 text-blue-500 text-right cursor-pointer"
              >Forgot password?</a
            >
          </div>
          <Button type="submit" label="Submit" class="mt-3" />
        </form>
      </template>

      <template #footer>
        <div class="flex justify-content-center align-items-center">
          <p>
            Don't have an account?
            <span
              class="cursor-pointer underline hover"
              @click="navigateToRegister"
              >Register</span
            >
          </p>
        </div>
      </template>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, onMounted } from "vue";
import { email, required } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
import logo from "@/assets/images/dplogov3.jpg";
import { Login } from "@/globalvar";

// Import Composables
import { supabase } from "@/composables/useSupabase";

// Router
import { useRouter } from "vue-router";

// Data
const router = useRouter();

const submitted = ref(false);
const rememberMe = ref(false);
const showMessage = ref(false);

const state: Login = reactive({
  email: "",
  password: "",
});

const rules = {
  email: { required, email },
  password: { required },
};

const v$ = useVuelidate(rules, state);

// Functions here
const handleLogin = (isFormValid: boolean) => {
  submitted.value = true;

  if (!isFormValid) {
    return;
  }

  toggleDialog();
};

const toggleDialog = () => {
  showMessage.value = !showMessage.value;

  if (!showMessage.value) {
    resetForm();
  }
};

const resetForm = () => {
  state.email = "";
  state.password = "";
  submitted.value = false;
};

const navigateToRegister = () => {
  router.push("/auth/register");
};

const signInWithGoogleHandler = async () => {
  try {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });

    if (error) {
      throw new Error(error.message);
    } else {
      // Redirect URL after successful login
      window.location.href = "http://localhost:5173/dashboard/Personal";
    }
  } catch (error) {
    alert(error);
  }
};
const signInWithFacebookHandler = async () => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "facebook",
  });
};

const signInWithGitHubHandler = async () => {
  try {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "github",
    });

    if (error) {
      throw new Error(error.message);
    } else {
      // Redirect URL after successful login
      window.location.href = "http://localhost:5173/dashboard/Personal";
    }
  } catch (error) {
    alert(error);
  }
};
</script>

<style lang="scss" scoped>
.hover:hover {
  font-weight: 600;
}
</style>
