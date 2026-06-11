/// <reference types="@wdio/globals/types" />
import {config as sharedConfig} from "./wdio.shared.conf.js";

export const config: WebdriverIO.Config = {
  ...sharedConfig,
  specs: ["../test/specs/e2e-mobile/ios/**/*.ts"],
  services: [
    [
      "browserstack",
      {
        app: "../test/resources/browserstack-demoapp.ipa",
      },
    ],
  ],
  capabilities: [
    {
      "bstack:options": {
        platformName: "ios",
        buildName: "E2E iOS - Demo Hub",
        sessionName: "iOS Functional Journey",
        deviceName: "iPhone 15",
        osVersion: "17",
        debug: true,
        networkLogs: true,
        consoleLogs: "info",
      },
    },
  ],
};
