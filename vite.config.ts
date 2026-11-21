import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import site from "./src/content/site.json";

const careerYears = String(new Date().getFullYear() - site.careerStart);

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    { name: "career-years", transformIndexHtml: (html: string) => html.replace(/%CAREER_YEARS%/g, careerYears) },
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
