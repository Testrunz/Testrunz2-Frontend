import React, { memo } from "react";

const defaultProps = {
  width: 24,
  height: 24,
  fill: "#9F9F9F",
};

const SvgSearch = ({ width, height, fill }: typeof defaultProps) => (
  <svg width={width} height={height} viewBox="0 0 24 24" fill="none">
    <circle
      cx="9.8995"
      cy="10"
      r="6"
      transform="rotate(-45 9.8995 10)"
      stroke={fill}
      strokeWidth="2"
    />
    <rect
      x="19.6531"
      y="18.4157"
      width="2"
      height="5"
      rx="1"
      transform="rotate(135 19.6531 18.4157)"
      fill={fill}
    />
  </svg>
);

SvgSearch.defaultProps = defaultProps;

export default memo(SvgSearch);
