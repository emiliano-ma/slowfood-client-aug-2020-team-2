describe("Logged in user can add product to order", () => {
    beforeEach(() => {
      cy.server();
      cy.route({
        method: "GET",
        url: "http://localhost:3000/api/v1/products",
        response: "fixture:products_index.json",
      });
      cy.route({
        method: "POST",
        url: "http://localhost:3000/api/v1/auth/sign_in",
        response: "fixture:login.json",
        headers: {
          uid: "user@mail.com",
        },
      });
      cy.route({
        method: "POST",
        url: "http://localhost:3000/api/v1/orders",
        response: "fixture:order_create_successfull.json",
        headers: {
          uid: "user@mail.com",
        }
      })
      cy.visit("/");
      cy.get("#login").click();
      cy.get("#login-form").within(() => {
        cy.get("#login_email").type("user@mail.com");
        cy.get("#login_password").type("password");
        cy.get("#submit").contains("Submit").click();
      });
    });
    it("successfully", () => {
      cy.get("[data-cy=product-1]").within(() => {
        cy.get('button').contains("Add to order").click()
      });
      cy.contains('Item has been added to your order')
    })
  })