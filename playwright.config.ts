import { defineConfig, devices } from "@playwright/test";
import type { TestOptions } from "./test-options";

require("dotenv").config();

export default defineConfig<TestOptions>({
  retries: 1,
  reporter: [
    ["json", { outputFile: "test-results/jsonReport.json" }],
    ["junit", { outputFile: "test-results/junitReport.xml" }],
    ["html"],
  ],

  use: {
    baseURL: "http://localhost:4200/",
    globalsQaURL: "https://www.globalsqa.com/demo-site/draganddrop/",
    trace: "on-first-retry",
    actionTimeout: 20000,
    navigationTimeout: 25000,
    video: {
      mode: "off",
      size: { width: 1280, height: 720 },
    },
  },

  projects: [
    {
      name: "dev",
      use: { ...devices["Desktop Chrome"], baseURL: "http://localhost:4200/" },
    },

    {
      name: "chromium",
    },

    {
      name: "firefox",
      use: { browserName: "firefox" },
    },
    {
      name: "pageObjectFullScreen",
      testMatch: "pageObjects.spec.ts",
      use: {
        viewport: { width: 1920, height: 1080 },
      },
    },
    {
      name: "mobile",
      testMatch: "testMobile.spec.ts",
      use: { ...devices["iPhone 13 Pro"] },
    },
  ],

  webServer: {
    command: "npm run start",
    url: "http://localhost:4200/",
    timeout: 120 * 1000,
  },
});
