/* eslint-disable react-hooks/exhaustive-deps */
import { useLayoutEffect, useState, RefObject } from "react";

import { ReportSize } from "./types";

type Size = {
  width?: number;
  height?: number;
};

function useSize(
  ref: RefObject<SVGGElement | HTMLElement>,
  tag: string,
  size?: Size,
  reportSize?: ReportSize,
  monitorSize?: Size
) {
  const [dim, setDim] = useState({
    height: 0,
    width: 0 
  });

  useLayoutEffect(() => {
    // console.log(`${tag} layout effect triggered`)
    if (!ref || !ref.current) {
      return;
    }
    // console.log(`${tag}- `, monitor);

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

    // console.log(`${tag}- width ${width}, height ${height}`);
    // console.log(`${tag}- padding `, padding);

    if (width === 0 || height === 0) {
      return;
    }

    // console.log(monitor);
    if (reportSize && (monitorSize && monitorSize.width && monitorSize.width > 0)) {
      if (!size || (size.width !== width || size.height !== height)) {
        console.log(`${tag} - reporting size ${width},${height}`);
        reportSize(width, height);
      }
    }

    // console.log(`settings dims on ${tag}`);
    setDim({ width, height });
  }, [ 
    ref,
    tag,
    size ? size.width : undefined,
    size ? size.height : undefined,
    reportSize,
    monitorSize ? monitorSize.height : undefined,
    monitorSize ? monitorSize.width : undefined
  ]);

  return dim;
}

export default useSize;
