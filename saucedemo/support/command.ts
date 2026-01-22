// commands.ts
/// <reference types="cypress" />

// Step 1: Extend Cypress Chainable interface
declare namespace Cypress {
  interface Chainable {
    login(): Chainable<void>;
    step(message: string): Chainable<void>;
    navigateToInventory(): Chainable<void>;
  }
}

// Step 2: Add the commands
Cypress.Commands.add('login', () => {
  cy.get('#user-name').type('standard_user');
  cy.get('#password').type('secret_sauce');
  cy.get('#login-button').click();
});
// Cypress.Commands.add('step', (message: string) => {
//   cy.then(() => {
//     try {
//       Cypress.log({
//         name: 'STEP',
//         message: message,
//       });
//     } catch (e) {
//       // Fallback to console if Cypress.log fails
//       console.log(`STEP: ${message}`);
//     }
//   });
// });



