import React, { memo } from "react";

const defaultProps = {
  width: 20,
  height: 20,
  fill: "#181818",
};

const SvgUser = ({ width, height, fill }: typeof defaultProps) => (
  <svg width={width} height={height} viewBox="0 0 24 24" fill={fill}>
    <circle cx={12} cy={8} r={4} fill={fill} />
    <path
      fill={fill}
      d="M15.155 11.88A4.99 4.99 0 0 0 17 8c0-.687-.139-1.342-.39-1.938a3.001 3.001 0 1 1-1.455 5.817ZM8.846 11.88A4.99 4.99 0 0 1 7 8c0-.687.14-1.342.39-1.938a3.001 3.001 0 1 0 1.456 5.817ZM5 20a7 7 0 1 1 14 0H5ZM20 20h2a6 6 0 0 0-4.5-5.81A8 8 0 0 1 20 20Z"
    />
    <path fill={fill} d="M4 20H2a6 6 0 0 1 4.5-5.81A8 8 0 0 0 4 20Z" />
  </svg>
);

SvgUser.defaultProps = defaultProps;

export default memo(SvgUser);
