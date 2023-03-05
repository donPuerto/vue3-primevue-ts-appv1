import { defineConfig } from "vite";
import * as path from "path";

import Components from "unplugin-vue-components/vite";
import { PrimeVueResolver } from "unplugin-vue-components/resolvers";

import AutoImport from "unplugin-auto-import/vite";
import Layouts from "vite-plugin-vue-layouts";
import Pages from "vite-plugin-pages";
import vue from "@vitejs/plugin-vue";
// https://vitejs.dev/config/
export default defineConfig({
  base: "./",
  server: {
    hmr: {
      port: false,
      path: "/ws",
    },
  },

  // https://github.com/antfu/vite-ssg
  ssgOptions: {
    script: "async",
    formatting: "minify",
  },

  optimizeDeps: {
    include: ["vue", "vue-router", "@vueuse/core"],
    exclude: ['* > vue-demi'],
  },

  plugins: [
    vue({
      include: [/\.vue$/, /\.md$/],
      template: {
        compilerOptions: {
          directiveTransforms: {
            styleclass: () => ({
              props: [],
              needRuntime: true,
            }),
            ripple: () => ({
              props: [],
              needRuntime: true,
            }),
          },
        },
      },
    }),
    // https://github.com/antfu/unplugin-auto-import
    AutoImport({
      imports: ["vue", "vue-router", "vue-i18n", "@vueuse/head"],
      exclude: ["**/dist/**"],
      dts: "src/auto-import.d.ts",
    }),
    Components({
      // relative paths to the directory to search for components.
      dirs: ["src/components"],

      // valid file extensions for components.
      extensions: ["vue"],

      // search for subdirectories
      deep: true,

      // resolvers for custom components
      resolvers: [PrimeVueResolver()],

      // generate `components.d.ts` global declarations,
      // also accepts a path for custom filename
      // default: `true` if package typescript is installed
      dts: "src/components.d.ts",

      // Allow subdirectories as namespace prefix for components.
      directoryAsNamespace: false,

      // Vue version of project. It will detect automatically if not specified.
      // Acceptable value: 2 | 2.7 | 3
      version: 3,
    }),
    Layouts(),
    Pages({
      dirs: [
        { dir: "src/pages", baseRoute: "" },
        // { dir: "src/features/**/pages", baseRoute: "features" },
        // { dir: "src/admin/pages", baseRoute: "admin" },
      ],
      extendRoute(route, parent) {
        if (route.path === "/") {
          // Index is unauthenticated.
          return route;
        }

        // Augment the route with meta that indicates that the route requires authentication.
        return {
          ...route,
          meta: { auth: true },
        };
      },
      exclude: ["**/components/*.vue"],
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "~": path.resolve(__dirname, "node_modules/"),
    },
  },
});
