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
    cy.get(".user-menu").click();
    cy.get(".user-menu__item_settings").click();
    cy.request({
      method: "GET",
      url: `https://soundl.ink/api/user`,
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjZjODdhOGZjLWEyY2UtNDFjZS04MjY2LTFiOGQ2ZTdiNThjZiIsImVtYWlsIjoiY2hlcHVyaW5hYXBvbGluYUBnbWFpbC5jb20iLCJyb2xlIjoidXNlciIsImlhdCI6MTc2ODI4MzE3M30.FrV-GK2m_ntlhp84PlTbV5li0Rz5X5OhvHftQuvEEtA`,
      },
      failOnStatusCode: true,
    }).then((response) => {
      console.group("API /user");
      console.log("Status:", response.status);
      console.log("Headers:", response.headers);
      console.log("Body:", response.body);
      console.log("isPublic", response.body.isPublic);
      console.log("name", response.body.name);
      console.log("bio", response.body.bio);
      cy.wrap(response.body.name).as("apiName");
      cy.wrap(response.body.bio).as("apiBio");
      console.groupEnd();
      if (response.body.isPublic === true) {
        cy.log("Профиль публичный");
      } else {
        cy.log("Профиль не публичный");
        cy.get(".user-menu").trigger("mouseover");
        cy.get(".user-menu__item_log-out").click();
        cy.visit("https://soundl.ink/profile/iVtCkhN");
        cy.get(".styles_name__udOTv").contains("This account is private");
        return;
      }
      cy.get(".user-menu").trigger("mouseover");
      cy.get(".user-menu__item_log-out").click();

      // public profile
      cy.visit("https://soundl.ink/profile/iVtCkhN");

      // проверки
      cy.get(".styles_name__udOTv", { timeout: 10000 })
        .should("be.visible")
        .should("not.have.text", "")
        .invoke("text")
        .invoke("trim")
        .should("eq", response.body.name);

      cy.get(".styles_bio__vbmOU", { timeout: 10000 })
        .should("be.visible")
        .should("not.have.text", "")
        .invoke("text")
        .invoke("trim")
        .should("eq", response.body.bio);

      cy.log("Публичный профиль совпадает с API");
    });
  });
});
