import { memo } from "react";

const defaultProps = {
  width: 30,
  height: 30,
  fill: "#181818",
  fillOne: "#FFF4D0",
};

const SvgBack = ({ width, height, fill, fillOne }: typeof defaultProps) => (
  <svg width={width} height={height} viewBox="0 0 51 51" fill="none">
    <rect x="0.25" y="0.709961" width="50" height="50" rx="8" fill={fillOne} />
    <path
      d="M19.3438 24.96L28.4375 15.8193C28.9062 15.3975 29.6094 15.3975 30.0312 15.8193L31.1094 16.8975C31.5312 17.3193 31.5312 18.0225 31.1094 18.4912L23.8906 25.71L31.1094 32.9756C31.5312 33.4443 31.5312 34.1475 31.1094 34.5693L30.0312 35.6475C29.6094 36.0693 28.9062 36.0693 28.4375 35.6475L19.3438 26.5068C18.9219 26.085 18.9219 25.3818 19.3438 24.96Z"
      fill={fill}
    />
  </svg>
);

SvgBack.defaultProps = defaultProps;

export default memo(SvgBack);
