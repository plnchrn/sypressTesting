describe("Uploading track", () => {
  beforeEach(() => {
    cy.visit("");
  });
  it("Успешная кастомизация", () => {
    cy.get(".button_text-color-gradient").eq(0).click();
    cy.url().should("include", "/sign-in");
    cy.get(".input__field").eq(0).type("chepurinaapolina@gmail.com");
    cy.get(".input__field").eq(1).type("list8899");
    cy.get(".button_width-all").click();
    cy.wait(2000);
    cy.get(".menu-top__item-menu").eq(0).click();
    cy.wait(2000);
    cy.get(".track-list__item").eq(0).click();
    cy.wait(2000);
    cy.get(".page-track__link-customize").click();
    cy.get(".input__field").type("test");
    cy.get(".button_type-gradient").click();
    cy.get(".menu-top__item-menu").eq(0).click();
    cy.wait(2000);
    cy.get(".track-list__item").eq(0).contains("test");
  });
});
