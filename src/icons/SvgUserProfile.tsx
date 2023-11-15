import React, { memo } from "react";

const defaultProps = {
  width: 24,
  height: 24,
  fill: "#996A69",
};

const SvgUserProfile = ({ width, height }: typeof defaultProps) => (
  <svg width={width} height={height} viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="10" fill="#181818" />
    <mask
      id="mask0_232_5597"
      //   style="mask-type:alpha"
      maskUnits="userSpaceOnUse"
      x="2"
      y="2"
      width="20"
      height="20"
    >
      <circle cx="12" cy="12" r="10" fill="#869AE0" />
    </mask>
    <g mask="url(#mask0_232_5597)">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 14C14.7614 14 17 11.7614 17 9C17 6.23858 14.7614 4 12 4C9.23858 4 7 6.23858 7 9C7 11.7614 9.23858 14 12 14ZM12 38C18.3513 38 23.5 32.8513 23.5 26.5C23.5 20.1487 18.3513 15 12 15C5.64873 15 0.5 20.1487 0.5 26.5C0.5 32.8513 5.64873 38 12 38Z"
        fill="url(#paint0_linear_232_5597)"
      />
    </g>
    <defs>
      <linearGradient
        id="paint0_linear_232_5597"
        x1="9.78554"
        y1="17.4107"
        x2="20.3587"
        y2="14.2646"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#FFC60B" />
        <stop offset="1" stopColor="white" />
      </linearGradient>
    </defs>
  </svg>
);

SvgUserProfile.defaultProps = defaultProps;

export default memo(SvgUserProfile);
