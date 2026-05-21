/// <reference types="@wdio/globals/types" />
import { config as sharedConfig } from "./wdio.shared.conf.js";

export const config: WebdriverIO.Config = {
  ...sharedConfig,

  // Target all web e2e test files
  specs: ["../test/specs/e2e-web/**/*.ts"],

  // Keep concurrency at 1 to avoid exhausting trial/plan parallel limits
  maxInstances: 1,

  // Increase global wait timeout — BrowserStack remote sessions can be slower
  waitforTimeout: 30000,

  capabilities: [
    {
      browserName: "chrome",
      "bstack:options": {
        buildName: "E2E Web - Demo Hub",
        sessionName: "Self Healing Demo Suite",
        debug: true,
        networkLogs: true,
        consoleLogs: "info",
        selfHeal: true,
      } as any,
    },
  ],
};