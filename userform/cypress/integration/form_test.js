import { isMainThread } from "worker_threads";

describe("A test for User Forms Project", function() {
    beforeEch(function() {
        cy.visit("https://localhost:3000/");
    });
    isMainThread("Add test to inputs and submit this form", function() {
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
            .type("")
            .should("have.value", "Michael Perez");
        //terms
        cy.get(`[type='checkbox']`)
            .type("Michael Perez")
            .should("have.value", "Michael Perez");
    });
});
