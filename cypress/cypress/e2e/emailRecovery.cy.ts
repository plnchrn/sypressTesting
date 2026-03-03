function generateRandomsString(length: number): string {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return "test" + result;
}
const email = generateRandomsString(10) + "@gmail.com";
describe("Uploading track", () => {
  beforeEach(() => {
    cy.visit("");
  });

  it("Успешная смена почты", () => {
    cy.readFile("cypress/fixtures/users.json").then((user) => {
      cy.get(".button_text-color-gradient").eq(0).click();
      cy.url().should("include", "/sign-in");
      cy.get(".input__field").eq(0).type(user.email);
      cy.get(".input__field").eq(1).type(user.password);
      cy.get(".button_width-all").click();
      cy.get(".user-menu").click();
      cy.get(".user-menu__item_settings").click();
      cy.get(".input__field")
        .eq(1)
        .clear()
        .should("have.value", "")
        .type(email);
      cy.get(".button_type-gradient").eq(0).click();
      cy.log(email);
      // Сохраняем
      cy.writeFile("cypress/fixtures/users.json", {
        email: email,
        password: user.password,
      });
      cy.get(".user-menu").trigger("mouseover");
      cy.get(".user-menu__item_log-out").click();
      cy.visit("https://soundl.ink");
      cy.readFile("cypress/fixtures/users.json").then((user) => {
        cy.get(".button_text-color-gradient").eq(0).click();
        cy.url().should("include", "/sign-in");
        cy.get(".input__field").eq(0).type(user.email);
        cy.get(".input__field").eq(1).type(user.password);
        cy.get(".button_width-all").click();
      });
      cy.get(".user-menu").click();
      cy.get(".user-menu__item_profile").click();
      cy.get(".styles_name__udOTv").contains("test");
    });
  });
});
