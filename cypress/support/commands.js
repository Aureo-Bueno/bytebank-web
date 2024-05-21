Cypress.Commands.add('getByData', (seletor) => {
  return cy.get(`[data-test=${seletor}]`);
});

Cypress.Commands.add('login', (email, password) => {
  cy.visit('/');

  cy.getByData('botao-login').click()
  cy.getByData('email-input').type(email)
  cy.getByData('senha-input').type(password)
  cy.getByData('botao-enviar').click()
  cy.url().should('contain', '/home');
});
