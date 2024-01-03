"use client"

import * as React from 'react';

const Icon = /* @__PURE__ */ React.forwardRef((props, ref) => {
  const { width, height, size = null, paths, ...restProps } = props;
  return React.createElement("svg", {
    ...restProps,
    width: width ?? size,
    height: height ?? size,
    viewBox: "0 0 32 32",
    fill: "none",
    "aria-hidden": "true",
    focusable: "false",
    xmlns: "http://www.w3.org/2000/svg",
    ref,
    dangerouslySetInnerHTML: { __html: paths }
  });
});
Icon.displayName = "VidstackIcon";

export { Icon as I };
