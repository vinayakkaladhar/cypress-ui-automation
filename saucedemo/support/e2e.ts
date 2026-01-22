import './command';
import data from '../config/cypress.prod.json';
// cypress/support/e2e.js
import 'cypress-mochawesome-reporter/register';

// cypress/support/e2e.js

beforeEach(() => {
  cy.log('Login to the application');
  cy.visit(data.loginUrl);
  cy.login();
});
