/// <reference types="@wdio/globals/types" />
import { config as sharedConfig } from "./wdio.shared.conf.js";

export const config: WebdriverIO.Config = {
  ...sharedConfig,

  specs: ["../test/specs/percy-web/**/*.ts"],

  capabilities: [
    {
      browserName: "chrome",
      "bstack:options": {
        buildName: "Percy Web Visual - FashionStack",
        sessionName: "Web Percy Visual Journey",
        debug: true,
        networkLogs: true,
        consoleLogs: "info",
      } as unknown as WebdriverIO.Capabilities,
    },
  ],

  mochaOpts: {
    ui: "bdd",
    timeout: 180000,
  },
};