import React, { memo } from "react";

const defaultProps = {
  width: 24,
  height: 24,
  fill: "#181818",
};

const SvgChevronLeft = ({ width, height, fill }: typeof defaultProps) => (
  <svg width={width} height={height} viewBox="0 0 24 24" fill="none">
    <path
      d="M16.2425 19.7782C15.852 20.1687 15.2188 20.1687 14.8283 19.7782L7.75725 12.7071C7.36672 12.3166 7.36672 11.6834 7.75725 11.2929C8.14777 10.9024 8.78094 10.9024 9.17146 11.2929L16.2425 18.364C16.6331 18.7545 16.6331 19.3877 16.2425 19.7782Z"
      fill={fill}
    />
    <path
      d="M9.17146 12.7071C8.78094 13.0977 8.14777 13.0977 7.75725 12.7071C7.36672 12.3166 7.36672 11.6834 7.75725 11.2929L14.8283 4.22185C15.2188 3.83132 15.852 3.83132 16.2425 4.22185C16.6331 4.61237 16.6331 5.24554 16.2425 5.63606L9.17146 12.7071Z"
      fill={fill}
    />
  </svg>
);

SvgChevronLeft.defaultProps = defaultProps;

export default memo(SvgChevronLeft);
