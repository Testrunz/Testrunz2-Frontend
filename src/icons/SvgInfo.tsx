import React, { memo } from "react";

const defaultProps = {
  fill: "#565656",
  width: 24,
  height: 24,
};

const SvgInfo = ({ fill, width, height }: typeof defaultProps) => (
  <svg width={width} height={height} viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="9" stroke={fill} strokeWidth="2" />
    <path
      d="M11.0695 16.5V9.95455H12.8849V16.5H11.0695ZM11.9815 9.1108C11.7116 9.1108 11.48 9.02131 11.2869 8.84233C11.0965 8.66051 11.0013 8.44318 11.0013 8.19034C11.0013 7.94034 11.0965 7.72585 11.2869 7.54688C11.48 7.36506 11.7116 7.27415 11.9815 7.27415C12.2513 7.27415 12.4815 7.36506 12.6718 7.54688C12.865 7.72585 12.9616 7.94034 12.9616 8.19034C12.9616 8.44318 12.865 8.66051 12.6718 8.84233C12.4815 9.02131 12.2513 9.1108 11.9815 9.1108Z"
      fill={fill}
    />
  </svg>
);

SvgInfo.defaultProps = defaultProps;

export default memo(SvgInfo);
