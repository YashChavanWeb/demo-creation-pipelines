/// <reference types="@wdio/globals/types" />
import { config as sharedConfig } from "./wdio.shared.conf.js";

// Extend WDIO capabilities type to allow appium: prefixed keys
interface IOSCapabilities extends WebdriverIO.Capabilities {
  [key: `appium:${string}`]: unknown;
}

const cap: IOSCapabilities = {
  platformName: "ios",
  "bstack:options": {
    buildName: "Percy iOS Visual - Demo App",
    sessionName: "iOS Percy Visual Journey",
    deviceName: "iPhone 15",
    osVersion: "17",
    appiumVersion: "2.0.0",
    debug: true,
    networkLogs: true,
    idleTimeout: 300,
  },
  "appium:app": "bs://5aedc01debe5f84a69dc2ac330fba298d2e8e731",
  "appium:automationName": "XCUITest",
};

export const config: WebdriverIO.Config = {
  ...sharedConfig,

  specs: ["../test/specs/percy-mobile/percy-ios.spec.ts"],

  capabilities: [cap as WebdriverIO.Capabilities],

  mochaOpts: {
    ui: "bdd",
    timeout: 120000,
  },
};