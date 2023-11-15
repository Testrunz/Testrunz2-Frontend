import classNames from "classnames/bind";
import Text from "../Text/Text";
import styles from "./button.module.css";
import { buttonHelper, buttonTypes } from "./buttonHelper";
import { textColorsType } from "../Text/textTypes";
import { CSSProperties } from "react";

const cx = classNames.bind(styles);

type Props = {
  children: import("react").ReactChild;
  types?: buttonTypes;
  className?: string;
  disabled?: boolean;
  onClick?: (arg: any) => void;
  style?: CSSProperties;
  onKeyDown?: (arg: any) => void;
  textSize?: number;
  id?: string;
  type?: "button" | "submit" | "reset";
  height?: "small" | "medium" | "large";
  textColors?: textColorsType;
  ref?: any;
  title?: string;
};

const Button = ({
  children,
  types,
  className,
  disabled,
  onClick,
  style,
  onKeyDown,
  textSize,
  id,
  type,
  height,
  textColors,
  ref,
  title,
}: Props) => {
  const buttonClassName = cx(
    {
      [`buttonTypes-${types}`]: types,
      [`disabled-${types}`]: disabled,
      [`height-${height}`]: height,
    },
    className,
    "common"
  );

  const { textColor } = buttonHelper(types, disabled);

  let size = 14;

  if (height === "small" || height === "medium") {
    size = 14;
  } else {
    size = 16;
  }

  return (
    <button
      title={title}
      ref={ref}
      id={id}
      type={type}
      onClick={onClick}
      style={style}
      disabled={disabled}
      className={buttonClassName}
      onKeyDown={onKeyDown}
    >
      {typeof children === "string" || typeof children === "number" ? (
        <Text
          bold={height === "large" ? "bold" : "semiBold"}
          size={textSize || size}
          color={textColors ? textColors : textColor}
        >
          {children}
        </Text>
      ) : (
        children
      )}
    </button>
  );
};

const defaultProps = {
  types: "primary",
  type: "button",
  height: "medium",
};

Button.defaultProps = defaultProps;

export default Button;
