import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vuetify from "vite-plugin-vuetify";
import { nodePolyfills } from "vite-plugin-node-polyfills";
import { visualizer } from "rollup-plugin-visualizer";
import checker from "vite-plugin-checker";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  return {
    plugins: [
      vue(),
      vuetify({ autoImport: true }),
      nodePolyfills(),
      visualizer(),
      checker({
        eslint: {
          lintCommand: "eslint",
        },
      }),
    ],
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
    build: {
      outDir: "src-cordova/dist",
      rollupOptions: {
        output: {
          manualChunks: {
            axios: ["axios"],
            vuetify: ["vuetify"],
          },
        },
        plugins: [
          mode === "analyze" &&
            visualizer({
              open: true,
              filename: "stats.html",
              gzipSize: true,
              brotliSize: true,
            }),
        ],
      },
    },
  };
});
