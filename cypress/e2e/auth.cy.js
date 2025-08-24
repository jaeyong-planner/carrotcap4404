describe('Authentication', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/signup'); // Assuming your app runs on this port
  });

  it('allows a user to sign up', () => {
    cy.get('input[name="name"]').type('Cypress User');
    cy.get('input[name="email"]').type('cypress@example.com');
    cy.get('input[name="password"]').type('password123');
    cy.get('input[name="confirmPassword"]').type('password123');
    cy.get('button[type="submit"]').click();

    // Assuming successful signup redirects to login or shows a success message
    cy.url().should('include', '/login');
    cy.contains('로그인');
  });

  it('allows a user to log in', () => {
    // First, ensure a user exists for login test
    cy.request({
      method: 'POST',
      url: 'http://localhost:3000/api/v1/auth/signup', // Assuming backend runs on port 3000
      body: {
        name: 'Cypress Login User',
        email: 'cypress_login@example.com',
        password: 'password123',
        confirmPassword: 'password123',
      },
      failOnStatusCode: false, // Don't fail if user already exists
    });

    cy.visit('http://localhost:5173/login');

    cy.get('input[name="email"]').type('cypress_login@example.com');
    cy.get('input[name="password"]').type('password123');
    cy.get('button[type="submit"]').click();

    // Assuming successful login redirects to dashboard
    cy.url().should('include', '/dashboard');
    cy.contains('안녕하세요'); // Check for a greeting on the dashboard
  });
});
