export const Colors = {
  primary: "#4F46E5",
  primaryLight: "#818CF8",
  primaryDark: "#3730A3",
  secondary: "#06B6D4",
  secondaryLight: "#67E8F9",
  secondaryDark: "#0891B2",
  accent: "#22C55E",
  accentLight: "#86EFAC",
  accentDark: "#15803D",
  success: "#22C55E",
  warning: "#F59E0B",
  error: "#EF4444",
  info: "#3B82F6",

  // Surfaces
  background: "#0B0D1A",
  surface: "#131627",
  surfaceLight: "#1A1E33",
  surfaceHighlight: "#222640",
  card: "#16192B",
  cardBorder: "#20243F",

  // Text
  text: "#F1F5F9",
  textSecondary: "#94A3B8",
  textMuted: "#64748B",
  textInverse: "#0F172A",

  // Borders & Dividers
  border: "#1E2342",
  divider: "#1A1E33",

  // Gradient tokens
  gradientHeroStart: "#4F46E5",
  gradientHeroEnd: "#06B6D4",
  gradientDarkStart: "#0B0D1A",
  gradientDarkEnd: "#131627",

  // Exercise colors
  exercise: {
    pushup: "#4F46E5",
    squat: "#22C55E",
    jumpingJack: "#06B6D4",
    skipping: "#F59E0B",
  },

  // Chart palette
  chart: ["#4F46E5", "#06B6D4", "#22C55E", "#F59E0B", "#3B82F6", "#EF4444"],
} as const;

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
} as const;

export const Radius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 9999,
} as const;

export const Shadow = {
  card: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 5,
  },
  glow: {
    shadowColor: "#4F46E5",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
} as const;

export const Typography = {
  display: {
    fontSize: 48,
    fontWeight: "700" as const,
    lineHeight: 1.2,
  },
  h1: {
    fontSize: 36,
    fontWeight: "700" as const,
    lineHeight: 1.3,
  },
  h2: {
    fontSize: 30,
    fontWeight: "600" as const,
    lineHeight: 1.3,
  },
  h3: {
    fontSize: 24,
    fontWeight: "600" as const,
    lineHeight: 1.4,
  },
  body: {
    fontSize: 16,
    fontWeight: "400" as const,
    lineHeight: 1.6,
  },
  caption: {
    fontSize: 14,
    fontWeight: "400" as const,
    lineHeight: 1.5,
  },
} as const;
