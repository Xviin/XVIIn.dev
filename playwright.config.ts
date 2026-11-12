import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  reporter: "line",
  use: { baseURL: "http://localhost:3000" },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
  webServer: {
    command: "npm run build && npm start",
    url: "http://localhost:3000",
    reuseExistingServer: !process.env.CI,
    timeout: 240_000,
  },
});
