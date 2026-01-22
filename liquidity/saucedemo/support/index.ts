/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable<Subject = any> {
    /**
     * Custom command to log a step
     * @example cy.step('Login to the application')
     */
    step(message: string): Chainable<Subject>;
  }
}
