describe("SoundLink Authorization", () => {
  beforeEach(() => {
    cy.visit("https://test-5570x.soundl.ink/");
  });
  it("Успешная авторизация с валидными данными", () => {
    cy.get(".button_text-color-gradient").eq(0).click();
    cy.url().should("include", "/sign-in");
    cy.get(".input__field").eq(0).type("chepurinaapolina@gmail.com");
    cy.get(".input__field").eq(1).type("list8899");
    cy.get(".button_width-all").click();
    cy.url().should("include", "/create");
  });
  it("Неуспешная авторизация с невалидными данными", () => {
    cy.get(".button_text-color-gradient").eq(0).click();
    cy.url().should("include", "/sign-in");
    cy.get(".input__field").eq(0).type("chepurinaapolina@gmail.com");
    cy.get(".input__field").eq(1).type("неверныйпароль");
    cy.get(".button_width-all").click();
    cy.get(".error-server").contains("Invalid username or password.");
    //cy.contains("Invalid username or password.");
  });
});
