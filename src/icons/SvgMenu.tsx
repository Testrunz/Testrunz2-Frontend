import React, { memo } from "react";

const defaultProps = {
  width: 80,
  height: 80,
};

const SvgMenu = ({ width, height }: typeof defaultProps) => (
  <svg width={width} height={height} viewBox="0 0 80 80" fill="none">
    <rect width="44" height="44" transform="translate(18 18)" fill="white" />
    <rect x="20" y="20" width="40" height="40" rx="20" fill="white" />
    <path
      d="M26.6666 31.6667C26.6666 30.7462 27.4128 30 28.3333 30H51.6666C52.5871 30 53.3333 30.7462 53.3333 31.6667C53.3333 32.5871 52.5871 33.3333 51.6666 33.3333H28.3333C27.4128 33.3333 26.6666 32.5871 26.6666 31.6667Z"
      fill="#181818"
    />
    <path
      d="M26.6666 40C26.6666 39.0795 27.4128 38.3333 28.3333 38.3333H51.6666C52.5871 38.3333 53.3333 39.0795 53.3333 40C53.3333 40.9205 52.5871 41.6667 51.6666 41.6667H28.3333C27.4128 41.6667 26.6666 40.9205 26.6666 40Z"
      fill="#181818"
    />
    <path
      d="M28.3333 46.6667C27.4128 46.6667 26.6666 47.4129 26.6666 48.3333C26.6666 49.2538 27.4128 50 28.3333 50H51.6666C52.5871 50 53.3333 49.2538 53.3333 48.3333C53.3333 47.4129 52.5871 46.6667 51.6666 46.6667H28.3333Z"
      fill="#181818"
    />
  </svg>
);

SvgMenu.defaultProps = defaultProps;

export default memo(SvgMenu);
