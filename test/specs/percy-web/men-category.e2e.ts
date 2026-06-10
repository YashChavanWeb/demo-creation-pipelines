/// <reference types="@wdio/globals/types" />
import { browser, $, $$ } from "@wdio/globals";
import * as PercySDK from "@percy/webdriverio";
const percySnapshot = (PercySDK as any).default ?? PercySDK;

/**
 * Test: Men Category Navigation with Percy Screenshots
 *
 * Flow:
 *  1. Open homepage → Percy snapshot
 *  2. Click "Men" in navbar → Percy snapshot
 *  3. Scroll down on Men's page → Percy snapshot
 *  4. Click the 3rd product card (Crew Neck Sweater) → Percy snapshot
 *
 * Uses @percy/webdriverio for explicit Percy snapshots (compatible with WebdriverIO v9).
 *
 * Selectors (captured via DOM session):
 *  - Men nav button:  nav[1]/button[2]  |  data-slot="button", text "Men"
 *    XPath: /html[1]/body[1]/div[1]/div[1]/header[1]/div[2]/div[1]/nav[1]/button[2]
 *  - 3rd card content: [data-slot="card-content"]:nth(2)  (0-indexed 3rd item)
 *    XPath: /html[1]/body[1]/div[1]/div[1]/main[1]/div[1]/div[2]/div[3]/div[3]/div[1]
 *  - 3rd card clickable body: div.p-4.space-y-3 inside 3rd card
 *    XPath: /html[1]/body[1]/div[1]/div[1]/main[1]/div[1]/div[2]/div[3]/div[3]/div[1]/div[2]
 *  - Product detail heading: h1 "Crew Neck Sweater"
 */

describe("FashionStack - Men Category Navigation", () => {
  it("should navigate to Men category, scroll, click 3rd card, and take Percy screenshots", async () => {

    // ── Step 1: Open homepage ──────────────────────────────────────────────
    await browser.url("https://ecommercebs.vercel.app/");
    await browser.maximizeWindow();

    // Wait for the navbar to be visible
    const menNavBtn = $("//header//nav//button[2]");
    await menNavBtn.waitForDisplayed({ timeout: 15000 });

    // Percy snapshot 1: Homepage
    await percySnapshot(browser, "Homepage", { percyCSS: "body { overflow: hidden !important; }" });

    // ── Step 2: Click "Men" in the navbar ─────────────────────────────────
    await menNavBtn.click();

    // Wait for Men's page heading to appear
    const menHeading = $("h1=Men's Fashion");
    await menHeading.waitForDisplayed({ timeout: 15000 });

    // Percy snapshot 2: Men Category Page
    await percySnapshot(browser, "Men Category Page", { percyCSS: "body { overflow: hidden !important; }" });

    // ── Step 3: Scroll down on Men's page ─────────────────────────────────
    await browser.execute(() => window.scrollBy(0, 400));
    await browser.pause(800); // brief pause for scroll to settle

    // Percy snapshot 3: Men Category Page - Scrolled
    await percySnapshot(browser, "Men Category Page - Scrolled", { percyCSS: "body { overflow: hidden !important; }" });

    // ── Step 4: Click the 3rd product card (Crew Neck Sweater) ────────────
    const cardContents = await $$('[data-slot="card-content"]');
    const thirdCardBody = await cardContents[2].$("div.p-4.space-y-3");
    await thirdCardBody.waitForDisplayed({ timeout: 10000 });
    await thirdCardBody.click();

    // Wait for product detail page to load
    const productHeading = $("h1=Crew Neck Sweater");
    await productHeading.waitForDisplayed({ timeout: 15000 });

    // Percy snapshot 4: Product Detail - Crew Neck Sweater
    await percySnapshot(browser, "Product Detail - Crew Neck Sweater", { percyCSS: "body { overflow: hidden !important; }" });

    // Verify we landed on the correct product page
    const headingText = await productHeading.getText();
    expect(headingText).toBe("Crew Neck Sweater");
  });
});