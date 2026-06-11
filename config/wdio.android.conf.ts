/// <reference types="@wdio/globals/types" />
import {config as sharedConfig} from "./wdio.shared.conf.js";

// Base object for identical Appium device settings
const baseAndroidCaps = {
  platformName: "android",
  "appium:deviceName": "Samsung Galaxy S23",
  "appium:platformVersion": "13.0",
  "appium:automationName": "UiAutomator2",
};

// Base object for identical BrowserStack logging options
const baseBstackOptions = {
  debug: true,
  networkLogs: true,
  deviceLogs: true,
  appiumLogs: true,
  video: true,
  interactiveDebugging: true,
};

export const config: WebdriverIO.Config = {
  ...sharedConfig,

  capabilities: [
    // Biometrics & Image Injection
    {
      ...baseAndroidCaps, // Injects all the base device settings here
      specs: [
        "../test/specs/e2e-mobile/android/biometrics.spec.ts",
        "../test/specs/e2e-mobile/android/image-injection.spec.ts",
      ],
      "appium:app": "bs-demo-biometrics-and-camera",
      "bstack:options": {
        ...baseBstackOptions, // Injects all the standard logs here
        buildName: "E2E Android - Feature Tests",
        sessionName: "Biometrics & Image Injection",
        enableCameraImageInjection: true,
        enableBiometric: true,
      },
    },

    // App Discovery, Checkout, and Features
    {
      ...baseAndroidCaps,
      specs: [
        "../test/specs/e2e-mobile/android/app-discovery.spec.ts",
        "../test/specs/e2e-mobile/android/checkout.e2e.ts",
        "../test/specs/e2e-mobile/android/features.e2e.ts",
      ],
      "appium:app": "bs-demo-android",
      "bstack:options": {
        ...baseBstackOptions,
        buildName: "E2E Android - Core Flows",
        sessionName: "Checkout & Discovery",
      },
    },
  ] as any,
};
