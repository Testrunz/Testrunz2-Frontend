import React, { memo } from "react";

const defaultProps = {
  width: 220,
  height: 220,
  onClick: () => {},
  isEdit: false,
};

const SvgProfileEdit = ({
  width,
  height,
  onClick,
  isEdit,
}: typeof defaultProps) => (
  <svg
    style={{ pointerEvents: isEdit ? "none" : "auto" }}
    width={width}
    height={height}
    viewBox="0 0 220 220"
    fill="none"
  >
    <circle cx="110" cy="110" r="83.3333" fill="#565656" />
    <mask
      id="mask0_134_2748"
      //   style="mask-type:alpha"
      maskUnits="userSpaceOnUse"
      x="26"
      y="26"
      width="168"
      height="168"
    >
      <circle cx="110" cy="110" r="83.3333" fill="#869AE0" />
    </mask>
    <g mask="url(#mask0_134_2748)">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M110 126.666C133.012 126.666 151.667 108.012 151.667 84.9997C151.667 61.9878 133.012 43.333 110 43.333C86.9882 43.333 68.3334 61.9878 68.3334 84.9997C68.3334 108.012 86.9882 126.666 110 126.666ZM110 326.666C162.927 326.666 205.833 283.76 205.833 230.833C205.833 177.906 162.927 135 110 135C57.0728 135 14.1667 177.906 14.1667 230.833C14.1667 283.76 57.0728 326.666 110 326.666Z"
        fill="url(#paint0_linear_134_2748)"
      />
    </g>
    <rect
      x="2.5"
      y="2.5"
      width="215"
      height="215"
      rx="107.5"
      stroke="#F3F3F3"
      strokeWidth="5"
    />
    <g
      style={{ zIndex: 11, cursor: "pointer" }}
      onClick={onClick}
      filter="url(#filter0_d_134_2748)"
    >
      <rect
        x="166"
        y="166"
        width="40"
        height="40"
        rx="20"
        fill="#FFC60B"
        shapeRendering="crispEdges"
      />
      <g filter="url(#filter1_d_134_2748)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M186 192.25C188.761 192.25 191 190.011 191 187.25C191 184.489 188.761 182.25 186 182.25C183.239 182.25 181 184.489 181 187.25C181 190.011 183.239 192.25 186 192.25ZM186 190.375C187.726 190.375 189.125 188.976 189.125 187.25C189.125 185.524 187.726 184.125 186 184.125C184.274 184.125 182.875 185.524 182.875 187.25C182.875 188.976 184.274 190.375 186 190.375Z"
          fill="#181818"
        />
        <path
          d="M193.5 182.25C193.5 182.94 192.94 183.5 192.25 183.5C191.56 183.5 191 182.94 191 182.25C191 181.56 191.56 181 192.25 181C192.94 181 193.5 181.56 193.5 182.25Z"
          fill="#181818"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M189.671 177.875C189.723 178.075 189.75 178.284 189.75 178.5V178.506H191V177.875C191 177.53 191.28 177.25 191.625 177.25H192.875C193.22 177.25 193.5 177.53 193.5 177.875V178.506C196.261 178.506 198.5 180.744 198.5 183.506V191C198.5 193.761 196.261 196 193.5 196H178.5C175.739 196 173.5 193.761 173.5 191V183.506C173.5 181.176 175.093 179.218 177.25 178.663V178.5C177.25 178.284 177.277 178.075 177.329 177.875C177.606 176.797 178.585 176 179.75 176H187.25C188.415 176 189.394 176.797 189.671 177.875ZM193.5 180.381H178.5C176.774 180.381 175.375 181.78 175.375 183.506V191C175.375 192.726 176.774 194.125 178.5 194.125H193.5C195.226 194.125 196.625 192.726 196.625 191V183.506C196.625 181.78 195.226 180.381 193.5 180.381Z"
          fill="#181818"
        />
      </g>
    </g>
    <defs>
      <filter
        id="filter0_d_134_2748"
        x="162"
        y="166"
        width="48"
        height="48"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dy="4" />
        <feGaussianBlur stdDeviation="2" />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
        />
        <feBlend
          mode="normal"
          in2="BackgroundImageFix"
          result="effect1_dropShadow_134_2748"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_dropShadow_134_2748"
          result="shape"
        />
      </filter>
      <filter
        id="filter1_d_134_2748"
        x="163"
        y="166"
        width="38"
        height="38"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dx="-4" dy="-1" />
        <feGaussianBlur stdDeviation="2" />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.05 0"
        />
        <feBlend
          mode="normal"
          in2="BackgroundImageFix"
          result="effect1_dropShadow_134_2748"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_dropShadow_134_2748"
          result="shape"
        />
      </filter>
      <linearGradient
        id="paint0_linear_134_2748"
        x1="91.5463"
        y1="155.089"
        x2="179.656"
        y2="128.871"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#FFC60B" />
        <stop offset="1" stopColor="white" />
      </linearGradient>
    </defs>
  </svg>
);

SvgProfileEdit.defaultProps = defaultProps;

export default memo(SvgProfileEdit);
