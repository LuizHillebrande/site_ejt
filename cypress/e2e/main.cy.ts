describe('EJT Website E2E Tests', () => {
  beforeEach(() => {
    cy.visit('https://www.empresajuniortoledo.com.br')
  })

  it('should load home page successfully', () => {
    cy.get('nav').should('be.visible')
    cy.get('main').should('be.visible')
    cy.get('footer').should('be.visible')
  })

  it('should navigate through main sections', () => {
    // Serviços
    cy.get('nav').contains('Serviços').click()
    cy.url().should('include', '/servicos')
    cy.get('h1').should('contain', 'Nossos Serviços')

    // IPT
    cy.get('nav').contains('IPT').click()
    cy.url().should('include', '/ipt')
    
    // NAF
    cy.get('nav').contains('NAF').click()
    cy.url().should('include', '/naf')
  })

  it('should submit contact form', () => {
    cy.get('form').within(() => {
      cy.get('input[name="name"]').type('Test User')
      cy.get('input[name="email"]').type('test@test.com')
      cy.get('textarea[name="message"]').type('Test message')
      cy.get('button[type="submit"]').click()
    })
    cy.get('[data-testid="success-message"]').should('be.visible')
  })

  it('should show service examples on click', () => {
    cy.get('[data-testid="service-card"]').first().click()
    cy.get('[role="dialog"]').should('be.visible')
    cy.get('[role="dialog"]').within(() => {
      cy.get('h3').should('be.visible')
      cy.get('ul').should('be.visible')
    })
  })

  it('should have working carousel navigation', () => {
    cy.get('[data-testid="team-carousel"]').should('be.visible')
    cy.get('[data-testid="team-member"]').should('have.length.at.least', 1)
  })
}) 