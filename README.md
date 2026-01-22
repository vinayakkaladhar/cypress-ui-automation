# Cypress End-to-End Tests – SauceDemo Inventory

This repository contains Cypress end-to-end tests for automating the **Products Inventory Page** of the SauceDemo application.

**Application Under Test:**  
https://www.saucedemo.com/

The test suite validates core user flows such as product listing, sorting, cart behavior, and a basic checkout happy path using Cypress with a clean and maintainable structure.

---

## ✅ Test Coverage

### 1. Inventory Page – Smoke & Basic Validations

- Verify application login page loads
- Login with valid credentials (`standard_user / secret_sauce`)
- Assert redirection to Inventory (Products) page
- Validate:
  - Page title (`Products`) is visible
  - At least one product item is rendered
  - Cart icon and sorting dropdown are displayed
  - Each product tile shows:
    - Name
    - Price
    - **Add to cart** button

---

### 2. Product Sorting

Validates sorting using the **Sort By** dropdown:

- Name (A → Z)
- Name (Z → A)
- Price (Low → High)
- Price (High → Low)

For each option:

- Capture product list before and after sorting
- Assert UI order matches expected sorted results

---

### 3. Add to Cart (Inventory Page)

- Add a single product:
  - Verify button changes to **Remove**
  - Verify cart badge count updates correctly
- Add multiple products (3+):
  - Validate cart badge count
  - Validate selected products show **Remove**
- Navigate to Cart:
  - Verify product name, quantity, and price
- Navigate back to Inventory:
  - Validate cart badge and button states remain consistent

---

### 4. Remove Items & Cart Consistency

- Remove items from Inventory page:
  - Verify cart badge decrements
  - Verify button reverts to **Add to cart**
- Validate cart contents after removal
- Remove all items from cart:
  - Cart badge hidden or reset
  - All products show **Add to cart**

---

### 5. Inventory → Cart → Checkout (Happy Path Smoke)

- Add 2+ products from Inventory
- Verify cart contents
- Proceed to Checkout
- Fill user details:
  - First Name
  - Last Name
  - Postal Code
- Verify overview page:
  - Items match inventory selection
  - Total amount is displayed
- Complete checkout
- Verify confirmation message:
  - **Thank you for your order!**

---

## 🧱 Project Structurecypress/

├── e2e/
│ ├── inventory.spec.ts
│ ├── cart.spec.ts
│ └── checkout.spec.ts
├── pages/
│ ├── LoginPage.ts
│ ├── InventoryPage.ts
│ └── CartPage.ts
├── support/
│ ├── commands.ts
│ └── e2e.ts
├── reports/
package.json
cypress.config.ts
README.md

---

## 🧩 Design Decisions

- Page Object Model (POM) used for better readability and reuse
- Custom Cypress commands (e.g. `cy.login()`) to reduce duplication
- data-test attributes preferred for stable selectors
- Tests grouped logically by feature (Inventory, Cart, Checkout)
- Smoke and regression scenarios separated using naming conventions

---

## 🚀 Setup & Installation

### Prerequisites

- Node.js (v16+ recommended)
- npm or yarn

### Install dependencies

```bash
npm install
```bash
npm install
```

### Running Tests

```bash
cd saucedemo && npx cypress run
or for specific test
cd saucedemo && npx cypress run --spec "integration/e2e/{test_name}.spec.ts"
```

---

## 📊 Reporting Enhancement

Integrated Mochawesome HTML reporter

HTML Reports, failure screenshots and videos are generated under `cypress/reports/`

---

## 🔖 Notes & Assumptions

- Tests focus on functional validation, not visual testing
- Checkout flow is treated as a happy-path smoke test
- No external test data dependencies
- Application state resets automatically after session end

### Page Object Model (POM)

Each page is encapsulated in its own class with:

- **Selectors** defined as private properties using data-test attributes
- **Methods** for user interactions (click, fill, submit)
- **Assertions** for validating page state

**Example structure:**

```typescript
export class InventoryPage {
    private productList = '[data-test="inventory-list"]';
    private addToCartBtn = '[data-test="add-to-cart"]';
    private cartBadge = '[data-test="cart-badge"]';

    addProductToCart(productName: string) {
        cy.contains(this.addToCartBtn, productName).click();
    }

    verifyCartBadgeCount(count: number) {
        cy.get(this.cartBadge).should('contain', count);
    }
}
```

**Benefits:**

- Reduces selector duplication across tests
- Improves maintainability when UI changes
- Enhances test readability with semantic method names
- Centralized locator management



## Custom Cypress Commands

Custom commands reduce code duplication and improve test readability by abstracting common actions.

### `cy.login(username, password)`

Logs in a user with provided credentials:

```typescript
cy.login('username', 'password');
**Implementation:**

```typescript
Cypress.Commands.add('login', (username: string, password: string) => {
    cy.visit('https://www.saucedemo.com/');
    cy.get('[data-test="username"]').type(username);
    cy.get('[data-test="password"]').type(password);
    cy.get('[data-test="login-button"]').click();
    cy.get('[data-test="inventory-list"]').should('be.visible');
});
```

**Usage in tests:**

```typescript
it('should login and display inventory', () => {
    cy.login('standard_user', 'secret_sauce');
    cy.get('[data-test="title"]').should('contain', 'Products');
});
```

> **Note:** User credentials are maintained in fixture files for secure test data management.

**Implementation:**

```typescript
Cypress.Commands.add('login', (username: string, password: string) => {
    cy.visit('https://www.saucedemo.com/');
    cy.get('[data-test="username"]').type(username);
    cy.get('[data-test="password"]').type(password);
    cy.get('[data-test="login-button"]').click();
    cy.get('[data-test="inventory-list"]').should('be.visible');
});
```

**Usage in tests:**

```typescript
it('should login and display inventory', () => {
    cy.login('standard_user', 'secret_sauce');
    cy.get('[data-test="title"]').should('contain', 'Products');
});
```

### Benefits

- Encapsulates login flow in a single reusable command
- Eliminates repetitive login code across test files
- Easy to update if login UI changes
- Improves test readability with semantic naming

## Test Data & Configuration Management

### Fixture Files for Test Data

Maintain user credentials and test data in `cypress/fixtures/` for secure, centralized management:

**`cypress/fixtures/users.json`**
```json
{
    "standard_user": {
        "username": "example_user",
        "password": "example_password"
    },
    "locked_user": {
        "username": "locked_out_user",
        "password": "locked_out_password"
    }
}
```

**Usage in tests:**
```typescript
it('should login with fixture data', () => {
        cy.fixture('users').then((users) => {
                cy.login(users.standard_user.username, users.standard_user.password);
        });
});
```

**Benefits:**
- Separates test data from test logic
- Easy to update credentials without modifying test files
- Supports multiple user personas
- Enables data-driven testing

### Environment Variables for URLs

Define application URLs and configuration in `cypress.config.ts`:

```typescript
export default defineConfig({
    e2e: {
        baseUrl: 'https://www.saucedemo.com',
        env: {
            api_url: 'https://api.saucedemo.com',
            timeout: 5000
        }
    }
});
```

**Usage in tests:**
```typescript
cy.visit(Cypress.env('baseUrl'));
cy.request(`${Cypress.env('api_url')}/products`);
```

**Benefits:**
- Centralized URL management
- Easy environment switching (dev, staging, prod)
- Reduces hardcoded URLs across test suite
- Improves maintainability and scalability