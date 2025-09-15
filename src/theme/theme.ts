// src/theme/theme.ts
export const lightTheme = {
  colors: {
    background: "#FFFFFF",
    surface: "#F7F7F8",
    primary: "#3B82F6",
    primaryAlt: "#2563EB",
    text: "#111827",
    textMuted: "#6B7280",
    border: "#E5E7EB",
    success: "#22C55E",
    danger: "#EF4444",
    warning: "#F59E0B",
  },
  radius: { sm: 8, md: 12, lg: 16, xl: 24 },
  spacing: (n: number) => n * 8,
};
