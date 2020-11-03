describe("Aiven cloud listing page", () => {
  beforeEach(() => {
    cy.mockGeolocation();
    cy.visit("http://localhost:3000/");
  });

  it("shows heading", () => {
    cy.findByText("Aiven Clouds").should("exist");
  });

  it("shows a table with columns for name, region and distance", () => {
    cy.findByText("Name");
    cy.findByText("Region");
    cy.findByText("Provider");
    cy.findByText("Distance");
  });

  it("sorts data by clicking column headers", () => {
    // wait for data to be loaded
    cy.findByText("Africa, South Africa - Amazon Web Services: Cape Town", {
      timeout: 10000,
    });

    // find the first distance
    cy.get('[data-rowindex=0][data-field="distance"]').should(
      "have.text",
      "9,587"
    );

    // order by distance
    cy.findByText("Distance").click();

    // check first distance should be a lower value
    cy.get('[data-rowindex=0][data-field="distance"]').should(
      "have.text",
      "122"
    );
  });
});
