describe("Uploading track", () => {
  beforeEach(() => {
    cy.visit("");
  });
  it("Успешная загрузка трека", () => {
    cy.get(".button_text-color-gradient").eq(0).click();
    cy.url().should("include", "/sign-in");
    cy.get(".input__field").eq(0).type("chepurinaapolina@gmail.com");
    cy.get(".input__field").eq(1).type("polina17");
    cy.get(".button_width-all").click();
    cy.url().should("include", "/create");
    cy.get(".drag-drop-file__label").selectFile("cypress/fixtures/example.mp3");
    cy.wait(10000);
    cy.get(".button_type-gradient").click();
    //cy.wait(6000);
    cy.get(".page-track__name").contains("NEXTIME – СВЕТЛАНА!");
  });
});
