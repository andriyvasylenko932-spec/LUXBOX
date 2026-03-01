import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{ts,tsx,js,jsx}", "./components/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["ui-sans-serif", "system-ui", "Inter", "Segoe UI", "Roboto", "Arial"]
      },
      boxShadow: {
        soft: "0 12px 40px rgba(0,0,0,0.08)"
      }
    }
  },
  plugins: []
} satisfies Config;
