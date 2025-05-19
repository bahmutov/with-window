// enables intelligent code completion for Cypress commands
// https://on.cypress.io/intelligent-code-completion
/// <reference types="cypress" />

it('sets the location HREF', () => {
  cy.intercept('GET', 'app.js', (req) => {
    // delete common cache headers
    // so the browser gets the real app.js source code
    delete req.headers['if-none-match']
    delete req.headers['if-modified-since']
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
  // confirm but do not allow the application
  // to navigate away to the new URL
  // Tip: app sets it using "location.href = ..." command
  cy.window()
    .should('have.property', 'fakeWindowObject')
    // the query retries until the app sets the location href
    // and the test passes
    .its('location')
    .should('have.property', 'href', 'https://acme.com')
})
