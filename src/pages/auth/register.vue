<template>
  <div class="content-section implementation">
    <Toast />
    <Dialog
      v-model:visible="showMessage"
      :breakpoints="{ '960px': '80vw' }"
      :style="{ width: '30vw' }"
      position="topleft"
      :showHeader="false"
      @after-hide="onDialogHide"
    >
      <div class="flex align-items-center flex-column mt-5 px-3">
        <i
          class="pi pi-check-circle"
          :style="{ fontSize: '3rem', color: 'var(--green-500)' }"
        ></i>
        <h5>Registered Successfully!</h5>
        <p class="mt-2">
          Congratulations, your account has been successfully created. Please
          check your registered email address <b>{{ state.email }}</b> for email
          verification.
        </p>
      </div>
      <template #footer>
        <div class="flex justify-content-center">
          <Button label="Ok" @click="toggleDialog" />
        </div>
      </template>
    </Dialog>

    <div
      class="flex flex-column flex-nowrap justify-content-center align-items-center gap-2 min-h-screen min-w-screen px-3 py-3"
    >
      <Card class="md:w-30rem px-3 md:px-4 py-4 border-round-lg">
        <template #header>
          <div class="flex justify-content-center align-items-center mt-3">
            <img :src="logo" alt="Image" style="height: 4rem; width: 4rem" />
          </div>
        </template>
        <template #title>Get Started</template>
        <template #subtitle>Create a new account</template>

        <template #content>
          <div class="flex justify-content-center align-items-center gap-2">
            <Button
              class="google p-1 p-button-rounded p-button-outlined"
              aria-label="Google"
              @click="signInWithOAuthHandler('google')"
            >
              <i class="pi pi-google px-1"></i>
              <span class="px-3">Google</span>
            </Button>

            <Button
              class="facebook p-1 p-button-rounded p-button-outlined"
              aria-label="Discord"
              @click="signInWithOAuthHandler('discord')"
            >
              <i class="pi pi-discord px-1"></i>
              <span class="px-3">Discord</span>
            </Button>

            <Button
              class="twitter p-1 p-button-rounded p-button-outlined"
              aria-label="Github"
              @click="signInWithOAuthHandler('github')"
            >
              <i class="pi pi-github px-1"></i>
              <span class="px-3">Github</span>
            </Button>
          </div>
          <Divider align="center" class="py-2">
            <span class="text-400 text-sm font-medium">OR</span>
          </Divider>

          <form
            @submit.prevent="handleRegister(!v$.$invalid)"
            class="p-fluid mt-2"
          >
            <!-- Email -->
            <div class="field">
              <span class="p-float-label p-input-icon-right">
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
                v-else-if="
                  (v$.email.$invalid && submitted) || v$.email.$pending
                "
                class="p-error"
                >{{
                  v$.email.required.$message.replace("Value", "Email")
                }}</small
              >
            </div>

            <!-- Password -->
            <div class="field mt-4">
              <span class="p-float-label">
                <Password
                  id="password"
                  v-model="v$.password.$model"
                  :class="{ 'p-invalid': v$.password.$invalid && submitted }"
                  toggleMask
                >
                  <template #header>
                    <h6>Pick a password</h6>
                  </template>

                  <template #footer="sp">
                    {{ sp.level }}
                    <Divider />
                    <p class="mt-2">Suggestions</p>
                    <ul class="pl-2 ml-2 mt-0" style="line-height: 1.5">
                      <li>At least one lowercase</li>
                      <li>At least one uppercase</li>
                      <li>At least one numeric</li>
                      <li>Minimum 8 characters</li>
                    </ul>
                  </template>
                </Password>
                <label
                  for="password"
                  :class="{ 'p-error': v$.password.$invalid && submitted }"
                  >Password*</label
                >
              </span>
              <small
                v-if="
                  (v$.password.$invalid && submitted) || v$.password.$pending
                "
                class="p-error"
                >{{
                  v$.password.required.$message.replace("Value", "Password")
                }}</small
              >
            </div>

            <!-- Terms and Conditions -->
            <div class="field-checkbox">
              <Checkbox
                id="accepted"
                name="accepted"
                value="accepted"
                v-model="v$.accepted.$model"
                :class="{ 'p-invalid': v$.accepted.$invalid && submitted }"
              />
              <label
                for="accepted"
                :class="{ 'p-error': v$.accepted.$invalid && submitted }"
                >I agree to the terms and conditions*</label
              >
            </div>
            <Button type="submit" label="Register" class="mt-3" />
          </form>
        </template>

        <template #footer>
          <div class="flex justify-content-center align-items-center">
            <p>
              Have an account?
              <span
                class="cursor-pointer underline hover"
                @click="navigateToLogin"
                >Login Now</span
              >
            </p>
          </div>
        </template>
      </Card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, onMounted } from "vue";
import { email, required } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
import logo from "@/assets/images/dplogov3.jpg";
import { Register, Redirect, ErrorResponse } from "@/globalvar";
import { Provider } from "@supabase/supabase-js";

// Import Composables
import useAuthUser from "@/composables/useAuthUser";
import useToast from "@/composables/useToast";

// Router
import { useRouter } from "vue-router";

// Inialization
const router = useRouter();

// Data
const submitted = ref(false);
const showMessage = ref(false);

const state: Register = reactive({
  email: "",
  password: "",
  accepted: false,
});

const rules = {
  email: { required, email },
  password: { required },
  accepted: { required },
};

const v$ = useVuelidate(rules, state);

// Use composable
const { register, signInWithOAuth } = useAuthUser();
const { handleErrorToast } = useToast();

// Functions
const handleRegister = async (isFormValid: boolean) => {
  submitted.value = true;
  // If form is invalid do not proceed
  if (!isFormValid) {
    alert("Submission of form in invalid. Please check");
    return;
  }

  try {
    // Use the Supabase provided method to handle the signup
    await register(state).then((res: string) => {
      res.length === 0
        ? (() => {
            throw new Error(String(res));
          })()
        : toggleDialog();
    });
  } catch (error) {
    handleErrorToast(error, 3000, "TOP_CENTER");
  }
};

const toggleDialog = () => {
  showMessage.value = !showMessage.value;

  if (!showMessage.value) {
    resetForm();
  }
};

const onDialogHide = () => {
  // router.push("/auth/login");
};

const resetForm = () => {
  state.email = "";
  state.password = "";
  state.accepted = false;
  submitted.value = false;
};

const navigateToLogin = () => {
  router.push("/auth/login");
};

const signInWithOAuthHandler = async (provider: Provider) => {
  try {
    signInWithOAuth(provider).then((res: string) => {
      if (res.length === 0) throw new Error(String(res));
    });
  } catch (error) {
    handleErrorToast(error, 3000, "TOP_CENTER");
  }
};

onMounted(() => {
  // handleToast("Hello World");
});
</script>

<style lang="scss" scoped>
.hover:hover {
  font-weight: 600;
}
</style>
