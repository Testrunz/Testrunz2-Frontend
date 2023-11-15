import React, { memo } from "react";

const defaultProps = {
  width: 20,
  height: 20,
  fill: "#000",
};

const SvgArrowUp = ({ width, height, fill }: typeof defaultProps) => (
  <svg width={width} height={height} viewBox="0 0 24 24" fill="none">
    <rect width="24" height="24" fill="white" />
    <path
      d="M4.22156 16.2425C3.83103 15.852 3.83103 15.2188 4.22156 14.8283L11.2926 7.75725C11.6832 7.36672 12.3163 7.36672 12.7068 7.75725C13.0974 8.14777 13.0974 8.78094 12.7068 9.17146L5.63577 16.2425C5.24525 16.6331 4.61208 16.6331 4.22156 16.2425Z"
      fill="#181818"
    />
    <path
      d="M11.2926 9.17146C10.9021 8.78094 10.9021 8.14777 11.2926 7.75725C11.6832 7.36672 12.3163 7.36672 12.7068 7.75725L19.7779 14.8283C20.1684 15.2188 20.1684 15.852 19.7779 16.2425C19.3874 16.6331 18.7542 16.6331 18.3637 16.2425L11.2926 9.17146Z"
      fill="#181818"
    />
  </svg>
);

SvgArrowUp.defaultProps = defaultProps;

export default memo(SvgArrowUp);
