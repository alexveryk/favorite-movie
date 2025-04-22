// vite.config.js
import { defineConfig } from "file:///D:/MyProjects/favorite-movie/node_modules/vite/dist/node/index.js";
import react from "file:///D:/MyProjects/favorite-movie/node_modules/@vitejs/plugin-react/dist/index.mjs";
import tailwindcss from "file:///D:/MyProjects/favorite-movie/node_modules/@tailwindcss/vite/dist/index.mjs";
var vite_config_default = defineConfig({
  base: "./",
  //
  plugins: [react(), tailwindcss()],
});
export { vite_config_default as default };
