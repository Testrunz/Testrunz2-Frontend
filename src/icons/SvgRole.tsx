import { memo } from "react";

const defaultProps = {
  width: 20,
  height: 20,
  fill: "#181818",
};

const SvgRole = ({ width, height, fill }: typeof defaultProps) => (
  <svg width={width} height={height} viewBox="0 0 24 24" fill={fill}>
    <path
      fill={fill}
      fillRule="evenodd"
      d="M4 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4Zm11 9a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm-8 6.3a2.8 2.8 0 0 1 2.8-2.8h4.4a2.8 2.8 0 0 1 2.8 2.8.7.7 0 0 1-.7.7H7.7a.7.7 0 0 1-.7-.7ZM8.5 4a.5.5 0 0 0 0 1h7a.5.5 0 0 0 0-1h-7Z"
      clipRule="evenodd"
    />
  </svg>
);

SvgRole.defaultProps = defaultProps;

export default memo(SvgRole);
