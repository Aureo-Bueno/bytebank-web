describe('Test multiple pages', () => {
  it('Should be access card pages', () => {
    cy.login(Cypress.env('email'), Cypress.env('password'));

    cy.visit('/home');
    cy.location('pathname').should('eq', '/home');

    cy.getByData('app-home').find('a').eq(1).click();

    cy.getByData('titulo-cartoes')
      .should('exist')
      .and('have.text', 'Meus cartões');

    cy.location('pathname').should('eq', '/home/cartoes');
  });
});
