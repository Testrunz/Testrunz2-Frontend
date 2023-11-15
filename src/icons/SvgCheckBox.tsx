import React, { memo } from "react";

const defaultProps = {
  fill: "#FFC60B",
  width: 24,
  height: 24,
};

const SvgCheckBox = ({ fill, width, height }: typeof defaultProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    fill="none"
    viewBox="0 0 24 24"
  >
    <path
      fill={fill}
      d="M9.73 17.991a.727.727 0 0 0 1.012 0l8.04-8.039a.726.726 0 0 0 0-1.012l-.985-.984a.693.693 0 0 0-.985 0L10.25 14.52l-3.09-3.063a.693.693 0 0 0-.984 0l-.985.984a.726.726 0 0 0 0 1.012l4.54 4.54Z"
    />
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

SvgCheckBox.defaultProps = defaultProps;

export default memo(SvgCheckBox);
