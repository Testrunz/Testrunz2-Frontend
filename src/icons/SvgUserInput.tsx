import React, { memo } from "react";

const defaultProps = {
  width: 24,
  height: 24,
  fill: "#9F9F9F",
};

const SvgUserInput = ({ width, height, fill }: typeof defaultProps) => (
  <svg width={width} height={height} viewBox="0 0 24 25" fill="none">
    <circle cx="12" cy="8.5" r="6" fill={fill} />
    <path
      d="M2 21.1C2 18.0072 4.50721 15.5 7.6 15.5H16.4C19.4928 15.5 22 18.0072 22 21.1V21.1C22 21.8732 21.3732 22.5 20.6 22.5H3.4C2.6268 22.5 2 21.8732 2 21.1V21.1Z"
      fill={fill}
    />
  </svg>
);

SvgUserInput.defaultProps = defaultProps;

export default memo(SvgUserInput);
