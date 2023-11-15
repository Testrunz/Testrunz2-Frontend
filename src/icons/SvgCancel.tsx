import { memo } from "react";

const defaultProps = {
  width: 240,
  height: 240,
  fill: "#FFB9B9",
};

const SvgCancel = ({ width, height, fill }: typeof defaultProps) => (
  <svg width={width} height={height} viewBox="0 0 240 240" fill="none">
    <rect width="240" height="240" fill="white" />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M49.2893 49.2893C10.2369 88.3418 10.2369 151.658 49.2893 190.711C88.3418 229.763 151.658 229.763 190.711 190.711C229.763 151.658 229.763 88.3418 190.711 49.2893C151.658 10.2369 88.3418 10.2369 49.2893 49.2893ZM86.6944 181.59L181.59 86.6944C195.951 113.225 191.92 147.075 169.497 169.497C147.075 191.92 113.225 195.951 86.6944 181.59ZM70.5025 70.5025C48.08 92.925 44.0492 126.775 58.4101 153.306L153.306 58.4101C126.775 44.0492 92.925 48.08 70.5025 70.5025Z"
      fill={fill}
    />
  </svg>
);

SvgCancel.defaultProps = defaultProps;

export default memo(SvgCancel);
