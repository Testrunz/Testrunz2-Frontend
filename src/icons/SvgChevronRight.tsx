import React, { memo } from "react";

const defaultProps = {
  width: 24,
  height: 24,
  fill: "#181818",
};

const SvgChevronRight = ({ width, height, fill }: typeof defaultProps) => (
  <svg width={width} height={height} viewBox="0 0 24 24" fill="none">
    <path
      d="M7.75747 19.7782C8.14799 20.1687 8.78116 20.1687 9.17168 19.7782L16.2428 12.7071C16.6333 12.3166 16.6333 11.6834 16.2428 11.2929C15.8522 10.9024 15.2191 10.9024 14.8285 11.2929L7.75747 18.364C7.36695 18.7545 7.36695 19.3877 7.75747 19.7782Z"
      fill={fill}
    />
    <path
      d="M14.8285 12.7071C15.2191 13.0977 15.8522 13.0977 16.2428 12.7071C16.6333 12.3166 16.6333 11.6834 16.2428 11.2929L9.17168 4.22185C8.78116 3.83132 8.14799 3.83132 7.75747 4.22185C7.36695 4.61237 7.36695 5.24554 7.75747 5.63606L14.8285 12.7071Z"
      fill={fill}
    />
  </svg>
);

SvgChevronRight.defaultProps = defaultProps;

export default memo(SvgChevronRight);
