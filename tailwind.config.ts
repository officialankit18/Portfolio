import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: "#FFF7F3",
        panel: "#F0FDFA",
        slatepanel: "#FDF2F8",
        skybrand: "#06B6D4",
        bluebrand: "#FB7185",
        violetbrand: "#8B5CF6"
      },
      fontFamily: {
        heading: ["var(--font-space-grotesk)", "sans-serif"],
        body: ["var(--font-inter)", "sans-serif"]
      },
      boxShadow: {
        glow: "0 18px 70px rgba(251, 113, 133, 0.18), 0 10px 50px rgba(6, 182, 212, 0.16)",
        premium: "0 28px 90px rgba(88, 28, 135, 0.10), 0 16px 60px rgba(8, 145, 178, 0.10)"
      },
      backgroundImage: {
        "premium-radial": "radial-gradient(circle at top left, rgba(6,182,212,.26), transparent 34%), radial-gradient(circle at top right, rgba(251,113,133,.24), transparent 30%), linear-gradient(135deg, rgba(255,247,243,.96), rgba(240,253,250,.88))"
      }
    }
  },
  plugins: []
};

export default config;
