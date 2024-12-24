import { createTheme, rem } from "@mantine/core";

export const theme = createTheme({
  colors: {
    brand: [
      "#e8faff", // Lightest shade
      "#d1f3ff",
      "#a6e7ff",
      "#75d7ff",
      "#4bcaff", // Mid-tone
      "#32baff",
      "#2ba5e5",
      "#238fcb",
      "#1a75a8",
      "#125a85", // Darkest shade
    ],
  },
  primaryColor: "brand",
  primaryShade: { light: 5, dark: 7 },
  fontFamily: "Roboto, sans-serif",
  headings: {
    fontFamily: "Roboto, sans-serif",
    fontWeight: "bold",
    textWrap: "wrap",
    sizes: {
      h1: { fontSize: rem(34), lineHeight: 1.4 },
      h2: { fontSize: rem(28), lineHeight: 1.4 },
      h3: { fontSize: rem(22), lineHeight: 1.4 },
      h4: { fontSize: rem(18), lineHeight: 1.4 },
      h5: { fontSize: rem(16), lineHeight: 1.4 },
      h6: { fontSize: rem(14), lineHeight: 1.4 },
    },
  },
  radius: {
    xs: rem(4),
    sm: rem(6),
    md: rem(8),
    lg: rem(12),
    xl: rem(16),
  },
  shadows: {
    sm: "0px 1px 3px rgba(0, 0, 0, 0.1)",
    md: "0px 3px 6px rgba(0, 0, 0, 0.15)",
    lg: "0px 5px 10px rgba(0, 0, 0, 0.2)",
  },
  components: {
    Button: {
      styles: {
        root: {
          textTransform: "none",
          fontWeight: 500,
          borderRadius: rem(6),
          boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.1)",
        },
      },
    },
    Card: {
      styles: {
        root: {
          backgroundColor: "#ffffff",
          borderRadius: rem(8),
          boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.1)",
        },
      },
    },
    Input: {
      styles: {
        input: {
          backgroundColor: "#f9f9f9",
          borderColor: "#d1f3ff",
          borderRadius: rem(6),
        },
      },
    },
    Text: {
      styles: {
        root: {
          color: "#125a85",
        },
      },
    },
  },
});
