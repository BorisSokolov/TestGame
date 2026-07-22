/**
 * Queens Puzzle Game — Color Constants
 *
 * Accessible pastel region colors and UI theme tokens.
 */

/** Pastel region colors (up to 10 regions, WCAG-friendly on dark backgrounds) */
export const REGION_COLORS: string[] = [
  '#F4A0A0', // Rose
  '#A0C4F4', // Sky
  '#A0E8C8', // Mint
  '#C4A0F4', // Lavender
  '#F4D4A0', // Peach
  '#A0D8D8', // Teal
  '#F4B8A0', // Coral
  '#B8D8A0', // Sage
  '#D8A0C4', // Mauve
  '#E8D4A0', // Amber
];

/** Darker tints for region borders (same hue, lower lightness) */
export const REGION_BORDER_COLORS: string[] = [
  '#D07070', // Rose border
  '#7098D0', // Sky border
  '#70C0A0', // Mint border
  '#9870D0', // Lavender border
  '#D0B070', // Peach border
  '#70B0B0', // Teal border
  '#D09070', // Coral border
  '#90B070', // Sage border
  '#B070A0', // Mauve border
  '#C0B070', // Amber border
];

/** UI Theme */
export const THEME = {
  // Backgrounds
  background: '#1A1A2E',        // Deep navy
  surface: '#16213E',           // Card surface
  surfaceLight: '#0F3460',      // Elevated surface

  // Text
  textPrimary: '#EAEAEA',       // Primary text
  textSecondary: '#A0A0B0',     // Secondary text
  textOnRegion: '#2A2A3E',      // Text on pastel region cells

  // Accents
  accent: '#E94560',            // Primary accent (rose-red)
  accentLight: '#FF6B81',       // Light accent
  success: '#4ADE80',           // Win / success green
  warning: '#FBBF24',           // Warning yellow
  conflict: '#EF4444',          // Conflict red

  // Borders
  gridBorder: '#2A2A4E',        // Inner grid lines
  regionBorder: '#1A1A2E',      // Thick region dividers

  // Misc
  overlay: 'rgba(10, 10, 30, 0.85)', // Modal overlay
  shadow: 'rgba(0, 0, 0, 0.3)',      // Drop shadows

  // Queen
  queenColor: '#FFD700',        // Gold for queen icon
  eliminatedColor: '#666680',   // Muted X marks
} as const;

/** Cell sizing */
export const CELL_CONFIG = {
  minSize: 48,                  // Minimum touch target (48dp)
  maxSize: 72,                  // Maximum cell size
  gridPadding: 16,              // Padding around the grid
  borderWidth: 1,               // Inner cell border
  regionBorderWidth: 3,         // Thick border between regions
} as const;
