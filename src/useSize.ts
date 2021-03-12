/* eslint-disable react-hooks/exhaustive-deps */
import { useLayoutEffect, useState, RefObject } from 'react';

import { ReportSize } from './types';

type Size = {
  width?: number;
  height?: number;
};

function useSize(
  ref: RefObject<SVGGElement | HTMLElement>,
  tag: string,
  size?: Size,
  reportSize?: ReportSize,
  monitorSize?: Size,
  layoutStage?: number
) {
  const [dim, setDim] = useState({
    height: 0,
    width: 0,
  });

  useLayoutEffect(() => {
    if (!ref || !ref.current) {
      return;
    }

    let width = 0;
    let height = 0;
    if (ref.current instanceof SVGGElement) {
      const bounds = ref.current.getBBox();
      width = bounds.width;
      height = bounds.height;
    } else {
      width = ref.current.offsetWidth;
      height = ref.current.offsetHeight;
    }

    if (width === 0 || height === 0) {
      return;
    }

    if (
      reportSize &&
      monitorSize &&
      monitorSize.width &&
      monitorSize.width > 0
    ) {
      if (!size || size.width !== width || size.height !== height) {
        reportSize(width, height);
      }
    }

    setDim({ width, height });
  }, [
    ref,
    tag,
    size ? size.width : undefined,
    size ? size.height : undefined,
    reportSize,
    monitorSize ? monitorSize.height : undefined,
    monitorSize ? monitorSize.width : undefined,
    layoutStage,
  ]);

  return dim;
}

export default useSize;
