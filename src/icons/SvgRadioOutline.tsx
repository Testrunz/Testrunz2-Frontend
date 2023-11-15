import React, { memo } from "react";

const defaultProps = {
  width: 30,
  height: 31,
};

const SvgRadioOutline = ({ width, height }: typeof defaultProps) => (
  <svg width={width} height={height} viewBox="0 0 30 31" fill="none">
    <rect
      width={27}
      height={27}
      x={1.5}
      y={1.71}
      stroke="#9F9F9F"
      strokeWidth={3}
      rx={13.5}
    />
  </svg>
);

SvgRadioOutline.defaultProps = defaultProps;

export default memo(SvgRadioOutline);
