/// <reference types="cypress" />

context('Privacy And Cookie Policy', () => {
  beforeEach(() => {
    cy.visit('https://betestautomation.azurewebsites.net/')
  })

    
    it('Policy Warning Message Shows', function() {
      cy.contains('Use this space to summarize your privacy and cookie use policy.')
    })

    it('Can Click Accept Button', function() {
      cy.contains('Accept').click()
    })

    it('Learn More takes me to privacy page', function() {
      cy.contains('Learn More').click()

      cy.url().should('include','/privacy')
    })
  })