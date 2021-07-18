context("Game Match", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("bishop exchange initial moves", () => {
    cy.get("[data-cy=square-77]").click();
    cy.get("[data-cy=square-76]").click();
    cy.get("[data-cy=piece-tile-square-67]")
      .children("svg")
      .should("exist");

    cy.get("[data-cy=square-33]").click();
    cy.get("[data-cy=square-34]").click();
    cy.get("[data-cy=piece-tile-square-43]")
      .children("svg")
      .should("exist");

    cy.get("[data-cy=square-88]").click();
    cy.get("[data-cy=square-22]").click();
    cy.get("[data-cy=match-confirm-dialog-btn]").click();
    cy.get("[data-cy=piece-tile-square-22]")
      .children("svg")
      .should("exist");

    cy.get("[data-cy=square-31]").click();
    cy.get("[data-cy=square-22]").click();
    cy.get("[data-cy=piece-tile-square-22]")
      .children("svg")
      .should("exist");

    cy.get("[data-cy=piece-at-hand-0-KA]").should("exist");
    cy.get("[data-cy=piece-at-hand-1-KA]").should("exist");
  });
});
