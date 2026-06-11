/// <reference types="@wdio/globals/types" />
import {config as sharedConfig} from "./wdio.shared.conf.js";

export const config: WebdriverIO.Config = {
  ...sharedConfig,
  specs: ["../test/specs/e2e-mobile/android/**/*.ts"],
  services: [
    [
      "browserstack",
      {
        app: "./test/apps/browserstack-demoapp.apk",
      },
    ],
  ],
  capabilities: [
    {
      "bstack:options": {
        platformName: "android",
        buildName: "E2E Android - Demo Hub",
        sessionName: "Android Functional Journey",
        deviceName: "Samsung Galaxy S23",
        osVersion: "13.0",
        debug: true,
        networkLogs: true,
        consoleLogs: "info",
        appiumVersion: "2.0.0",
      },
    },
  ],
};
