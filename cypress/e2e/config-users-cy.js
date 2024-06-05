import { faker } from '@faker-js/faker';

describe('Update data of the users', () => {
  const fakerUser = {
    name: faker.name.fullName(),
    password: faker.internet.password(),
  };

  it('User should be able to update data successfully', () => {
    cy.fixture('users').as('users');
    cy.get('@users').then((users) => {
      cy.login(users[0].email, users[0].password);

      cy.visit('/home');
      cy.url().should('include', '/home');

      cy.contains(users[0].name).should('be.visible');

      cy.getByData('app-home').find('a').eq(1).click();

      cy.url.should('include', '/minha-conta');

      cy.getByData('botao-salvar-alteracoes').should('be.disabled');

      cy.get('[name="nome"]').type(fakerUser.name);

      cy.get('[name="senha"]').type(fakerUser.password);

      cy.getByData('botao-salvar-alteracoes').should('not.be.disabled');

      cy.getByData('botao-salvar-alteracoes').click();

      cy.on('window:alert', (textAlert) => {
        expect(textAlert).to.equal('Alterações salvas com sucesso!');
      });

      cy.url().should('include', '/home');

      cy.window().then((win) => {
        expect(win.localStorage.getItem('nomeUsuario')).toEqual(fakerUser.name);
      });
    });
  });
});
