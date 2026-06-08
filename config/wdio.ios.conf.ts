/// <reference types="@wdio/globals/types" />
import { config as sharedConfig } from "./wdio.shared.conf.js";

/**
 * iOS Self-Heal Configuration
 *
 * App upload steps (run once before executing tests):
 *
 *   # Upload original IPA:
 *   curl -u "$BROWSERSTACK_USERNAME:$BROWSERSTACK_ACCESS_KEY" \
 *     -X POST "https://api-cloud.browserstack.com/app-automate/upload" \
 *     -F "file=@/path/to/testapp_ios_og.ipa" \
 *     -F "custom_id=selfheal_ios_og"
 *
 *   # Upload changed IPA (for healing demo):
 *   curl -u "$BROWSERSTACK_USERNAME:$BROWSERSTACK_ACCESS_KEY" \
 *     -X POST "https://api-cloud.browserstack.com/app-automate/upload" \
 *     -F "file=@/path/to/testapp_changed.ipa" \
 *     -F "custom_id=selfheal_ios_changed"
 *
 * Set env var before running:
 *   export BROWSERSTACK_IOS_APP_URL="bs://<hashed_app_id>"
 */

export const config: WebdriverIO.Config = {
  ...sharedConfig,
  specs: ["../test/specs/e2e-mobile/ios/**/*.ts"],
  capabilities: [
    {
      platformName: "iOS",
      "appium:deviceName": "iPhone 15",
      "appium:platformVersion": "17",
      "appium:automationName": "XCUITest",
      // Original IPA (testapp_ios_og.ipa):  bs://55312b98db24e8cdac0f042a17d2002b3097ebce
      // Changed IPA (testapp_changed.ipa):  bs://e6b759f1618a13f1f7721f0aec3b78bfd36360b4
      // Set BROWSERSTACK_IOS_APP_URL env var to switch between them — never hardcode credentials
      "appium:app": process.env.BROWSERSTACK_IOS_APP_URL || "bs://55312b98db24e8cdac0f042a17d2002b3097ebce",
      "appium:autoAcceptAlerts": true,
      "appium:noReset": true,
      "appium:newCommandTimeout": 600,
      ...({ "appium:allowInvisibleElements": true } as Record<string, unknown>),
      "bstack:options": {
        buildName: "self heal priyansh",
        sessionName: "iOS Self-Heal Journey",
        projectName: "Self Heal Priyansh",
        deviceName: "iPhone 15",
        osVersion: "17",
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