import { defineConfig } from 'vite';
import monkey from 'vite-plugin-monkey';
import inject from "@rollup/plugin-inject";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    inject({
      $: "jquery",
      jQuery: "jquery",
      "windows.jQuery": "jquery",
    }),
    monkey({
      entry: "src/main.ts",
      userscript: {
        icon: "https://vitejs.dev/logo.svg",
        namespace: "npm/vite-plugin-monkey",
        match: ["https://stu.ityxb.com/writePaper/busywork/*"],
      },
    }),
  ],
});
