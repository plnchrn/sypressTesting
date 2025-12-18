describe("Component screenshot", () => {
  beforeEach(() => {
    cy.visit("https://test-5570x.soundl.ink/");
  });
  it("хедер", () => {
    cy.wait(2000);
    cy.get(".header-login").compareSnapshot("header", 0.05);
  });
  it("промо хедер", () => {
    cy.wait(2000);
    cy.get(".promo-page").eq(0).compareSnapshot("promo-head", 0.05);
  });
  it("button should match previous screenshot", () => {
    cy.wait(2000);
    cy.get(".drag-drop-file__animation-bg").compareSnapshot(
      "button-component",
      0.05,
    );
  });
  // it("header element comparison", () => {
  //   cy.get("h1").compareSnapshot("homepage-header", 0.2); // допустимо 20% различий
  // });
});
