export const animations = {
  transition: {
    base: 'all 0.3s ease',
    smooth: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
    bounce: 'all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    scale: 'transform 0.3s ease, box-shadow 0.3s ease',
    hover: 'all 0.2s ease-in-out',
  },

  keyframes: {
    fadeIn: {
      from: { opacity: 0 },
      to: { opacity: 1 },
    },
    slideIn: {
      from: { transform: 'translateY(20px)', opacity: 0 },
      to: { transform: 'translateY(0)', opacity: 1 },
    },
    scaleIn: {
      from: { transform: 'scale(0.95)', opacity: 0 },
      to: { transform: 'scale(1)', opacity: 1 },
    },
    slideUp: {
      from: { transform: 'translateY(100%)', opacity: 0 },
      to: { transform: 'translateY(0)', opacity: 1 },
    },
    slideDown: {
      from: { transform: 'translateY(-100%)', opacity: 0 },
      to: { transform: 'translateY(0)', opacity: 1 },
    },
    pulse: {
      '0%, 100%': { transform: 'scale(1)' },
      '50%': { transform: 'scale(1.05)' },
    },
  },

  duration: {
    fast: '0.15s',
    base: '0.3s',
    slow: '0.6s',
    slower: '1s',
  },

  easing: {
    ease: 'ease',
    easeIn: 'ease-in',
    easeOut: 'ease-out',
    easeInOut: 'ease-in-out',
    bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    smooth: 'cubic-bezier(0.4, 0, 0.2, 1)',
  },
};