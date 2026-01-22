import data from '../../config/cypress.prod.json';
import { LoginPage } from '../../pages/login-page';
import { InventoryPage } from '../../pages/inventory-page';
import { CartPage } from '../../pages/cart-page';
import '../../support/command';


describe('End-to-end test cases for the Cart Page', () => {

  const loginPage = new LoginPage();
  const inventoryPage = new InventoryPage();
  const cartPage = new CartPage();

  it('[smoke] Verify adding items to cart', () => {
    cy.log('Add multiple products to cart');
    ['Sauce Labs Backpack', 'Sauce Labs Bike Light', 'Sauce Labs Bolt T-Shirt'].forEach(product => {
      inventoryPage.addProductToCart(product);
      inventoryPage.verifyRemoveOptionIsDisplayedFor(product);
    });

    cy.log('Verify cart badge count is 3');
    inventoryPage.verifyCartBadgeCount(3);

    cy.log('Navigate to cart and verify items with correct prices');
    cartPage.navigateToCart();
    cartPage.verifyMultipleItems([
      { name: 'Sauce Labs Backpack', price: '$29.99' },
      { name: 'Sauce Labs Bike Light', price: '$9.99' },
      { name: 'Sauce Labs Bolt T-Shirt', price: '$15.99' }
    ]);

    cy.log('Return to inventory page');
    inventoryPage.navigateToInventoryPage();
  });

  it('[regression] Verify adding and removing items from the cart', () => {
    cy.log('Add products to cart');
    inventoryPage.addProductToCart('Sauce Labs Backpack');
    inventoryPage.addProductToCart('Sauce Labs Bike Light');
    inventoryPage.verifyCartBadgeCount(2);

    cy.log('Remove one item from inventory page and verify badge');
    inventoryPage.removeItemAddedToCart('Sauce Labs Backpack');
    inventoryPage.verifyCartBadgeCount(1);

    cy.log('Verify remaining item in cart');
    cartPage.navigateToCart();
    cartPage.verifyMultipleItems([{ name: 'Sauce Labs Bike Light', price: '$9.99' }]);

    cy.log('Remove remaining item from cart page');
    cartPage.removeProductFromCart('Sauce Labs Bike Light');

    cy.log('Return to inventory and re-add item');
    inventoryPage.navigateToInventoryPage();
    inventoryPage.addProductToCart('Sauce Labs Bike Light');
  });
});
