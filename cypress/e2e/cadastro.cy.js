import { faker } from '@faker-js/faker';

describe('Test of the registration form', () => {
  const user = {
    name: faker.name.fullName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
  };

  it('User should be able to register successfully', () => {
    cy.visit('/');

    cy.getByData('botao-cadastro').click();
    cy.getByData('nome-input').type(user.name);
    cy.getByData('email-input').type(user.email);
    cy.getByData('senha-input').type(user.password);

    cy.getByData('checkbox-input').check();
    cy.getByData('botao-enviar').click({force: true});

    cy.getByData('mensagem-sucesso')
      .should('exists')
      .contains('Usuário cadastrado com sucesso!');

    cy.request('GET', 'http://localhost:2000/users').then((response) => {
      expect(response.body).to.have.lengthOf.at.least(1);

      expect(response.body[response.body.length - 1]).to.deep.include(user);
    });
  });
});
