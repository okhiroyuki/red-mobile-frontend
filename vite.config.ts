import { URL, fileURLToPath } from "node:url";

import vue from "@vitejs/plugin-vue";
import { visualizer } from "rollup-plugin-visualizer";
import { defineConfig } from "vite";
import checker from "vite-plugin-checker";
import { nodePolyfills } from "vite-plugin-node-polyfills";
import vuetify from "vite-plugin-vuetify";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  return {
    plugins: [
      vue(),
      vuetify({ autoImport: true }),
      nodePolyfills(),
      visualizer(),
      checker({}),
    ],
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
    build: {
      outDir: "dist",
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
