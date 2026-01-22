export class CartPage {
  cartItems() {
    return cy.get('[data-test="inventory-item"]');
  }

        cartIcon() {
    return cy.get('[data-test="shopping-cart-link"]');
  }


  verifyItemWithPrice(itemName: string, price: string) {
    cy.contains('[data-test="inventory-item"]', itemName)
      .within(() => {
        cy.get('[data-test="inventory-item-name"]')
          .should('have.text', itemName);

        cy.get('[data-test="inventory-item-price"]')
          .should('have.text', price);
      });
  }

    removeProductFromCart(productName: string) {
    return this.cartItems()
      .contains('[data-test="inventory-item-name"]', productName) 
      .parents('[data-test="inventory-item"]')
      .find('button') 
      .contains('Remove').click();
  }

  navigateToCart() {
  this.cartIcon().click();
}

  verifyMultipleItems(items: { name: string; price: string }[]) {
    items.forEach(item => {
      this.verifyItemWithPrice(item.name, item.price);
    });
  }
}
