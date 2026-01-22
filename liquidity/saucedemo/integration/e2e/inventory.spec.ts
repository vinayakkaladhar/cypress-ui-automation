import data from '../../config/cypress.prod.json';
import { LoginPage } from '../../pages/login-page';
import { InventoryPage } from '../../pages/inventory-page';
import { CartPage } from '../../pages/cart-page';
import '../../support/command';


describe('End-to-end test cases for the Products Inventory Page', () => {

  const loginPage = new LoginPage();
  const inventoryPage = new InventoryPage();
  const cartPage = new CartPage();

  beforeEach(() => {
    cy.log('Login to the application');
    cy.visit(data.loginUrl);
    cy.login();
  });

  it('[smoke] Verify user can navigate to inventory page with items listed', () => {
    cy.log('Verify inventory page is loaded');
    inventoryPage.verifyInventoryProductsPageIsLoaded();

    cy.log('Check cart icon, sorting options, and product list');
    inventoryPage.verifyCartAndSortingOptionsAreDisplayed();
    inventoryPage.verifyProductsListIsDisplayed(3);

    cy.log('Verify details and add-to-cart option for Sauce Labs Backpack');
    inventoryPage.verifyProductDetailsAreDisplayedWithPrice('Sauce Labs Backpack', '29.99');
    inventoryPage.verifyAddToCartOptionIsDisplayedFor('Sauce Labs Backpack');
  });

  it('[regression] Verify product sorting functionality', () => {
    cy.log('Sort by Name (Z to A) and verify first item');
    inventoryPage.selectSortingByValue('za');
    inventoryPage.verifyFirstItemName('Test.allTheThings() T-Shirt (Red)');

    cy.log('Sort by Name (A to Z) and verify first item');
    inventoryPage.selectSortingByValue('az');
    inventoryPage.verifyFirstItemName('Sauce Labs Backpack');

    cy.log('Sort by Price (Low to High) and verify first item');
    inventoryPage.selectSortingByValue('lohi');
    inventoryPage.verifyFirstItemName('Sauce Labs Onesie');

    cy.log('Sort by Price (High to Low) and verify first item');
    inventoryPage.selectSortingByValue('hilo');
    inventoryPage.verifyFirstItemName('Sauce Labs Fleece Jacket');
  });
});
