/// <reference types="cypress" />

const randomstring = require("randomstring");

context('User Management', () => {
  beforeEach(() => {
    cy.visit('https://betestautomation.azurewebsites.net/')
    cy.contains('Accept').click()
    cy.contains('Register').click()
    cy.url().should('include', '/register')
  })

  const user = {
    name: 'Testing McTesterson',
    email: randomstring.generate(8) + '@test.com',
    password: 'Password!1'
  }
  it('Register New User', function () {
    cy.get('#Email').type(user.email)
    cy.get('#FullName').type(user.name)
    cy.get('#Password').type(user.password)
    cy.get('#ConfirmPassword').type(user.password)
    cy.get('.offset-md-4 > .btn').click() // :(
    cy.url().should('eq', 'https://betestautomation.azurewebsites.net/')
    cy.contains(user.name + '!')

    //validate fields are correct in profile
    cy.contains(user.name + '!').click()
    cy.url().should('include', '/user')
    cy.contains(user.name)
    cy.contains(user.email)
  })

})
