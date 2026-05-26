import { $, $$ } from "@wdio/globals";

class HomePage {
  get menuButton() {
    return $("~menu");
  }

  get cartButton() {
    return $("~nav-cart");
  }

  get productsFound() {
    return $("~products-found");
  }

  async openMenu() {
    await this.menuButton.waitForExist({ timeout: 10000 });
    await this.menuButton.click();
  }

  async openCart() {
    await this.cartButton.waitForExist({ timeout: 10000 });
    await this.cartButton.click();
  }

  async addFirstProductToCart() {
    // Wait for any add-to-cart button to appear using the first product (id 12)
    const addBtn = await $("~add-to-cart-12");
    await addBtn.waitForExist({ timeout: 10000 });
    await addBtn.click();
  }
}

export default new HomePage();