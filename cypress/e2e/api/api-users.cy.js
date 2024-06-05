describe('Requests to API', () => {
  context('GET /users', () => {
    it('Should be return users', () => {
      cy.request('GET', 'http://localhost:3000/users').then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).length.to.be.greaterThan(1);
      });
    });
  });

  context('GET /users/:userId', () => {
    it('Should be return user', () => {
      cy.request({
        method: 'GET',
        url: 'http://localhost:8000/users/40a41438-84a6-4b4d-ae1d-7f1713d0a9fe',
      }).then((response) => {
        expect(response.status).to.eq(200);
      });
    });

    it('Should be return user not found', () => {
      cy.request({
        method: 'GET',
        url: 'http://localhost:8000/users/bb8d4639-fc44-4d30-89e3-c3c8b9f9c29a',
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.eq(404);
      });
    });

    it('Should be return user not found', () => {
      cy.request({
        method: 'GET',
        url: 'http://localhost:8000/users/invalid-id',
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.eq(404);
      });
    });
  });

  context('Intercept requests', () => {
    it('Should be intercept POST to login', () => {
      cy.intercept('POST', 'users/login').as('loginRequest');
      cy.login('bueno@gmail.com', '12345678');
      cy.wait('@loginRequest').then((interception) => {
        interception.response = {
          statusCode: 200,
          body: {
            success: true,
            message: 'Login success',
          },
        };
      });
      cy.visit('/home');
      cy.getByData('titulo-boas-vindas').should(
        'contain',
        'Bem vindo de volta!'
      );
    });
  });

  context('Login with API', () => {
    it('Should be login with API with env', () => {
      cy.request({
        method: 'POST',
        url: 'http://localhost:8000/users/login',
        body: {
          email: Cypress.env('email'),
          password: Cypress.env('password'),
        },
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).is.not.empty;
      });
    });
  });
});
