import React from 'react';
import { Container } from './BasicLoading.styles';
import { LoadingProps } from './BasicLoading.types';

const BasicLoading = (props: LoadingProps) => {
  const { color, thickness, size, className, testId } = props;

  return <Container className={className} color={color} thickness={thickness} size={size} data-testid={testId} />;
};

export default BasicLoading;
