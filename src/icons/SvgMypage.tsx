import React, { memo } from "react";

const defaultProps = {
  width: 24,
  height: 24,
  fill: "#181818",
};

const SvgMypage = ({ width, height, fill }: typeof defaultProps) => (
  <svg width={width} height={height} viewBox="0 0 24 24" fill="none">
    <path
      d="M20.4 3H3.6C3.26863 3 3 3.26863 3 3.6V7.43925H21V3.6C21 3.26863 20.7314 3 20.4 3Z"
      fill={fill}
    />
    <path
      d="M3 20.4V9.23925H8.42297V21H3.6C3.26863 21 3 20.7314 3 20.4Z"
      fill={fill}
    />
    <path
      d="M20.4 21H10.223V9.23925H21V20.4C21 20.7314 20.7314 21 20.4 21Z"
      fill={fill}
    />
  </svg>
);

SvgMypage.defaultProps = defaultProps;

export default memo(SvgMypage);
