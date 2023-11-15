import { memo } from "react";

const defaultProps = {
  width: 20,
  height: 20,
  fill: "#181818",
};

const SvgProfile = ({ width, height, fill }: typeof defaultProps) => (
  <svg width={width} height={height} viewBox="0 0 24 24" fill={fill}>
    <circle cx={12} cy={8} r={6} fill={fill} />
    <path
      fill={fill}
      d="M2 20.6A5.6 5.6 0 0 1 7.6 15h8.8a5.6 5.6 0 0 1 5.6 5.6 1.4 1.4 0 0 1-1.4 1.4H3.4A1.4 1.4 0 0 1 2 20.6Z"
    />
  </svg>
);

SvgProfile.defaultProps = defaultProps;

export default memo(SvgProfile);
