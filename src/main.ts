import { ViteSSG } from "vite-ssg";
// @ts-ignore
import generatedRoutes from "virtual:generated-pages";
// @ts-ignore
import { setupLayouts } from "virtual:generated-layouts";

import App from "./App.vue";
const routes = setupLayouts(generatedRoutes);

export const createApp = ViteSSG(
  // the root component
  App,
  // vue-router options
  { routes },
  // vue-router options
  (ctx) => {
    Object.values(import.meta.glob("./modules/*.ts", { eager: true })).map(
      (i: any) => i.install?.(ctx)
    );
  }
);
