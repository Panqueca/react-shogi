Cypress.Commands.add('login', (email, password) => {
  cy.visit('/login')

  cy.get('[data-cy=login-email-input]').should('be.visible').type(email)
  cy.get('[data-cy=login-continue-btn]').click()

  cy.get('[data-cy=login-password-input]').should('be.visible').type(password)
  cy.get('[data-cy=login-submit-btn]').click()
})
