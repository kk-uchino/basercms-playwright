import { defineConfig, devices } from "@playwright/test";

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
require("dotenv").config();

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: "./tests",
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: "html",
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: process.env.BASE_URL,

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: "on-first-retry",
  },
  timeout: 10 * 1000,

  /* Configure projects for major browsers */
  projects: [
    {
      name: "setup",
      testMatch: /.*\.setup\.ts/,
      use: {
        locale: "ja-JP",
        timezoneId: "Asia/Tokyo",
      },
    },

    {
      name: "front",
      testMatch: /front\/.*\.spec\.ts/,
      use: {
        ...devices["Desktop Chrome"],
        locale: "ja-JP",
        timezoneId: "Asia/Tokyo",
      },
    },

    {
      name: "admin_no_auth",
      testMatch: /admin\/login\.spec\.ts/,
      use: {
        ...devices["Desktop Chrome"],
        locale: "ja-JP",
        timezoneId: "Asia/Tokyo",
      },
    },

    {
      name: "admin",
      testMatch: /admin\/auth\/.*\.spec\.ts/,
      use: {
        ...devices["Desktop Chrome"],
        locale: "ja-JP",
        timezoneId: "Asia/Tokyo",
        storageState: process.env.AUTH_COOKIE_PATH,
      },
      dependencies: ["setup"],
    },

    // {
    //   name: "firefox",
    //   use: {
    //     ...devices["Desktop Firefox"],
    //     locale: "ja-JP",
    //     timezoneId: "Asia/Tokyo",
    //   },
    // },

    // {
    //   name: "webkit",
    //   use: {
    //     ...devices["Desktop Safari"],
    //     locale: "ja-JP",
    //     timezoneId: "Asia/Tokyo",
    //   },
    // },

    /* Test against mobile viewports. */
    // {
    //   name: "Mobile Chrome",
    //   use: { ...devices["Pixel 5"], locale: "ja-JP", timezoneId: "Asia/Tokyo" },
    // },
    // {
    //   name: "Mobile Safari",
    //   use: {
    //     ...devices["iPhone 12"],
    //     locale: "ja-JP",
    //     timezoneId: "Asia/Tokyo",
    //   },
    // },

    /* Test against branded browsers. */
    // {
    //   name: "Microsoft Edge",
    //   use: {
    //     ...devices["Desktop Edge"],
    //     channel: "msedge",
    //     locale: "ja-JP",
    //     timezoneId: "Asia/Tokyo",
    //   },
    // },
    // {
    //   name: "Google Chrome",
    //   use: {
    //     ...devices["Desktop Chrome"],
    //     channel: "chrome",
    //     locale: "ja-JP",
    //     timezoneId: "Asia/Tokyo",
    //   },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: "npm run start",
  //   url: "http://127.0.0.1:3000",
  //   reuseExistingServer: !process.env.CI,
  // },
});
