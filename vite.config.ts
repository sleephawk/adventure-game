import { defineConfig } from "vite";
import csv from "vite-plugin-csv";

// If you get 'csv is not a function', try this:
const csvPlugin = (csv as any).default ? (csv as any).default : csv;

export default defineConfig({
  plugins: [csvPlugin()],
});
