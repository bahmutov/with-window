// enables intelligent code completion for Cypress commands
// https://on.cypress.io/intelligent-code-completion
/// <reference types="cypress" />

it('sets the location HREF', () => {
  cy.intercept('GET', 'app.js', (req) => {
    req.continue((res) => {
      // wrap app's code with a fake window object
      // that has overwritten location object
      res.body = `
        const fakeWindowObject = {
          location: {
            href: '',
          },
        }
        with (fakeWindowObject) {
          ${res.body}
        }
      `
    })
  }).as('appJs')
  cy.visit('index.html')
  cy.wait('@appJs')
  cy.contains('h1', 'Hello World')
})
