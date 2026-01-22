// commands.ts
/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    login(): Chainable<void>;
    step(message: string): Chainable<void>;
    navigateToInventory(): Chainable<void>;
  }
}

Cypress.Commands.add('login', () => {
  cy.get('#user-name').type('standard_user');
  cy.get('#password').type('secret_sauce');
  cy.get('#login-button').click();
});

Cypress.Commands.add('step', (message: string) => {
  Cypress.log({
    name: 'STEP',
    message: message,
    displayName: 'STEP'
  });
});

Cypress.Commands.add('navigateToInventory', () => {
  cy.url().should('include', '/inventory.html');
});