import React, { memo } from "react";

const defaultProps = {
  width: 30,
  height: 31,
};

const SvgRadioBox = ({ width, height }: typeof defaultProps) => (
  <svg width={width} height={height} viewBox="0 0 30 31" fill="none">
    <path fill="#FFC60B" d="M23 15a8 8 0 1 1-16 0 8 8 0 0 1 16 0Z" />
    <rect
      width={27}
      height={27}
      x={1.5}
      y={1.71}
      stroke="#FFC60B"
      strokeWidth={3}
      rx={13.5}
    />
  </svg>
);

SvgRadioBox.defaultProps = defaultProps;

export default memo(SvgRadioBox);
