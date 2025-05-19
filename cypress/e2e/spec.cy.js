// enables intelligent code completion for Cypress commands
// https://on.cypress.io/intelligent-code-completion
/// <reference types="cypress" />

it('sets the location HREF', () => {
  cy.visit('index.html')
  cy.contains('h1', 'Hello World')
  // confirm but do not allow the application
  // to navigate away to the new URL
  // Tip: app sets it using "location.href = ..." command
})
