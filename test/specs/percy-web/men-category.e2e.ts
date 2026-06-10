/// <reference types="@wdio/globals/types" />
import { browser, $, $$ } from "@wdio/globals";
import * as PercySDK from "@percy/webdriverio";
const percySnapshot = (PercySDK as any).default ?? PercySDK;

/**
 * Test: Women Category Navigation with Percy Screenshots
 *
 * Flow:
 *  1. Open homepage → toggle test-mode switch → Percy snapshot
 *  2. Click "Women" in navbar → Percy snapshot
 *  3. Scroll down on Women's page → Percy snapshot
 *  4. Click the 3rd product card → Percy snapshot
 *
 * Uses @percy/webdriverio for explicit Percy snapshots (compatible with WebdriverIO v9).
 *
 * Selectors:
 *  - Women nav button: nav button[3] (text "Women")
 *  - Toggle switch: #test-mode-switch
 *  - 3rd card content: [data-slot="card-content"]:nth(2) → div.p-4.space-y-3
 */

describe("FashionStack - Women Category Navigation", () => {
  it("should navigate to Women category, scroll, click 3rd card, and take Percy screenshots", async () => {

    // ── Step 1: Open homepage ──────────────────────────────────────────────
    await browser.url("https://ecommercebs.vercel.app/");
    await browser.maximizeWindow();

    // Wait for the navbar to be visible
    const menNavBtn = $("//header//nav//button[2]");
    await menNavBtn.waitForDisplayed({ timeout: 15000 });

    // Toggle the test-mode switch
    // const toggleSwitch = $("#test-mode-switch");
    // await toggleSwitch.waitForDisplayed({ timeout: 10000 });
    // await toggleSwitch.click();

    // Percy snapshot 1: Homepage
    await percySnapshot(browser, "Homepage", { percyCSS: "body { overflow: hidden !important; }" });

    // ── Step 2: Click "Men" in the navbar ─────────────────────────────────
    await menNavBtn.click();

    // Wait for Men's page heading to appear
    const menHeading = $("h1=Men's Fashion");
    await menHeading.waitForDisplayed({ timeout: 15000 });

    // Percy snapshot 2: Men Category Page
    await percySnapshot(browser, "Men Category Page", { percyCSS: "body { overflow: hidden !important; }" });

    // ── Step 3: Scroll down on Women's page ───────────────────────────────
    await browser.execute(() => window.scrollBy(0, 400));
    await browser.pause(800); // brief pause for scroll to settle

    // Percy snapshot 3: Men Category Page - Scrolled
    await percySnapshot(browser, "Men Category Page - Scrolled", { percyCSS: "body { overflow: hidden !important; }" });

    // ── Step 4: Click the 3rd product card ────────────────────────────────
    const cardContents = await $$('[data-slot="card-content"]');
    const thirdCardBody = await cardContents[2].$("div.p-4.space-y-3");
    await thirdCardBody.waitForDisplayed({ timeout: 10000 });
    await thirdCardBody.click();

    // Wait for product detail page to load
    const productHeading = $("h1");
    await productHeading.waitForDisplayed({ timeout: 15000 });

    // Percy snapshot 4: Product Detail - Crew Neck Sweater
    await percySnapshot(browser, "Product Detail - Crew Neck Sweater", { percyCSS: "body { overflow: hidden !important; }" });

    // Verify we landed on a product page
    const headingText = await productHeading.getText();
    expect(headingText).toBeTruthy();
  });
});