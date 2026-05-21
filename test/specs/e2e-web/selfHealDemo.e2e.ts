import EcommercePage from "../../pageobjects/web/ecommerce.page.js";

describe("BrowserStack Self-Healing Demo", () => {
  it("Execute E-Commerce Flow", async () => {
    // 1. Open the website
    await EcommercePage.open();

    if (process.env.TRIGGER_HEAL === "true") {
      /**
       * SELF-HEALING RUN (Run 2):
       * - Toggle breaks the selectors (e.g. #login → #signin)
       * - BrowserStack Self-Healing uses fingerprints from the baseline run
       *   (Run 1, no toggle) to locate the visually-identical elements
       *   even though their IDs have changed.
       *
       * IMPORTANT: Run the baseline first (without TRIGGER_HEAL) so BrowserStack
       * can record element fingerprints. Self-Healing learns across sessions,
       * not within a single session.
       */
      await EcommercePage.toggleTestMode();
    }

    // Run the login and scan sequence using original locators.
    // On the healing run, BrowserStack Self-Healing resolves broken selectors.
    await EcommercePage.executeLoginAndScanSequence();
  });
});