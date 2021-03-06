describe("A test for User Forms Project", function() {
    it("Visiting the react app", function() {
        cy.visit("http://localhost:3000/");
    });
    it("Add test to inputs and submit this form", function() {
        //name
        cy.get(`input[id='name']`)

            .type("Michael Perez")
            .should("have.value", "Michael Perez");
        //email
        cy.get(`input[id='email']`)
            .type("mperez@gmail.com")
            .should("have.value", "mperez@gmail.com");
        //password
        cy.get(`input[id='password']`)
            .type("password")
            .should("have.value", "password");
        //terms
        cy.get(`[type='checkbox']`)
            .check()
            .should("be.checked"); //button
        cy.get("button").click();
    });
});
