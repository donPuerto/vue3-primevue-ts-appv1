import type { UserModule } from "@/types";

// Setup Pinia
// https://pinia.esm.dev/
export const install: UserModule = ({
  isClient,
  initialState,
  app,
  router,
}) => {
  console.log("isClient", isClient);
  console.log("initialState", initialState);
  console.log("app", app);
  console.log("router", router);
};
