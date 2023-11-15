import classNames from "classnames/bind";
import styles from "./text.module.css";
import { CSSProperties, ReactNode } from "react";
import {
  textAlignType,
  textBoldType,
  textColorsType,
  textTransform,
  textType,
} from "./textTypes";

const defaultProps = {
  tag: "span",
  color: "primary",
  size: 13,
};

const cx = classNames.bind(styles);

type Props = {
  tag: any;
  children: ReactNode;
  className?: string;
  size?: number;
  color?: textColorsType;
  bold?: textBoldType;
  align?: textAlignType;
  transform?: textTransform;
  type?: textType;
  style?: CSSProperties;
  onClick?: () => void;
} & typeof defaultProps;

const Text = ({
  tag: Element,
  children,
  className,
  size,
  color,
  bold,
  align,
  transform,
  type,
  style,
  onClick,
}: Props) => {
  const textClassName = cx(
    {
      [`color-${color}`]: color,
      [`bold-${bold}`]: bold,
      [`text-${align}`]: align,
      [`transform-${transform}`]: transform,
      [`text-${size}`]: size,
      [`text-${type}`]: type,
    },
    className,
    styles.common
  );
  return (
    <Element onClick={onClick} style={style} className={textClassName}>
      {children}
    </Element>
  );
};

Text.defaultProps = defaultProps;

export default Text;
