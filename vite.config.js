import { fileURLToPath, URL } from "node:url";

import { defineConfig, splitVendorChunkPlugin } from "vite";
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
      splitVendorChunkPlugin(),
      visualizer(),
      checker({
        eslint: {
          lintCommand: 'eslint "./src/**/*.{js,vue}"',
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
