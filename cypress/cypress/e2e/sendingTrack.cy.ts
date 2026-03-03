function generateRandom(length: number): string {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}
const nameArtist = "name" + generateRandom(10);
const emailArtist = generateRandom(10) + "@email.com";
describe("SoundLink Authorization", () => {
  beforeEach(() => {
    cy.visit("/contests/uyt");
  });
  it("Отправка трека гостем", () => {
    cy.get(".drag-drop-file__label").selectFile("cypress/fixtures/example.mp3");

    cy.get(".ant-select").should("be.visible").click({ force: true });

    cy.get("input.ant-select-input")
      .should("exist")
      .focus()
      .type("pop", { force: true, delay: 100 });

    cy.get(".ant-select-dropdown")
      .should("be.visible")
      .contains(".ant-select-item-option", "Pop")
      .click({ force: true });

    cy.get(".ant-input").eq(0).type(nameArtist);
    cy.get(".ant-input").eq(1).type(nameArtist);
    cy.get(".ant-input").eq(2).type(emailArtist);
    cy.get(".ant-input").eq(3).type("wwerts");
    cy.get(".ant-input").eq(4).type("https://instagram.com/johnsmith");
    cy.get(".ant-btn").contains("Submit track").click();
    cy.wait(4000);
    cy.visit("/sign-in");
    cy.get(".ant-input").eq(0).type("chepurinaapolina@gmail.com");
    cy.get(".ant-input").eq(1).type("Polina@889211");
    cy.get(".ant-btn").eq(2).click();
    cy.wait(2000);
    cy.wait(2000);
    cy.contains("Contests").click();
    cy.get(".ContestCard_contestCard__gK3il")
      .contains("testAvtoContest")
      .click();
    cy.get(".TrackCard_icon__3oyaf").eq(2).click();
    cy.get(".Info_artistInfo__v5W4y").contains(nameArtist);
    /*cy.get(".input__field").eq(0).type("chepurinaapolina@gmail.com");
    cy.get(".input__field").eq(1).type("Polina@889211");
    cy.get(".button_width-all").click();
    cy.wait(2000);
    cy.get(".menu-top__item-menu").eq(1).click();
    cy.get(".ant-btn").click();
    cy.get("#title").type(contest);
    cy.get(".ant-picker").type("2026-09-12");
    cy.get("#description").type("description");
    cy.get("#link").type(link);
    cy.get(".ant-btn").eq(1).click();
    cy.wait(500);
    cy.get(".menu-top__item-menu").eq(1).click();
    // Проверка, что конкурс появился
    cy.get(".ContestCard_name__z1RdX").contains(contest).should("be.visible");
    cy.log(`Конкурс "${contest}" успешно создан`);*/
  });
});
