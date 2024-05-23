describe('Formulario de Login', () => {
  it.only('Should be access home page', () => {
    cy.login('bueno@gmail.com', '12345678');
    cy.visit('/home');
    cy.getByData('titulo-boas-vindas').should('contain', 'Bem vindo de volta!');
  });

  it('Não deve permitir um email inválido', () => {
    cy.getByData('botao-login').click();
    cy.getByData('email-input').type('neilton@alura');
    cy.getByData('senha-input').type('123456');
    cy.getByData('botao-enviar').click();
    cy.getByData('mensagem-erro')
      .should('exist')
      .and('have.text', 'O email digitado é inválido');
  });

  it('Não deve permitir um campo em branco', () => {
    cy.getByData('botao-login').click();
    cy.getByData('senha-input').type('123456');
    cy.getByData('botao-enviar').click();
    cy.getByData('mensagem-erro')
      .should('exist')
      .and('have.text', 'O campo email é obrigatório');
  });
});

// describe('Teste de login e sessão', () => {
//   it('Login e permanência na sessão', () => {
//     cy.visit('/login')
//     cy.get('#username').type('usuario')
//     cy.get('#password').type('senha')
//     cy.get('#login-btn').click()

//     cy.session({name: 'user'}).then((user) => {
//       expect(user.username).to.eq('usuario')
//       expect(user.token).to.not.be.empty
//     })

//     cy.clearAllLocalStorage()
//     cy.clearAllSessionStorage()
//     cy.reload()

//     cy.session({name: 'user'}).then((user) => {
//       expect(user).to.be.null
//     })
//   })
// })