describe('interactions with the create account page', () => {
  it('user tries to create account with existing email', () => {
    cy.login('gustavopereiragustavo190@gmail.com')
    cy.get('[data-cy="login-password-input"]').should('be.visible')
  })

  it('user creates account with new email', () => {
    const date = new Date().getTime()
    const fakeEmail = `${date}-gustavopereiragustavo190@hotmail.com`

    cy.login(fakeEmail)
    cy.get('[data-cy="login-create-btn"]').should('be.visible').click()
    cy.get('[data-cy="signup-email-input"] input').should(
      'have.value',
      fakeEmail
    )
    cy.get('[data-cy="signup-password-input"]')
      .should('be.visible')
      .type('Gusta')
    cy.get('[data-cy="signup-submit-btn"]').should('be.disabled')
    cy.get('[data-cy="signup-password-input"] input')
      .clear()
      .should('be.visible')
      .type('Gustavinho*123')
    cy.get('[data-cy="signup-submit-btn"]').should('not.be.disabled').click()

    cy.url().should('include', '/login')
    cy.get('[data-cy="login-continue-btn"]').should('not.be.disabled').click()
    cy.get('[data-cy=login-password-input] input')
      .should('be.visible')
      .clear()
      .type('Gustavinho*123')
    cy.get('[data-cy=login-submit-btn]').click()
    cy.get('#login-success-message').should('have.text', 'Logged in')
    cy.url().should('include', '/homepage')
  })
})
