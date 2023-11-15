import React, { memo } from "react";

const defaultProps = {
  width: 700,
  height: 339,
};

const SvgUserFrame = ({ width, height }: typeof defaultProps) => (
  <svg width={width} height={height} viewBox="0 0 700 339" fill="none">
    <path
      d="M0.0001297 0H700C700 0 844.522 232.149 793.683 308.148C717.685 421.755 710.875 180.165 518.836 180.165C326.796 180.165 37.7958 372.038 -38.2023 258.431C-89.0416 182.433 0.0001297 0 0.0001297 0Z"
      fill="#FFDC6B"
    />
  </svg>
);

SvgUserFrame.defaultProps = defaultProps;

export default memo(SvgUserFrame);
