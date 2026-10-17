import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ["Montserrat", "sans-serif"],
        display: ["Playfair Display", "serif"],
        serif: ["Playfair Display", "serif"],
        script: ["Great Vibes", "cursive"],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
          primary: "hsl(var(--accent-primary))",
          secondary: "hsl(var(--accent-secondary))",
          "primary-rgb": "rgb(var(--accent-primary-rgb))",
          "secondary-rgb": "rgb(var(--accent-secondary-rgb))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        /* Black + Silver theme */
        noir: {
          DEFAULT: "#0D0D0D",
          soft: "#161616",
        },
        charcoal: {
          DEFAULT: "#2B2B2B",
          light: "#3a3a3a",
        },
        silver: {
          DEFAULT: "#8E8E8E",
          soft: "#a8a8a8",
        },
        platinum: {
          DEFAULT: "#E6E6E6",
          soft: "#f2f2f2",
        },
        cinema: {
          void: "#0D0D0D",
          ink: "#0D0D0D",
          charcoal: "#2B2B2B",
          slate: "#2B2B2B",
          mist: "#8E8E8E",
          bone: "#E6E6E6",
        },
        ice: {
          DEFAULT: "#E6E6E6",
          soft: "#E6E6E6",
          muted: "#8E8E8E",
        },
        depth: {
          base: "#0D0D0D",
          mid: "#2B2B2B",
          lift: "#2B2B2B",
          mist: "#8E8E8E",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "slide-up": {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.6s ease-out forwards",
        "slide-up": "slide-up 0.6s ease-out forwards",
        shimmer: "shimmer 2s linear infinite",
        float: "float 3s ease-in-out infinite",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "cinema-fade":
          "linear-gradient(to bottom, transparent 0%, #0D0D0D 100%)",
        "silver-sheen":
          "linear-gradient(135deg, #8E8E8E 0%, #E6E6E6 45%, #8E8E8E 100%)",
        "silver-edge":
          "linear-gradient(90deg, transparent, #E6E6E6, transparent)",
      },
      letterSpacing: {
        ultra: "0.35em",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
