const config: {
  plugins: never[];
  theme: {
    extend: {
      keyframes: {
        rainbow: {
          "100%": { backgroundPosition: string };
          "0%": { backgroundPosition: string };
        };
      };
      colors: { background: string; foreground: string };
      animation: { rainbow: string };
    };
    screens: {
      filter: string;
      xl: string;
      "2xl": string;
      md: string;
      sm: string;
      xs: string;
      lg: string;
    };
  };
  content: string[];
} = {
  content: [
    "./src/generator/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      xs: "340px",
      sm: "480px",
      filter: "530px",
      md: "640px",
      lg: "768px",
      xl: "1280px",
      "2xl": "1536px",
    },
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      animation: {
        rainbow: "rainbow 2s linear infinite",
      },
      keyframes: {
        rainbow: {
          "0%": { backgroundPosition: "0% 50%" },
          "100%": { backgroundPosition: "100% 50%" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
