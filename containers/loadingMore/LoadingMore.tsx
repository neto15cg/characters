import React, { useEffect } from 'react';
import { useIntersectionObserver } from '../../utils/useIntersectionObserver';
import { Dot, SectionLoadingMore } from './LoadingMore.style';

interface Props {
  callback: (page: number) => void;
  page: number;
  isFetching?: boolean;
}

export const LoadMore = ({ callback, page, isFetching }: Props) => {
  const [loaderRef, { isVisible }] = useIntersectionObserver({ rootMargin: '200px' });

  useEffect(() => {
    if (isVisible && !isFetching) {
      callback(page + 1);
    }
  }, [isVisible]);

  return (
    <SectionLoadingMore ref={loaderRef}>
      <Dot />
      <Dot />
      <Dot />
    </SectionLoadingMore>
  );
};
