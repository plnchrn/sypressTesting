describe("SoundLink Registration", () => {
  beforeEach(() => {
    // cy.visit("https://test-5570x.soundl.ink/");
  });
  it("Успешная смена пароля", () => {
    cy.visit("https://temp-mail.org/ru/");
    console.log(cy.get("#mail"));
    // cy.get("#mail").invoke("val").as("userEmail");
    // cy.visit("https://test-5570x.soundl.ink/");
    // cy.get(".button_text-color-white").eq(0).click();
    // cy.url().should("include", "/sign-up");
    // cy.get("@userEmail").then((email) => {
    //   cy.get(".input__field").type(email);
    // });
    /*cy.get(".input__field").eq(1).type("test");
    cy.get(".input__field").eq(2).type("password");
    cy.get(".input__field").eq(3).type("password");
    cy.get(".button_width-all").click();
    cy.url().should("include", "/create");
    cy.get(".page-login__forgot-text ").click();
    cy.url().should("include", "/reset-password");
    cy.get(".input__field").eq(0).type(emailGlobal);
    cy.get(".input__field").eq(1).type("test");
    cy.get(".input__field").eq(2).type("password");
    cy.get(".input__field").eq(3).type("password");
    cy.get(".button_width-all").click();
    cy.url().should("include", "/create");*/
  });
});
