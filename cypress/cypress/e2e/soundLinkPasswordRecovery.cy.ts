function generateRandomPassword(length: number): string {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return "test" + result;
}
const password = generateRandomPassword(8);
describe("SoundLink Password Recovery", () => {
  beforeEach(() => {
    cy.visit("https://test-5570x.soundl.ink/");
  });

  it("Успешная смена пароля", () => {
    cy.get(".button_text-color-gradient").eq(0).click();
    cy.get(".page-login__forgot-text").click();
    cy.get(".input__field").type("chepurinapolina@yandex.ru");
    cy.get(".button_type-gradient").click();
    cy.wait(10000);
    cy.task("getEmailCode", null, { timeout: 30000 }).then((code: string) => {
      if (!code) {
        throw new Error("Код не найден");
      }
      cy.get(".input__field").eq(0).type(code);
    });
    cy.get(".input__field").eq(1).type(password);
    cy.get(".input__field").eq(2).type(password);
    cy.get(".button_type-gradient").click();
    cy.wait(10000);
    cy.get(".input__field").eq(0).type("chepurinapolina@yandex.ru");
    cy.get(".input__field").eq(1).type(password);
    cy.get(".button_width-all").click();
    cy.url().should("include", "/create");
  });
  it("Не успешная смена пароля с несовпаающими паролями", () => {
    cy.get(".button_text-color-gradient").eq(0).click();
    cy.get(".page-login__forgot-text").click();
    cy.get(".input__field").type("chepurinapolina@yandex.ru");
    cy.get(".button_type-gradient").click();
    cy.wait(10000);
    cy.task("getEmailCode", null, { timeout: 30000 }).then((code: string) => {
      if (!code) {
        throw new Error("Код не найден");
      }
      cy.get(".input__field").eq(0).type(code);
    });
    cy.get(".input__field").eq(1).type(password);
    cy.get(".input__field").eq(2).type("rrrrrrr");
    cy.get(".button_type-gradient").click();
    cy.get(".error-server").contains("Passwords do not match, please retype.");
  });
  it("Не успешная смена c неверным кодом", () => {
    cy.get(".button_text-color-gradient").eq(0).click();
    cy.get(".page-login__forgot-text").click();
    cy.get(".input__field").type("chepurinapolina@yandex.ru");
    cy.get(".button_type-gradient").click();
    cy.wait(2000);
    cy.get(".input__field").eq(0).type("fgdbbvpp");
    cy.get(".input__field").eq(1).type(password);
    cy.get(".input__field").eq(2).type(password);
    cy.get(".button_type-gradient").click();
    cy.get(".error-server").contains("Invalid or expired code");
  });
});
