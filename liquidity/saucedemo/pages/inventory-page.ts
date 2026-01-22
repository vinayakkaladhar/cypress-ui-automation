export class InventoryPage {

  productsText() {
    return cy.contains('Products');
  }

  inventoryItems() {
    return cy.get("[data-test='inventory-item']");
  }

    burgerIcon() {
    return cy.get("[id='react-burger-menu-btn']");
  }

      allItemsLink() {
    return cy.contains("All Items");
  }

  addToCartButtons() {
    return cy.contains('Add to cart');
  }

  shoppingCartLink() {
    return cy.get("[data-test='shopping-cart-link']");
  }

  sortingOption() {
    return cy.get("[data-test='product-sort-container']");
  }

    selectSortingByValue(option: 'az' | 'za' | 'lohi' | 'hilo') {
    this.sortingOption().select(option);
  }

    inventoryItemsList() {
    return cy.get('[data-test="inventory-item"]');
  }

      shoppingCartBadge() {
    return cy.get('[data-test="shopping-cart-badge"]');
  }
      cartIcon() {
    return cy.get('[data-test="shopping-cart-link"]');
  }

  verifyInventoryProductsPageIsLoaded() {
    cy.url().should('include', '/inventory');
    this.productsText().should('be.visible');
  }

  verifyProductsListIsDisplayed(count: number) {
    this.inventoryItems()
      .its('length')
      .should('be.greaterThan', count);
  }
  

  verifyProductDetailsAreDisplayedWithPrice(productName: string, price: string) {
    cy.contains(productName).should('be.visible');
    cy.contains(price).should('be.visible');
  }

  verifyAddToCartOptionIsDisplayedFor(productName: string) {
    cy.contains('.inventory_item', productName)
      .find('button')
      .contains('Add to cart')
      .should('be.visible');
  }

  verifyCartAndSortingOptionsAreDisplayed() {
    this.shoppingCartLink().should('be.visible');
    this.sortingOption().should('be.visible');
  }

    verifyFirstItemName(expectedName: string) {
    this.inventoryItems()
      .first()
      .find('[data-test="inventory-item-name"]')
      .should('have.text', expectedName);
  }

    addProductToCart(productName: string) {
    cy.contains('.inventory_item', productName)
      .find('button')
      .contains('Add to cart')
      .click();
  }

  verifyRemoveOptionIsDisplayedFor(productName: string) {
  cy.contains('.inventory_item', productName)
    .find('button')
    .contains('Remove')
    .should('be.visible');
}

  removeItemAddedToCart(productName: string) {
  cy.contains('.inventory_item', productName)
    .find('button')
    .contains('Remove').click();
}

verifyCartBadgeCount(expectedCount: number) {
  this.shoppingCartBadge()
    .should('have.text', expectedCount.toString());
}



navigateToInventoryPage() {
  this.burgerIcon().click();
    this.allItemsLink().click();
}

}
