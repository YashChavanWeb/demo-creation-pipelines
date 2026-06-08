/// <reference types="@wdio/globals/types" />
import { config as sharedConfig } from "./wdio.shared.conf.js";

/**
 * Android Self-Heal Configuration
 *
 * App upload steps (run once before executing tests):
 *
 *   # Upload original APK:
 *   curl -u "$BROWSERSTACK_USERNAME:$BROWSERSTACK_ACCESS_KEY" \
 *     -X POST "https://api-cloud.browserstack.com/app-automate/upload" \
 *     -F "file=@/path/to/final_app_simple.apk" \
 *     -F "custom_id=selfheal_android_og"
 *
 *   # Upload changed APK (for healing demo):
 *   curl -u "$BROWSERSTACK_USERNAME:$BROWSERSTACK_ACCESS_KEY" \
 *     -X POST "https://api-cloud.browserstack.com/app-automate/upload" \
 *     -F "file=@/path/to/final_app_simple_changed.apk" \
 *     -F "custom_id=selfheal_android_changed"
 *
 * Set env var before running:
 *   export BROWSERSTACK_ANDROID_APP_URL="bs://<hashed_app_id>"
 */

export const config: WebdriverIO.Config = {
  ...sharedConfig,
  specs: ["../test/specs/e2e-mobile/android/**/*.ts"],
  capabilities: [
    {
      platformName: "Android",
      "appium:deviceName": "Samsung Galaxy S23",
      "appium:platformVersion": "13.0",
      "appium:automationName": "UiAutomator2",
      // Original APK (final_app_simple.apk):         bs://3d929e5bfb1ff9098d15bc8cd61199be35360fd5
      // Changed APK (final_app_simple_changed.apk):  bs://9a2b07812a5069df6daf39cf94bf349b561809cd
      // Set BROWSERSTACK_ANDROID_APP_URL env var to switch between them — never hardcode credentials
      "appium:app": process.env.BROWSERSTACK_ANDROID_APP_URL || "bs://3d929e5bfb1ff9098d15bc8cd61199be35360fd5",
      "appium:autoGrantPermissions": true,
      "appium:noReset": true,
      "appium:fullReset": false,
      "appium:newCommandTimeout": 600,
      ...({ "appium:allowInvisibleElements": true } as Record<string, unknown>),
      "bstack:options": {
        buildName: "self heal priyansh",
        sessionName: "Android Self-Heal Journey",
        projectName: "Self Heal Priyansh",
        deviceName: "Samsung Galaxy S23",
        osVersion: "13.0",
        debug: true,
        networkLogs: true,
        deviceLogs: true,
        appiumLogs: true,
        interactiveDebugging: true,
        selfHeal: true,
      } as Record<string, unknown>,
    },
  ],
};