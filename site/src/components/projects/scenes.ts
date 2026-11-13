import type { ComponentType } from "react";

/**
 * Per-project interactive scenes/demos. Add an entry keyed by project slug:
 *   claff: () => import("./scenes/ClaffScene"),
 * The component renders above the project's text on its page.
 */
export const scenes: Record<string, () => Promise<{ default: ComponentType }>> = {
  claff: () => import("./scenes/ClaffScene"),
};
