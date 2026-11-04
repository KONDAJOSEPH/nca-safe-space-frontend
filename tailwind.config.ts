import type { Config } from "tailwindcss";

const v = (n: string) => `var(--${n})`;
const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: v("bg"), surface: v("surface"), ink: v("ink"), muted: v("muted"),
        line: v("line"), brand: v("brand"), "brand-ink": v("brand-ink"), soft: v("soft"),
        active: v("active"), ok: v("ok"), warn: v("warn"), bad: v("bad"),
      },
    },
  },
  plugins: [],
};
export default config;
