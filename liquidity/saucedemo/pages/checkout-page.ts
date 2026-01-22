export class CheckoutPage {
  checkoutButton() {
    return cy.contains('Checkout');
  }


    continueButton() {
    return cy.contains('Continue');
  }
    checkoutItems() {
    return cy.get('[data-test="inventory-item"]');
  }


firstName() {
    return cy.get('[data-test="firstName"]');
  }

  lastName() {
    return cy.get('[data-test="lastName"]');
  }

  postalCode() {
    return cy.get('[data-test="postalCode"]');
  }

  paymentInfo() {
    return cy.get('[data-test="payment-info-value"]');
  }

  shippingInfo() {
    return cy.get('[data-test="shipping-info-value"]');
  }

  subtotal() {
    return cy.get('[data-test="subtotal-label"]');
  }

  tax() {
    return cy.get('[data-test="tax-label"]');
  }

  total() {
    return cy.get('[data-test="total-label"]');
  }

  finishButton() {
    return cy.get('[data-test="finish"]');
  }

  cancelButton() {
    return cy.get('[data-test="cancel"]');
  }

 OrderPlacedInfo() {
    return cy.contains('Thank you for your order!');
  }

  fillCheckoutInformation(firstName: string, lastName: string, postalCode: string) {
    this.firstName().clear().type(firstName);
    this.lastName().clear().type(lastName);
    this.postalCode().clear().type(postalCode);
  }

  clickCheckoutButton() {
    this.checkoutButton().click();
  }

    clickContinueButton() {
    this.continueButton().click();
  }
     completeCheckout() {
    this.finishButton().click();
  }


  verifyOrderCompletion() {
    this.OrderPlacedInfo().should('be.visible');
  }

    verifySummaryDetails(details: {
    payment: string;
    shipping: string;
    subtotal: string;
    tax: string;
    total: string;
  }) {
    this.paymentInfo().should('exist')
  .and('not.be.empty');
    this.shippingInfo().should('have.text', details.shipping);
    this.subtotal().should('have.text', details.subtotal);
    this.tax().should('have.text', details.tax);
    this.total().should('have.text', details.total);
  }
}
