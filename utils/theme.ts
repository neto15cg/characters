import { math } from 'polished';

export const Behaviors = {
  darkElements: 'hsl(209, 23%, 22%)',
  darkBackground: 'hsl(207, 26%, 17%)',
  darkText: 'hsl(0, 0%, 100%)',
  defaultBoxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25);',
  disabledBackground: '#444D55',
  errorColor: '#ff377f',
};

export const Dimensions = {
  maxWidth: '1340px',
  headerHeight: '80px',
  defaultPadding: '32px',
  defaultBorderRadius: '8px',
};

export const Fonts = {
  fontFamily: 'Roboto, sans-serif',
};

const breakpoints = ['768px', '1024px', '1200px'];

export const device = {
  mobile: `@media screen and (max-width: ${math(`${breakpoints[0]} - 1px`)})`,
  tablet: `@media screen and (min-width: ${breakpoints[0]}) and (max-width: ${breakpoints[1]})`,
  desktop: `@media screen and (min-width: ${math(`${breakpoints[1]} + 1px`)})`,
};
