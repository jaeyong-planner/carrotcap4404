import React from 'react';
import PropTypes from 'prop-types';
import { grid, breakpoints } from '../../../styles/design-system';

const Container = ({
  children,
  maxWidth = 'lg',
  fluid = false,
  className = '',
  style = {},
}) => {
  const containerStyles = {
    width: '100%',
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingLeft: grid.containerPadding.mobile,
    paddingRight: grid.containerPadding.mobile,
    [`@media (min-width: ${breakpoints.md})`]: {
      paddingLeft: grid.containerPadding.tablet,
      paddingRight: grid.containerPadding.tablet,
    },
    [`@media (min-width: ${breakpoints.lg})`]: {
      paddingLeft: grid.containerPadding.desktop,
      paddingRight: grid.containerPadding.desktop,
    },
    maxWidth: fluid ? '100%' : {
      sm: breakpoints.sm,
      md: breakpoints.md,
      lg: breakpoints.lg,
      xl: breakpoints.xl,
      '2xl': breakpoints['2xl'],
    }[maxWidth],
    ...style,
  };

  return (
    <div className={className} style={containerStyles}>
      {children}
    </div>
  );
};

Container.propTypes = {
  children: PropTypes.node.isRequired,
  maxWidth: PropTypes.oneOf(['sm', 'md', 'lg', 'xl', '2xl']),
  fluid: PropTypes.bool,
  className: PropTypes.string,
  style: PropTypes.object,
};

export default Container;