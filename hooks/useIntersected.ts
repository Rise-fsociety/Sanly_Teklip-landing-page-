"use client";


import { useMemo, useState } from 'react';
import { useIntersection } from 'react-use';
import { useIsomorphicLayoutEffect } from './useIsomorphicLayoutEffect';

const useIntersected = (ref: any, threshold = 0) => {
  const [intersected, setIntersected] = useState(false);
  const intersectionOptions = useMemo(() => ({ threshold }), [threshold]);
  const intersection = useIntersection(ref, intersectionOptions);

  useIsomorphicLayoutEffect(() => {
    const top = intersection?.boundingClientRect?.top;

    if (intersection?.isIntersecting && top !== undefined && top > 0) {
      setIntersected(true);
    } else if (!intersection?.isIntersecting && top !== undefined && top > 0) {
      setIntersected(false);
    }
  }, [intersection]);

  return intersected;
};

export default useIntersected;