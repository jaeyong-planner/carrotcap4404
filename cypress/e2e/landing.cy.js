describe('Landing Page E2E Tests', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('successfully loads', () => {
    cy.get('h1').should('contain', 'SKIN concierge');
  });

  describe('Navigation', () => {
    it('has working navigation links', () => {
      cy.get('nav').within(() => {
        cy.get('a').each($link => {
          cy.wrap($link).click();
          cy.url().should('include', $link.attr('href'));
        });
      });
    });

    it('shows mobile menu on small screens', () => {
      cy.viewport('iphone-x');
      cy.get('[aria-label="메뉴 열기"]').should('be.visible').click();
      cy.get('.mobile-menu').should('be.visible');
    });
  });

  describe('Hero Section', () => {
    it('displays main CTA button', () => {
      cy.get('button').contains('무료 진단 시작하기')
        .should('be.visible')
        .click();
      cy.url().should('include', '/diagnosis');
    });

    it('loads hero image', () => {
      cy.get('img[alt="AI 피부 진단 예시"]')
        .should('be.visible')
        .and($img => {
          expect($img[0].naturalWidth).to.be.greaterThan(0);
        });
    });
  });

  describe('Features Section', () => {
    it('displays all feature cards', () => {
      cy.get('.feature-card').should('have.length', 3);
    });

    it('shows feature details on hover', () => {
      cy.get('.feature-card').first()
        .trigger('mouseover')
        .find('.feature-description')
        .should('be.visible');
    });
  });

  describe('Social Proof Section', () => {
    it('displays user count', () => {
      cy.get('.user-count').should('contain', '14,218');
    });

    it('shows partner logos', () => {
      cy.get('.partner-logos img').should('have.length', 3);
    });
  });

  describe('Performance', () => {
    it('loads within acceptable time', () => {
      cy.window().then((win) => {
        expect(win.performance.timing.loadEventEnd - 
               win.performance.timing.navigationStart).to.be.lessThan(3000);
      });
    });

    it('lazy loads images', () => {
      cy.get('img[data-src]').should('exist');
      cy.scrollTo('bottom');
      cy.get('img[data-src]').should('not.exist');
    });
  });

  describe('Accessibility', () => {
    it('has correct heading hierarchy', () => {
      cy.get('h1').should('have.length', 1);
      cy.get('h2').each(($h2) => {
        cy.wrap($h2).prev('h1').should('exist');
      });
    });

    it('has sufficient color contrast', () => {
      cy.injectAxe();
      cy.checkA11y(null, {
        runOnly: ['color-contrast']
      });
    });

    it('supports keyboard navigation', () => {
      cy.get('body').tab();
      cy.focused().should('exist');
      cy.tab();
      cy.focused().should('exist');
    });
  });

  describe('Form Submission', () => {
    it('handles newsletter subscription', () => {
      cy.get('input[type="email"]').type('test@example.com');
      cy.get('form').submit();
      cy.get('.success-message').should('be.visible');
    });
  });

  describe('Responsive Design', () => {
    const sizes = ['iphone-x', 'ipad-2', [1024, 768]];
    
    sizes.forEach(size => {
      it(`displays correctly on ${size}`, () => {
        if (Array.isArray(size)) {
          cy.viewport(size[0], size[1]);
        } else {
          cy.viewport(size);
        }
        cy.get('nav').should('be.visible');
        cy.get('.hero-section').should('be.visible');
        cy.get('.features-section').should('be.visible');
      });
    });
  });
});