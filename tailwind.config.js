/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Light workspace tokens
        ledger: {
          bg: "#F4F6F8",
          surface: "#FFFFFF",
          surfaceSecondary: "#EAF0F4",
          border: "#D8E0E7",
          borderStrong: "#B8C6D4",
          textPrimary: "#152231",
          textSecondary: "#526273",
          textMuted: "#7C8A99",
        },
        // Deep visual surfaces
        navy: {
          bg: "#0B1724",
          surface: "#112335",
          elevated: "#172D42",
          border: "#284157",
          text: "#F3F7FA",
          textSecondary: "#A7B8C8",
          textMuted: "#6B8299",
        },
        // Brand accents
        brand: {
          teal: "#1EA7A8",
          tealHover: "#168B8C",
          tealLight: "#E6F7F7",
          tealMuted: "rgba(30, 167, 168, 0.15)",
          sky: "#4AA3DF",
          skyHover: "#378DC7",
          skyLight: "#EDF6FC",
          skyMuted: "rgba(74, 163, 223, 0.15)",
        },
        // Semantic status tokens
        status: {
          success: "#2F9E71",
          successBg: "#EBF7F2",
          warning: "#D89B32",
          warningBg: "#FEF7EC",
          critical: "#D95C5C",
          criticalBg: "#FDF2F2",
          info: "#4A91C7",
          infoBg: "#EEF6FC",
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        'subtle': '0 2px 8px rgba(15, 30, 45, 0.06)',
        'elevated': '0 8px 24px rgba(15, 30, 45, 0.10)',
        'dark-subtle': '0 2px 8px rgba(0, 0, 0, 0.25)',
        'dark-elevated': '0 8px 24px rgba(0, 0, 0, 0.40)',
      },
      borderRadius: {
        'control': '6px',
        'input': '8px',
        'card': '12px',
        'panel': '16px',
      }
    },
  },
  plugins: [],
}

