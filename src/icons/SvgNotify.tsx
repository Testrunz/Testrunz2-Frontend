import { memo } from "react";

const defaultProps = {
  width: 20,
  height: 20,
  fill: "#181818",
};

const SvgNotify = ({ width, height, fill }: typeof defaultProps) => (
  <svg width={width} height={height} viewBox="0 0 24 24" fill={fill}>
    <path
      d="M12 2.00013C8.00001 2.0024 5 5.00013 6 8.00013C6.95712 10.9828 7 12.0009 6 13.0001C4.94403 13.9994 4 15.8956 4 17.0001C4 18.1047 4 19.0001 6 19.0001C8 19.0001 16 19.0001 18 19.0001C20 19.0001 20 18.1047 20 17.0001C20 15.8956 19.0044 13.9994 18 13.0001C16.9956 12.0009 16.9913 10.9324 18 8.00013C19 5.00013 16 1.99786 12 2.00013Z"
      fill={fill}
    />
    <path
      d="M13 20H17C17 20.8284 16.3284 21.5 15.5 21.5H14.5C13.6716 21.5 13 20.8284 13 20Z"
      fill={fill}
    />
  </svg>
);

SvgNotify.defaultProps = defaultProps;

export default memo(SvgNotify);
