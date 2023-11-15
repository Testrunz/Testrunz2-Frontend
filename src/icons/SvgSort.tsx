import React, { memo } from "react";

const defaultProps = {
  width: 24,
  height: 24,
  fill: "#9F9F9F",
};

const SvgSort = ({ width, height, fill }: typeof defaultProps) => (
  <svg width={width} height={height} viewBox="0 0 24 24" fill="none">
    <path
      d="M8 5C8 4.44772 8.44772 4 9 4C9.55228 4 10 4.44772 10 5V13.8384C10.0004 13.8487 10.0005 13.8591 10.0005 13.8694L10.0014 19.3223C10.0015 19.8894 9.34989 20.2048 8.90995 19.8505L2.32593 14.5487C1.68829 14.0352 2.04895 13 2.86549 13H8V5Z"
      fill={fill}
    />
    <path
      d="M21 5H12V7H21C21.5523 7 22 6.55228 22 6C22 5.44772 21.5523 5 21 5Z"
      fill={fill}
    />
    <path
      d="M19 9H12V11H19C19.5523 11 20 10.5523 20 10C20 9.44772 19.5523 9 19 9Z"
      fill={fill}
    />
    <path
      d="M12 13H17C17.5523 13 18 13.4477 18 14C18 14.5523 17.5523 15 17 15H12V13Z"
      fill={fill}
    />
    <path
      d="M15 17H12V19H15C15.5523 19 16 18.5523 16 18C16 17.4477 15.5523 17 15 17Z"
      fill={fill}
    />
  </svg>
);

SvgSort.defaultProps = defaultProps;

export default memo(SvgSort);
