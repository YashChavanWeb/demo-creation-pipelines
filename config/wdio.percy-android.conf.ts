/// <reference types="@wdio/globals/types" />
import { config as sharedConfig } from "./wdio.shared.conf.js";

// Extend WDIO capabilities type to allow appium: prefixed keys
interface AndroidCapabilities extends WebdriverIO.Capabilities {
  [key: `appium:${string}`]: unknown;
}

const cap: AndroidCapabilities = {
  platformName: "android",
  "bstack:options": {
    buildName: "Percy Android Visual - Demo App",
    sessionName: "Android Percy Visual Journey",
    deviceName: "Samsung Galaxy S23",
    osVersion: "13.0",
    appiumVersion: "2.0.0",
    debug: true,
    networkLogs: true,
    idleTimeout: 300,
  },
  "appium:app": "bs://0c9f61e6b66889a8b64c771c3895cc9055982a9d",
  "appium:automationName": "UiAutomator2",
  "appium:allowInvisibleElements": true,
};

export const config: WebdriverIO.Config = {
  ...sharedConfig,

  specs: ["../test/specs/percy-mobile/percy-android.spec.ts"],

  capabilities: [cap as WebdriverIO.Capabilities],

  mochaOpts: {
    ui: "bdd",
    timeout: 120000,
  },
};