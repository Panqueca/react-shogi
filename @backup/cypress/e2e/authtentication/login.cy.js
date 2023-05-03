describe('interactions with the login page', () => {
  it('user visits the login page', () => {
    // Wrong password
    cy.login('gustavopereiragustavo190@gmail.com', 'shogibattles123')
    cy.get('#login-error-message').should('have.text', 'invalid credentials')

    // Correct password
    cy.get('[data-cy=login-password-input] input')
      .should('be.visible')
      .clear()
      .type('Gustavinho*123')
    cy.get('[data-cy=login-submit-btn]').click()
    cy.get('#login-success-message').should('have.text', 'Logged in')
    cy.url().should('include', '/homepage')
  })
})
