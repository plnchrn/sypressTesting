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
    cy.get(".TrackCard_name__9V0OV")
      .eq(0)
      .should("exist")
      .invoke("text")
      .then((text) => {
        cy.wrap(text.trim()).as("trackName");
      });
    cy.get(".TrackCard_star__HRuD8").eq(0).click();
    cy.get(".menu-top__item-menu").eq(1).click();
    cy.wait(2000);
    cy.get(".TrackCard_name__9V0OV")
      .eq(0)
      .should("exist")
      .invoke("text")
      .then((text) => {
        cy.wrap(text.trim()).as("trackNameStar");
      });
    cy.get("@trackName").then((trackName) => {
      cy.get("@trackNameStar").then((trackNameStar) => {
        expect(trackNameStar).to.eq(
          trackName,
          "Название трека в избранном не совпадает с добавлеенным",
        );
      });
    });
  });
});
