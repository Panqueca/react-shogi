describe('interactions with the create account page', () => {
  it('user creates account with new email', () => {
    const date = new Date().getTime()
    const fakeEmail = `${date}-gustavopereiragustavo190@hotmail.com`

    cy.visit('/')
    cy.get('[data-testid="login-create_account-btn"]')
      .should('be.visible')
      .click()
    cy.get('[data-testid="create_account-email-input"]')
      .should('be.visible')
      .focus()
      .type(fakeEmail)
    cy.get('[data-testid="create_account-password-input"]')
      .should('be.visible')
      .focus()
      .type('Gusta')
    cy.get('[data-testid="create_account-submit-btn"]').should(
      'have.attr',
      'aria-disabled',
      'true',
    )
    cy.get('[data-testid="create_account-password-input"]')
      .clear()
      .should('be.visible')
      .focus()
      .type('Gustavinho*123')
    cy.get('[data-testid="create_account-submit-btn"]').click()

    cy.url().should('eq', Cypress.config().baseUrl + '/')
  })
})
