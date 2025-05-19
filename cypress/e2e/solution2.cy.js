// enables intelligent code completion for Cypress commands
// https://on.cypress.io/intelligent-code-completion
/// <reference types="cypress" />

it('sets the location HREF', () => {
  cy.intercept('GET', 'app.js', (req) => {
    req.continue((res) => {
      // wrap app's code with a fake window object
      // that has overwritten location object
      res.body = `
        window.fakeWindowObject = {
          location: {
            href: '',
          },
        }
        with (window.fakeWindowObject) {
          ${res.body}
        }
      `
    })
  }).as('appJs')
  cy.visit('index.html')
  cy.wait('@appJs')
  cy.contains('h1', 'Hello World')
  cy.window()
    .should('have.property', 'fakeWindowObject')
    // the query retries until the app sets the location href
    // and the test passes
    .its('location')
    .should('have.property', 'href', 'https://acme.com')
})
