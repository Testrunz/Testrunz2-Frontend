import React, { memo } from "react";

const defaultProps = {
  width: 24,
  height: 24,
};

const SvgMicrosoft = ({ width, height }: typeof defaultProps) => (
  <svg width={width} height={height} viewBox="0 0 550 550" fill="none">
    <path d="M550 300H300V550H550V300Z" fill="#FEBA08" />
    <path d="M250 300H0V550H250V300Z" fill="#05A6F0" />
    <path d="M550 0H300V250H550V0Z" fill="#80BC06" />
    <path d="M250 0H0V250H250V0Z" fill="#F25325" />
  </svg>
);

SvgMicrosoft.defaultProps = defaultProps;

export default memo(SvgMicrosoft);
