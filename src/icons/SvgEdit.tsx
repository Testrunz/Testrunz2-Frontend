import { memo } from "react";

const defaultProps = {
  width: 20,
  height: 20,
  fill: "#181818",
};

const SvgEdit = ({ width, height, fill }: typeof defaultProps) => (
  <svg width={width} height={height} viewBox="0 0 24 25" fill="none">
    <path
      d="M20.6249 6.33939C21.1455 6.86 21.1212 7.7283 20.5707 8.2788L19.279 9.5705L14.9295 5.22097L16.2212 3.92927C16.7717 3.37877 17.64 3.35453 18.1606 3.87514L20.6249 6.33939Z"
      fill={fill}
    />
    <path
      d="M13.4797 6.67081L3.56934 16.5811C2.9683 17.1822 2.71954 20.3306 3.44446 21.0555C4.16938 21.7805 7.31783 21.5317 7.91888 20.9307L17.8292 11.0203L13.4797 6.67081Z"
      fill={fill}
    />
    <rect x="13" y="19.5" width="7" height="2" rx="1" fill={fill} />
  </svg>
);

SvgEdit.defaultProps = defaultProps;

export default memo(SvgEdit);
