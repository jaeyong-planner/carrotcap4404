import React from 'react';
import PropTypes from 'prop-types';
import { colors, shadows, spacing } from '../../../styles/design-system';

const Card = ({
  children,
  variant = 'default',
  elevation = 'base',
  padding = 'default',
  className = '',
  style = {},
  onClick,
}) => {
  const baseStyles = {
    backgroundColor: colors.neutral.white,
    borderRadius: '0.5rem',
    transition: 'all 0.3s ease',
  };

  const variantStyles = {
    default: {
      border: `1px solid ${colors.neutral.gray[200]}`,
    },
    outlined: {
      border: `1px solid ${colors.neutral.gray[300]}`,
    },
    elevated: {
      border: 'none',
    },
  };

  const elevationStyles = {
    none: {},
    base: {
      boxShadow: shadows.sm,
    },
    md: {
      boxShadow: shadows.md,
    },
    lg: {
      boxShadow: shadows.lg,
    },
  };

  const paddingStyles = {
    none: spacing[0],
    small: spacing[4],
    default: spacing[6],
    large: spacing[8],
  };

  const interactionStyles = onClick ? {
    cursor: 'pointer',
    '&:hover': {
      transform: 'translateY(-2px)',
      boxShadow: shadows.lg,
    },
  } : {};

  return (
    <div
      className={className}
      style={{
        ...baseStyles,
        ...variantStyles[variant],
        ...elevationStyles[elevation],
        padding: paddingStyles[padding],
        ...interactionStyles,
        ...style,
      }}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      {children}
    </div>
  );
};

Card.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['default', 'outlined', 'elevated']),
  elevation: PropTypes.oneOf(['none', 'base', 'md', 'lg']),
  padding: PropTypes.oneOf(['none', 'small', 'default', 'large']),
  className: PropTypes.string,
  style: PropTypes.object,
  onClick: PropTypes.func,
};

export default Card;