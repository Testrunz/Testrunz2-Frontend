import React, { memo } from "react";

const defaultProps = {
  width: 24,
  height: 24,
  fill: "#9F9F9F",
};

const SvgDesignation = ({ width, height, fill }: typeof defaultProps) => (
  <svg width={width} height={height} viewBox="0 0 24 25" fill="none">
    <path
      d="M4 3.5V21.5C4 22.0523 4.44772 22.5 5 22.5H19C19.5523 22.5 20 22.0523 20 21.5V8.5H15.5044C14.676 8.5 14.0044 7.82843 14.0044 7V2.5H5C4.44771 2.5 4 2.94772 4 3.5Z"
      fill={fill}
    />
    <path
      d="M15.0044 2.59183V7C15.0044 7.27614 15.2283 7.5 15.5044 7.5H19.9102C19.861 7.39201 19.7926 7.29261 19.7071 7.20711L15.2929 2.79289C15.2085 2.70855 15.1107 2.64082 15.0044 2.59183Z"
      fill={fill}
    />
  </svg>
);

SvgDesignation.defaultProps = defaultProps;

export default memo(SvgDesignation);
