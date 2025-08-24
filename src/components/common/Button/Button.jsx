import React from 'react';
import PropTypes from 'prop-types';
import { colors, typography, shadows } from '../../../styles/design-system';

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  disabled = false,
  loading = false,
  onClick,
  type = 'button',
  className = '',
}) => {
  const baseStyles = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: typography.fontFamily.primary,
    fontWeight: typography.fontWeight.semibold,
    borderRadius: '0.5rem',
    transition: 'all 0.3s ease',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.6 : 1,
    width: fullWidth ? '100%' : 'auto',
  };

  const sizeStyles = {
    sm: {
      padding: '0.5rem 1rem',
      fontSize: typography.fontSize.sm,
    },
    md: {
      padding: '0.75rem 1.5rem',
      fontSize: typography.fontSize.base,
    },
    lg: {
      padding: '1rem 2rem',
      fontSize: typography.fontSize.lg,
    },
  };

  const variantStyles = {
    primary: {
      backgroundColor: colors.primary.blue,
      color: colors.neutral.white,
      border: 'none',
      boxShadow: shadows.sm,
      '&:hover': {
        backgroundColor: colors.primary.indigo,
        boxShadow: shadows.md,
      },
    },
    secondary: {
      backgroundColor: colors.secondary.purple,
      color: colors.neutral.white,
      border: 'none',
      boxShadow: shadows.sm,
      '&:hover': {
        backgroundColor: colors.secondary.pink,
        boxShadow: shadows.md,
      },
    },
    outline: {
      backgroundColor: 'transparent',
      color: colors.primary.blue,
      border: `1px solid ${colors.primary.blue}`,
      '&:hover': {
        backgroundColor: colors.neutral.gray[50],
      },
    },
    text: {
      backgroundColor: 'transparent',
      color: colors.primary.blue,
      border: 'none',
      '&:hover': {
        backgroundColor: colors.neutral.gray[50],
      },
    },
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={className}
      style={{
        ...baseStyles,
        ...sizeStyles[size],
        ...variantStyles[variant],
      }}
    >
      {loading ? (
        <span className="loading-spinner" />
      ) : (
        children
      )}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['primary', 'secondary', 'outline', 'text']),
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  fullWidth: PropTypes.bool,
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  onClick: PropTypes.func,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  className: PropTypes.string,
};

export default Button;