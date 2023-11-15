import React, { memo } from "react";

const defaultProps = {
  width: 40,
  height: 24,
};

const SvgSwitch = ({ width, height }: typeof defaultProps) => (
  <svg width={width} height={height} viewBox="0 0 48 25" fill="none">
    <g filter="url(#Enabled=True,_On=True,_Label=False_svg__a)">
      <g clipPath="url(#Enabled=True,_On=True,_Label=False_svg__b)">
        <rect width={48} height={24} y={0.71} fill="#FFC60B" rx={12} />
        <g filter="url(#Enabled=True,_On=True,_Label=False_svg__c)">
          <rect width={18} height={18} x={27} y={3.71} fill="#fff" rx={9} />
        </g>
      </g>
    </g>
    <defs>
      <filter
        id="Enabled=True,_On=True,_Label=False_svg__a"
        width={48}
        height={24}
        x={0}
        y={0.71}
        colorInterpolationFilters="sRGB"
        filterUnits="userSpaceOnUse"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feColorMatrix
          in="SourceAlpha"
          result="hardAlpha"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
        />
        <feOffset />
        <feGaussianBlur stdDeviation={2} />
        <feComposite in2="hardAlpha" k2={-1} k3={1} operator="arithmetic" />
        <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.05 0" />
        <feBlend in2="shape" result="effect1_innerShadow_3_73" />
      </filter>
      <filter
        id="Enabled=True,_On=True,_Label=False_svg__c"
        width={26}
        height={26}
        x={23}
        y={1.71}
        colorInterpolationFilters="sRGB"
        filterUnits="userSpaceOnUse"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          result="hardAlpha"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
        />
        <feOffset dy={2} />
        <feGaussianBlur stdDeviation={2} />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0" />
        <feBlend in2="BackgroundImageFix" result="effect1_dropShadow_3_73" />
        <feBlend
          in="SourceGraphic"
          in2="effect1_dropShadow_3_73"
          result="shape"
        />
      </filter>
      <clipPath id="Enabled=True,_On=True,_Label=False_svg__b">
        <rect width={48} height={24} y={0.71} fill="#fff" rx={12} />
      </clipPath>
    </defs>
  </svg>
);

SvgSwitch.defaultProps = defaultProps;

export default memo(SvgSwitch);
