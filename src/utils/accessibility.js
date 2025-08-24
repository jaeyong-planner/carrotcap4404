// Accessibility checker utility
export const checkAccessibility = () => {
  const issues = [];

  // Check for alt text on images
  const images = document.querySelectorAll('img');
  images.forEach(img => {
    if (!img.alt) {
      issues.push({
        element: img,
        issue: 'Missing alt text',
        severity: 'error',
        wcag: '1.1.1'
      });
    }
  });

  // Check for proper heading hierarchy
  const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
  let lastLevel = 0;
  headings.forEach(heading => {
    const currentLevel = parseInt(heading.tagName.charAt(1));
    if (currentLevel - lastLevel > 1) {
      issues.push({
        element: heading,
        issue: 'Skipped heading level',
        severity: 'warning',
        wcag: '1.3.1'
      });
    }
    lastLevel = currentLevel;
  });

  // Check for sufficient color contrast
  const textElements = document.querySelectorAll('p, h1, h2, h3, h4, h5, h6, span, a');
  textElements.forEach(element => {
    const style = window.getComputedStyle(element);
    const backgroundColor = style.backgroundColor;
    const color = style.color;
    
    // This is a placeholder for actual contrast ratio calculation
    // You would need to implement or use a library for accurate contrast checking
    const hasGoodContrast = checkContrastRatio(backgroundColor, color);
    
    if (!hasGoodContrast) {
      issues.push({
        element: element,
        issue: 'Insufficient color contrast',
        severity: 'error',
        wcag: '1.4.3'
      });
    }
  });

  // Check for keyboard accessibility
  const interactiveElements = document.querySelectorAll('button, a, input, select, textarea');
  interactiveElements.forEach(element => {
    if (!element.tabIndex && element.tabIndex !== 0) {
      issues.push({
        element: element,
        issue: 'Element not keyboard accessible',
        severity: 'error',
        wcag: '2.1.1'
      });
    }
  });

  return issues;
};

// Helper function to check contrast ratio (placeholder)
const checkContrastRatio = (background, foreground) => {
  // This is a placeholder. You should implement actual contrast ratio calculation
  // or use a library like 'color-contrast-checker'
  return true;
};

// Add ARIA labels where needed
export const addAriaLabels = () => {
  // Add labels to navigation
  const nav = document.querySelector('nav');
  if (nav && !nav.getAttribute('aria-label')) {
    nav.setAttribute('aria-label', '메인 네비게이션');
  }

  // Add labels to buttons without text
  const buttons = document.querySelectorAll('button');
  buttons.forEach(button => {
    if (!button.textContent.trim() && !button.getAttribute('aria-label')) {
      const icon = button.querySelector('img, svg');
      if (icon) {
        const iconAlt = icon.getAttribute('alt') || icon.getAttribute('aria-label');
        if (iconAlt) {
          button.setAttribute('aria-label', iconAlt);
        }
      }
    }
  });

  // Add labels to form controls
  const formControls = document.querySelectorAll('input, select, textarea');
  formControls.forEach(control => {
    const id = control.id;
    if (id) {
      const label = document.querySelector(\`label[for="\${id}"]\`);
      if (!label) {
        const parent = control.parentElement;
        const newLabel = document.createElement('label');
        newLabel.setAttribute('for', id);
        newLabel.textContent = control.placeholder || control.name;
        parent.insertBefore(newLabel, control);
      }
    }
  });
};

// Focus management
export const manageFocus = () => {
  // Trap focus in modals
  const trapFocus = (element) => {
    const focusableElements = element.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstFocusable = focusableElements[0];
    const lastFocusable = focusableElements[focusableElements.length - 1];

    element.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        if (e.shiftKey) {
          if (document.activeElement === firstFocusable) {
            lastFocusable.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === lastFocusable) {
            firstFocusable.focus();
            e.preventDefault();
          }
        }
      }
    });
  };

  // Apply to all modals
  const modals = document.querySelectorAll('[role="dialog"]');
  modals.forEach(trapFocus);
};

// Skip link for keyboard users
export const addSkipLink = () => {
  const skipLink = document.createElement('a');
  skipLink.href = '#main-content';
  skipLink.className = 'skip-link';
  skipLink.textContent = '메인 콘텐츠로 바로가기';
  document.body.insertBefore(skipLink, document.body.firstChild);
};