/// <reference types="@wdio/globals/types" />
import { config as sharedConfig } from "./wdio.shared.conf.js";

export const config: WebdriverIO.Config = {
  ...sharedConfig,

  user: process.env.BROWSERSTACK_USERNAME || "yashchavan_W0v7UG",
  key: process.env.BROWSERSTACK_ACCESS_KEY || "VpLsY6V6pqryesTEF9ui",

  specs: ["../test/specs/percy-web/men-category.e2e.ts"],

  maxInstances: 1,
  waitforTimeout: 30000,

  services: [
    [
      "browserstack",
      {
        browserstackLocal: false,
        percy: true,
      },
    ],
  ],

  capabilities: [
    {
      browserName: "chrome",
      "goog:chromeOptions": {
        args: ["--window-size=1920,1080", "--start-maximized"],
      },
      "bstack:options": {
        browserVersion: "latest",
        os: "Windows",
        osVersion: "11",
        buildName: "AI Noise and Descriptions",
        sessionName: "Men Category Navigation with Percy Screenshots",
        projectName: "FashionStack Percy Demo",
        debug: true,
        networkLogs: true,
        consoleLogs: "info",
        resolution: "1920x1080",
      } as any,
    },
  ],
};