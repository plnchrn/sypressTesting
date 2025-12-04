function generateRandomString(length: number): string {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return "test" + result;
}
const emailGlobal = generateRandomString(10) + "@gmail.com";
describe("SoundLink Registration", () => {
  beforeEach(() => {
    cy.visit("https://test-5570x.soundl.ink/");
  });
  it("Успешная регистрация с валидными данными", () => {
    cy.get(".button_text-color-white").eq(0).click();
    cy.url().should("include", "/sign-up");
    cy.get(".input__field").eq(0).type(emailGlobal);
    cy.get(".input__field").eq(1).type("test");
    cy.get(".input__field").eq(2).type("password");
    cy.get(".input__field").eq(3).type("password");
    cy.get(".button_width-all").click();
    cy.url().should("include", "/create");
  });
  it("Не успешная регистрация с не повторяющимся паролем", () => {
    const email = generateRandomString(10) + "@gmail.com";
    cy.get(".button_text-color-white").eq(0).click();
    cy.url().should("include", "/sign-up");
    cy.get(".input__field").eq(0).type(email);
    cy.get(".input__field").eq(1).type("test");
    cy.get(".input__field").eq(2).type("password123");
    cy.get(".input__field").eq(3).type("password");
    cy.get(".button_width-all").click();
    cy.get(".error-server").contains("Passwords do not match, please retype.");
  });
  it("Не успешная регистрация с повторяющейся почтой", () => {
    cy.get(".button_text-color-white").eq(0).click();
    cy.url().should("include", "/sign-up");
    cy.get(".input__field").eq(0).type(emailGlobal);
    cy.get(".input__field").eq(1).type("test");
    cy.get(".input__field").eq(2).type("password");
    cy.get(".input__field").eq(3).type("password");
    cy.get(".button_width-all").click();
    cy.get(".error-server").contains("User already exists");
  });
});
