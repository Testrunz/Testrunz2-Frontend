import React, { memo } from "react";

const defaultProps = {
  width: 20,
  height: 20,
  fill: "#E2445C",
};

const SvgClose = ({ width, height, fill }: typeof defaultProps) => (
  <svg width={width} height={height} viewBox="0 0 24 24" fill="none">
    <path
      d="M3.35772 3.35796C2.88043 3.83525 2.88043 4.60909 3.35772 5.08637L10.2713 12L3.35772 18.9136C2.88043 19.3909 2.88043 20.1647 3.35772 20.642C3.83501 21.1193 4.60884 21.1193 5.08613 20.642L11.9998 13.7284L18.9134 20.642C19.3907 21.1193 20.1645 21.1193 20.6418 20.642C21.1191 20.1647 21.1191 19.3909 20.6418 18.9136L13.7282 12L20.6418 5.08637C21.1191 4.60909 21.1191 3.83525 20.6418 3.35796C20.1645 2.88068 19.3907 2.88068 18.9134 3.35796L11.9998 10.2716L5.08613 3.35796C4.60884 2.88068 3.83501 2.88068 3.35772 3.35796Z"
      fill={fill}
    />
  </svg>
);

SvgClose.defaultProps = defaultProps;

export default memo(SvgClose);
