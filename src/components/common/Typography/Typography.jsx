import React from 'react';
import PropTypes from 'prop-types';
import { typography, colors } from '../../../styles/design-system';

const Typography = ({
  variant = 'body1',
  component,
  color = 'primary',
  align = 'left',
  weight = 'regular',
  children,
  className = '',
  style = {},
}) => {
  const variantStyles = {
    h1: {
      fontSize: typography.fontSize['5xl'],
      lineHeight: typography.lineHeight.tight,
      fontWeight: typography.fontWeight.bold,
    },
    h2: {
      fontSize: typography.fontSize['4xl'],
      lineHeight: typography.lineHeight.tight,
      fontWeight: typography.fontWeight.bold,
    },
    h3: {
      fontSize: typography.fontSize['3xl'],
      lineHeight: typography.lineHeight.snug,
      fontWeight: typography.fontWeight.semibold,
    },
    h4: {
      fontSize: typography.fontSize['2xl'],
      lineHeight: typography.lineHeight.snug,
      fontWeight: typography.fontWeight.semibold,
    },
    h5: {
      fontSize: typography.fontSize.xl,
      lineHeight: typography.lineHeight.normal,
      fontWeight: typography.fontWeight.semibold,
    },
    h6: {
      fontSize: typography.fontSize.lg,
      lineHeight: typography.lineHeight.normal,
      fontWeight: typography.fontWeight.semibold,
    },
    body1: {
      fontSize: typography.fontSize.base,
      lineHeight: typography.lineHeight.normal,
      fontWeight: typography.fontWeight.regular,
    },
    body2: {
      fontSize: typography.fontSize.sm,
      lineHeight: typography.lineHeight.normal,
      fontWeight: typography.fontWeight.regular,
    },
    caption: {
      fontSize: typography.fontSize.xs,
      lineHeight: typography.lineHeight.normal,
      fontWeight: typography.fontWeight.regular,
    },
  };

  const colorStyles = {
    primary: colors.neutral.gray[900],
    secondary: colors.neutral.gray[600],
    tertiary: colors.neutral.gray[500],
    error: colors.status.error,
    success: colors.status.success,
    warning: colors.status.warning,
    info: colors.status.info,
  };

  const Component = component || {
    h1: 'h1',
    h2: 'h2',
    h3: 'h3',
    h4: 'h4',
    h5: 'h5',
    h6: 'h6',
    body1: 'p',
    body2: 'p',
    caption: 'span',
  }[variant];

  return (
    <Component
      className={className}
      style={{
        ...variantStyles[variant],
        color: colorStyles[color],
        textAlign: align,
        fontWeight: typography.fontWeight[weight],
        fontFamily: typography.fontFamily.primary,
        ...style,
      }}
    >
      {children}
    </Component>
  );
};

Typography.propTypes = {
  variant: PropTypes.oneOf(['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'body1', 'body2', 'caption']),
  component: PropTypes.elementType,
  color: PropTypes.oneOf(['primary', 'secondary', 'tertiary', 'error', 'success', 'warning', 'info']),
  align: PropTypes.oneOf(['left', 'center', 'right', 'justify']),
  weight: PropTypes.oneOf(['thin', 'light', 'regular', 'medium', 'semibold', 'bold', 'black']),
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  style: PropTypes.object,
};

export default Typography;