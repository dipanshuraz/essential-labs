/**
 * Panda Loves Bamboo — design tokens barrel.
 * Single source of truth for the brand system. The same values are mirrored as
 * CSS custom properties in `app/panda.css` for styling.
 */
export { colors, type Colors } from "./colors";
export { typography, type Typography } from "./typography";
export { spacing, type Spacing } from "./spacing";
export { radius, type Radius } from "./radius";
export { shadows, type Shadows } from "./shadows";
export { motion, type Motion } from "./motion";

import { colors } from "./colors";
import { typography } from "./typography";
import { spacing } from "./spacing";
import { radius } from "./radius";
import { shadows } from "./shadows";
import { motion } from "./motion";

export const theme = {
  colors,
  typography,
  spacing,
  radius,
  shadows,
  motion,
} as const;

export type Theme = typeof theme;
