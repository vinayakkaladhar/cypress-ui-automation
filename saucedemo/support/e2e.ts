import './command';

Cypress.on('uncaught:exception', (err) => {
  // Safely handle the error without modifying it
  // Ignore DOMException errors
  if (err.name === 'DOMException') {
    return false;
  }
  
  // Let other errors fail the test
  return true;
});