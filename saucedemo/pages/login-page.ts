import authData from '../fixtures/auth.json';

export class LoginPage {

  userName() {
    return cy.get('#user-name');
  }

  password() {
    return cy.get('#password');
  }

  loginButton() {
    return cy.get('#login-button');
  }

  loginToApp() {
    this.userName().type(authData['Username:']);
    this.password().type(authData['Password:'], { log: false });
    this.loginButton().click();
  }
}
