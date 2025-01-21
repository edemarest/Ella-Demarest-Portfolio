/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: {
    content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
    safelist: [
      "glowing-button",
      "group:hover",
      "group:hover .glowing-button",
      "min-w-max",
      "whitespace-nowrap"
    ],
  },
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        futuristic: ["Exo", "sans-serif"],
        subtleFuturistic: ["Rajdhani", "sans-serif"],
      },
      colors: {
        pitchBlack: "#000000",
        darkGrey: "#1e1e1e",
        neonCyan: "#00ffbf",
        cyberBlue: "#00eaff",
        cyberTextGrey: "#d1d5db",
      },
      boxShadow: {
        neon: "0px 0px 15px 3px #00f5ff",
        glow: "0px 0px 25px 5px #00f5ff99",
        panelInset: "inset 0 0 15px rgba(0, 245, 255, 0.3), 0 0 20px rgba(0, 245, 255, 0.5)",
      },
      backgroundImage: {
        cyberGradient: "radial-gradient(circle at top left, rgba(0, 245, 255, 0.3), transparent)",
        panelGradient: "linear-gradient(to top, #333333, #0d0d0d)",
        specialGradient: "linear-gradient(90deg, #ff007f, #00f5ff)",
      },
      keyframes: {
        pulseGlow: {
          "0%": { boxShadow: "0px 0px 10px 2px #00ffbf" },
          "50%": { boxShadow: "0px 0px 20px 5px #00ffbf" },
          "100%": { boxShadow: "0px 0px 10px 2px #00ffbf" },
        },
        rotatingGlow: {
          "0%": { transform: "rotate(0deg)", borderTopColor: "#00f5ff" },
          "25%": { transform: "rotate(90deg)", borderRightColor: "#00f5ff" },
          "50%": { transform: "rotate(180deg)", borderBottomColor: "#00f5ff" },
          "75%": { transform: "rotate(270deg)", borderLeftColor: "#00f5ff" },
          "100%": { transform: "rotate(360deg)", borderTopColor: "#00f5ff" },
        },
      },
      animation: {
        pulseGlow: "pulseGlow 1.5s infinite ease-in-out",
        rotatingGlow: "rotatingGlow 1.5s linear infinite",
      },
    },
  },
  plugins: [],
};
