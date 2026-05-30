import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    plugins: [react()],
    server: {
      port: 5173,
      proxy: {
        "/api": {
          target: "https://api.football-data.org/v4",
          changeOrigin: true,
          rewrite: path => path.replace(/^\/api/, ""),
          headers: {
            "X-Auth-Token": env.VITE_FOOTBALL_DATA_API_KEY // 👈 now defined
          }
        }
      }
    }
  };
});
