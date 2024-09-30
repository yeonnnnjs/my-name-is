const config: {
  plugins: never[];
  theme: {
    extend: { colors: { background: string; foreground: string } };
    screens: { xl: string; "2xl": string; md: string; sm: string; xs: string; lg: string }
  };
  content: string[]
} = {
  content: [
    "./src/generator/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      xs: '340px',
      sm: '480px',
      md: '640px',
      lg: '768px',
      xl: '1280px',
      '2xl': '1536px'
    },
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [],
};
export default config;
