import React, { memo } from "react";

const defaultProps = {
  width: 36,
  height: 37,
  fill: "#DA1C1C",
};

const SvgColorPicker = ({ width, height, fill }: typeof defaultProps) => (
  <svg width={width} height={height} viewBox="0 0 36 37" fill="none">
    <rect y="0.5" width="36" height="36" rx="5" fill={fill} />
  </svg>
);

SvgColorPicker.defaultProps = defaultProps;

export default SvgColorPicker;
