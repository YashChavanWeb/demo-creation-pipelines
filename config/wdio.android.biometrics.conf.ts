/// <reference types="@wdio/globals/types" />
import { config as sharedConfig } from "./wdio.shared.conf.js";

export const config: WebdriverIO.Config = {
  ...sharedConfig,
  specs: ["../test/specs/e2e-mobile/android/biometrics.spec.ts"],
  capabilities: [
    {
      platformName: "android",
      "appium:app": "bs://b3b099aa591c49bcb9092e7469397a8b9ccbe8b7",
      "appium:deviceName": "Samsung Galaxy S23",
      "appium:platformVersion": "13.0",
      "appium:automationName": "UiAutomator2",
      "bstack:options": {
        projectName: "Image Injection Priyansh",
        buildName: "Image Injection Priyansh",
        sessionName: "Biometric Authentication",
        deviceName: "Samsung Galaxy S23",
        osVersion: "13.0",
        enableBiometric: true,
        debug: true,
        networkLogs: true,
        deviceLogs: true,
        appiumLogs: true,
        video: true,
        appiumVersion: "2.0.0",
      } as Record<string, unknown>,
    },
  ],
};