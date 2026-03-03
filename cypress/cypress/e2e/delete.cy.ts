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
    cy.get(".track-list__item").eq(0);
    cy.get(".TrackCard_name__9V0OV")
      .eq(0)
      .should("exist")
      .invoke("text")
      .then((text) => {
        cy.wrap(text.trim()).as("trackName");
      });
    cy.get(".TrackCard_trash__19Eor").eq(0).click();
    cy.get(".button_type-red").click();
    cy.get(".page-dashboard__trash").click();
    cy.wait(2000);
    cy.get(".TrackCard_name__9V0OV")
      .eq(0)
      .should("exist")
      .invoke("text")
      .then((text) => {
        cy.wrap(text.trim()).as("trackNametrash");
      });
    cy.get("@trackName").then((trackName) => {
      cy.get("@trackNametrash").then((trackNametrash) => {
        expect(trackNametrash).to.eq(
          trackName,
          "Название трека в корзине должно совпадать с удалённым",
        );
      });
    });
    cy.wait(3000);
    cy.get(".TrackCard_restore__TybeY").eq(0).click();
    cy.get(".menu-top__item-menu").eq(0).click();
    cy.wait(2000);
    cy.get(".TrackCard_name__9V0OV")
      .eq(0)
      .should("exist")
      .invoke("text")
      .then((text) => {
        cy.wrap(text.trim()).as("trackNameRestore");
      });
    cy.get("@trackNametrash").then((trackNametrash) => {
      cy.get("@trackNameRestore").then((trackNameRestore) => {
        expect(trackNameRestore).to.eq(
          trackNametrash,
          "Название востановленного трека не совпадает с треком из корзины",
        );
      });
    });
  });
});
