export const config: WebdriverIO.Config = {
  // Injected via environment variables (GitHub Actions / local export)
  user: process.env.BROWSERSTACK_USERNAME,
  key: process.env.BROWSERSTACK_ACCESS_KEY,

  capabilities: [],

  services: ["browserstack"],

  maxInstances: 1,
  logLevel: "info",
  bail: 0,

  // Mobile apps need longer waits than web
  waitforTimeout: 30000,
  connectionRetryTimeout: 180000,
  connectionRetryCount: 3,

  framework: "mocha",
  reporters: ["spec"],

  mochaOpts: {
    ui: "bdd",
    timeout: 120000,
  },
};