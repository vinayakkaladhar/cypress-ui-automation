import data from '../../config/cypress.prod.json';
import { LoginPage } from '../../pages/login-page';
import { InventoryPage } from '../../pages/inventory-page';
import { CartPage } from '../../pages/cart-page';
import '../../support/command';
import { CheckoutPage } from '../../pages/checkout-page';


describe('End-to-end test cases for the checkout experience Inventory → Cart → Checkout', () => {

  const loginPage = new LoginPage();
  const inventoryPage = new InventoryPage();
  const cartPage = new CartPage();
  const checkoutPage = new CheckoutPage();

  beforeEach(() => {
    cy.log('Login to the application');
    cy.visit(data.loginUrl);
    cy.login();
  });

  it('[smoke] Verify checkout experience of the user', () => {
    cy.log('Add multiple products to cart');
    ['Sauce Labs Backpack', 'Sauce Labs Bike Light'].forEach(product => {
      inventoryPage.addProductToCart(product);
    });

    cy.log('Verify cart badge count is 2');
    inventoryPage.verifyCartBadgeCount(2);

    cy.log('Navigate to cart and verify items with correct prices');
    cartPage.navigateToCart();
    cartPage.verifyMultipleItems([
      { name: 'Sauce Labs Backpack', price: '$29.99' },
      { name: 'Sauce Labs Bike Light', price: '$9.99' }
    ]);

    cy.log('Navigate to checkout page');
    checkoutPage.clickCheckoutButton();

    cy.log('Fill in checkout information');
    checkoutPage.firstName().type(data.firstName);
    checkoutPage.lastName().type(data.lastName);
    checkoutPage.postalCode().type(data.postalCode);

    cy.log('Continue with the checkout process');
    checkoutPage.clickContinueButton();

    cartPage.verifyMultipleItems([
      { name: 'Sauce Labs Backpack', price: '$29.99' },
      { name: 'Sauce Labs Bike Light', price: '$9.99' }
    ]);
    cy.log('Verify summary details');
    checkoutPage.verifySummaryDetails({
  payment: 'SauceCard #31337',
  shipping: 'Free Pony Express Delivery!',
  subtotal: 'Item total: $39.98',
  tax: 'Tax: $3.20',
  total: 'Total: $43.18'
});
checkoutPage.completeCheckout();
cy.log('Verify order completion');
checkoutPage.verifyOrderCompletion();

});
});
