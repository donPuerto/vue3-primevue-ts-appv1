import Vue3Toastify, { type ToastContainerOptions } from "vue3-toastify";
import type { UserModule } from "@/types";
export const install: UserModule = ({ app, router, isClient }) => {
  app.use(Vue3Toastify, {
    autoClose: 3000,
  } as ToastContainerOptions);
};
