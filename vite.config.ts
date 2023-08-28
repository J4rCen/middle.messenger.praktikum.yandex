import { defineConfig } from "vite";
import {resolve} from "path";
import vitePluginHandlebarsPrecompile from "./vite-plugin-handelbars-precompile";



export default defineConfig({
    plugins: [vitePluginHandlebarsPrecompile()],
    build: {
       outDir: resolve(__dirname, "dist")
    }
})
