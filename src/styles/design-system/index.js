export { colors } from './colors';
export { typography } from './typography';
export { spacing } from './spacing';
export { animations } from './animations';
export { shadows } from './shadows';

export const borderRadius = {
  none: '0',
  sm: '0.125rem',
  base: '0.25rem',
  md: '0.375rem',
  lg: '0.5rem',
  xl: '0.75rem',
  '2xl': '1rem',
  full: '9999px',
};

export const breakpoints = {
  sm: '640px',   // 모바일
  md: '768px',   // 태블릿
  lg: '1024px',  // 작은 데스크톱
  xl: '1280px',  // 큰 데스크톱
  '2xl': '1536px', // 초대형 디스플레이
};

export const grid = {
  columns: 12,
  maxWidth: '1280px',
  gutter: '24px',
  containerPadding: {
    mobile: '16px',
    tablet: '24px',
    desktop: '32px',
  },
};