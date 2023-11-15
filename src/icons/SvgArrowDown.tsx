import { memo } from "react";

const defaultProps = {
  width: 20,
  height: 20,
  fill: "#181818",
  fillOne: "#fff",
};

const SvgArrowDown = ({
  width,
  height,
  fill,
  fillOne,
}: typeof defaultProps) => (
  <svg width={width} height={height} viewBox="0 0 24 24" fill="none">
    <rect width="24" height="24" fill={fillOne} />
    <path
      d="M4.22156 7.75698C3.83103 8.14751 3.83103 8.78067 4.22156 9.1712L11.2926 16.2423C11.6832 16.6328 12.3163 16.6328 12.7068 16.2423C13.0974 15.8517 13.0974 15.2186 12.7068 14.828L5.63577 7.75698C5.24525 7.36646 4.61208 7.36646 4.22156 7.75698Z"
      fill={fill}
    />
    <path
      d="M11.2926 14.828C10.9021 15.2186 10.9021 15.8517 11.2926 16.2423C11.6832 16.6328 12.3163 16.6328 12.7068 16.2423L19.7779 9.1712C20.1684 8.78067 20.1684 8.14751 19.7779 7.75698C19.3874 7.36646 18.7542 7.36646 18.3637 7.75698L11.2926 14.828Z"
      fill={fill}
    />
  </svg>
);

SvgArrowDown.defaultProps = defaultProps;

export default memo(SvgArrowDown);
