import { defineConfig } from "vite";
import path from "path";
import tsconfigPaths from "vite-tsconfig-paths";
import react from "@vitejs/plugin-react";
import commonjs from "vite-plugin-commonjs";
import dts from "vite-plugin-dts";
import svgr from "vite-plugin-svgr";
import fs from "fs";
import { viteStaticCopy } from "vite-plugin-static-copy";
const packageJsonData = JSON.parse(fs.readFileSync("package.json", "utf8"));
const dependencies = Object.keys(packageJsonData.dependencies);

const assetsPath = path.resolve(__dirname, "src/assets");
const globalStylesPath = path.resolve(assetsPath, "globals");
const globalInsertStyles = `@import "${globalStylesPath}/index.scss";\n`;
const tsconfigPath = path.resolve(path.dirname(__filename), "tsconfig.json");
const srcPath = path.resolve(path.dirname(__filename), "./src");
const distPath = path.resolve(path.dirname(__filename), "./dist");

export default defineConfig({
  build: {
    outDir: "dist",
    assetsDir: "assets",
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      name: "index",
      formats: ["es", "cjs"],
      fileName: (format) => `index.${format}.js`,
    },
    rollupOptions: {
      external: [...dependencies],
      output: {
        globals: {
          ...dependencies.reduce((prev, dependency) => {
            prev[dependency] = dependency;
            return prev;
          }, {}),
          react: "react",
          classname: "cx",
          "react-dom": "ReactDom",
        },
      },
    },
  },
  plugins: [
    dts({
      tsconfigPath,
      pathsToAliases: true,
      outDir: path.resolve(distPath, "./types"),
    }),
    tsconfigPaths({
      projects: [tsconfigPath],
    }),
    commonjs(),
    svgr(),
    react(),
    viteStaticCopy({
      targets: [
        {
          src: path.resolve(srcPath, "./assets"),
          dest: distPath,
        },
      ],
    }),
  ],
  css: {
    devSourcemap: true,
    preprocessorOptions: {
      scss: {
        additionalData: globalInsertStyles,
      },
    },
  },
});
