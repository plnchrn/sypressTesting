interface User {
  email: string;
  password: string;
}

// it("Использует fixture с типами", () => {
//   cy.fixture<User>("user").then((user) => {
//     cy.login(user.email, user.password);
//   });
// });

describe("Мой первый тест", () => {
  it("Посещает страницу", () => {
    console.log(123123123);
    cy.log("123123123");
    cy.fixture<User>("user").then((user) => {
      console.log(111, user);
    });
    cy.visit("https://test-5570x.soundl.ink/");
    // cy.contains("Example Domain");
  });

  // it("Проверяет элементы с типизацией", () => {
  //   cy.get<HTMLInputElement>('input[name="email"]')
  //     .type("test@example.com")
  //     .should("have.value", "test@example.com");
  // });
});
