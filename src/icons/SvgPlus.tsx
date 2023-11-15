import React, { memo } from "react";

const defaultProps = {
  width: 20,
  height: 20,
  fill: "#181818",
};

const SvgPlus = ({ width, height, fill }: typeof defaultProps) => (
  <svg width={width} height={height} viewBox="0 0 24 24" fill="none">
    <rect x="11" y="4" width="2" height="16" rx="1" fill={fill} />
    <rect
      x="4"
      y="13"
      width="2"
      height="16"
      rx="1"
      transform="rotate(-90 4 13)"
      fill={fill}
    />
  </svg>
);

SvgPlus.defaultProps = defaultProps;

export default memo(SvgPlus);
