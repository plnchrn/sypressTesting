function generateRandomPasswords(length: number): string {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return "test" + result;
}

describe("Uploading track", () => {
  const newPassword = generateRandomPasswords(12) + "@1";

  beforeEach(() => {
    cy.visit("");
  });

  it("Успешная смена пароля", () => {
    cy.readFile("cypress/fixtures/users.json").then((user) => {
      cy.get(".button_text-color-gradient").eq(0).click();
      cy.url().should("include", "/sign-in");
      cy.get(".input__field").eq(0).type(user.email);
      cy.get(".input__field").eq(1).type(user.password);
      cy.get(".button_width-all").click();
      cy.get(".user-menu").click();
      cy.get(".user-menu__item_settings").click();
      cy.get(".Tabs_tab__jgCXc").eq(1).click();
      cy.get(".input__field").eq(7).type(user.password);
      cy.get(".input__field").eq(8).type(newPassword);
      cy.get(".input__field").eq(9).type(newPassword);

      cy.get(".button_type-gradient").eq(2).click();
      cy.get("body").contains("Password saved successfully");

      // Сохраняем новый пароль
      cy.writeFile("cypress/fixtures/users.json", {
        email: user.email,
        password: newPassword,
      });
    });
  });
});
