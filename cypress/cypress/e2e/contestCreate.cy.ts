function generateRandomrt(length: number): string {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}
const contest = "test contest" + generateRandomrt(2);
const link = generateRandomrt(3);
describe("SoundLink Authorization", () => {
  beforeEach(() => {
    cy.visit("/sign-in");
  });
  it("Успешная авторизация с валидными данными", () => {
    cy.get(".ant-input").eq(0).type("chepurinaapolina@gmail.com");
    cy.get(".ant-input").eq(1).type("Polina@889211");
    cy.get(".ant-btn").eq(2).click();
    cy.wait(2000);
    //cy.get(".LinkMenu_itemMenu").eq(1).click();
    cy.contains("Contests").click();
    cy.get(".ant-btn").click();
    cy.get(".ant-input").eq(0).type(contest);
    cy.get(".ant-picker").type("2026-09-12");
    cy.get(".ant-input").eq(1).type("description");
    cy.get(".ant-input").eq(2).type(link);
    cy.get(".ant-btn").eq(1).click();
    cy.wait(500);
    cy.contains("Contests").click();
    // Проверка, что конкурс появился
    cy.get(".ContestCard_name__z1RdX").contains(contest).should("be.visible");
    cy.log(`Конкурс "${contest}" успешно создан`);
  });
});
