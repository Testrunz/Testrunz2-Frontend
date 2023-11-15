import React, { memo } from "react";

const defaultProps = {
  width: 30,
  height: 30,
  fill: "#181818",
  fillOne: "#FFF4D0",
};

const SvgNext = ({ width, height, fill, fillOne }: typeof defaultProps) => (
  <svg width={width} height={height} viewBox="0 0 51 51" fill="none">
    <rect x="0.25" y="0.709961" width="50" height="50" rx="8" fill={fillOne} />
    <path
      d="M31.1094 26.5068L22.0156 35.6475C21.5469 36.0693 20.8438 36.0693 20.4219 35.6475L19.3438 34.5693C18.9219 34.1475 18.9219 33.4443 19.3438 32.9756L26.5625 25.71L19.3438 18.4912C18.9219 18.0225 18.9219 17.3193 19.3438 16.8975L20.4219 15.8193C20.8438 15.3975 21.5469 15.3975 22.0156 15.8193L31.1094 24.96C31.5312 25.3818 31.5312 26.085 31.1094 26.5068Z"
      fill={fill}
    />
  </svg>
);

SvgNext.defaultProps = defaultProps;

export default memo(SvgNext);
