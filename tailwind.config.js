// tailwind.config.js
module.exports = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}", // For Next.js 13+ app directory
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter var", "sans-serif"],
      },
      colors: {
        primary: "#6B46C1",
        secondary: "#4299E1",
        background: "#000000",
        text: "#FFFFFF",
        "footer-bg": "var(--footer-bg)",
        gray: {
          ...require("tailwindcss/colors").gray,
          850: "#1a1a1a",
        },
        // New color additions
        "primary-new": {
          light: "#3B82F6", // Tailwind blue-500
          DEFAULT: "#1D4ED8", // Tailwind blue-700
          dark: "#1E40AF", // Tailwind blue-800
        },
        "secondary-new": {
          light: "#8B5CF6", // Tailwind purple-500
          DEFAULT: "#6D28D9", // Tailwind purple-700
          dark: "#5B21B6", // Tailwind purple-800
        },
        "green-new": {
          light: "#10B981", // Tailwind green-500
          DEFAULT: "#059669", // Tailwind green-600
          dark: "#047857", // Tailwind green-700
        },
        "background-new": "#121212", // New dark background
        "text-new": "#E5E7EB", // New light text
      },
      height: {
        108: "27rem",
        120: "30rem",
        144: "36rem",
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme("colors.text"),
            a: {
              color: theme("colors.primary"),
              "&:hover": {
                color: theme("colors.secondary"),
              },
            },
            h1: {
              color: theme("colors.text"),
            },
            h2: {
              color: theme("colors.text"),
            },
          },
        },
        dark: {
          css: {
            color: theme("colors.text"),
            a: {
              color: theme("colors.primary"),
              "&:hover": {
                color: theme("colors.secondary"),
              },
            },
            h1: {
              color: theme("colors.text"),
            },
            h2: {
              color: theme("colors.text"),
            },
          },
        },
      }),
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/aspect-ratio"), // Added aspect-ratio plugin
  ],
};
