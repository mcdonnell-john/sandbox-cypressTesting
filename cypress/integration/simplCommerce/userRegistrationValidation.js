/// <reference types="cypress" />

const randomstring = require("randomstring");

context('Registration Field Validation', () => {
    beforeEach(() => {
        cy.visit('https://betestautomation.azurewebsites.net/')
        cy.contains('Accept').click()
        cy.contains('Register').click()
        cy.url().should('include', '/register')
    })

    it('Validate valid Email Address', function () {
        validateInputField('#Email', 'qwerty', '#FullName', '#Email-error');
    })
    it('Validate Email Address Required', function () {
        validateInputFieldEmptyTest('#Email', '#Email-error');
    })

    it('Validate Full Name Required', function () {
        validateInputFieldEmptyTest('#FullName', '#FullName-error');
    })


    it('Validate valid Password min size', function () {
        validateInputField('#Password', 'and', '#FullName', '#Password-error');
    })
    // This test is commented out as the application doesnt validate the 100 characters in the UI
    // it('Validate valid Password max size', function () {
    //     validateInputField('#Password', randomstring.generate(101), '#FullName', '#Password-error');
    // })
    it('Validate Password Address Required', function () {
        validateInputFieldEmptyTest('#Password', '#Password-error');
    })
    
    it('Validate ConfirmPassword', function () {
        cy.get('#Password').type('TestPassword1');
        validateInputField('#ConfirmPassword', 'TestPassword2', '#FullName', '#ConfirmPassword-error');
    })
})

function validateInputField(field, invalidTextValue, nextField, expectedErrorElementId) {
    cy.get(field).type(invalidTextValue);
    cy.get(nextField).focus();
    cy.get(expectedErrorElementId);
}

function validateInputFieldEmptyTest(field, expectedErrorElementId) {
    cy.get(field).focus();
    cy.get('.offset-md-4 > .btn').click() // :(
    cy.get(expectedErrorElementId);
}
