import React, { memo } from "react";

const defaultProps = {
  fill: "#9F9F9F",
  width: 24,
  height: 25,
};

const SvgCheckBoxOutline = ({ fill, width, height }: typeof defaultProps) => (
  <svg width={width} height={height} viewBox="0 0 24 25" fill="none">
    <rect
      width={22}
      height={22}
      x={1}
      y={1.21}
      stroke={fill}
      strokeWidth={2}
      rx={5}
    />
  </svg>
);

SvgCheckBoxOutline.defaultProps = defaultProps;

export default memo(SvgCheckBoxOutline);
