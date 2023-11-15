import classNames from "classnames/bind";
import { ReactChild } from "react";
import Flex from "../Flex/Flex";
import Text from "../Text/Text";
import styles from "./badge.module.css";
import { textColorsType } from "../Text/textTypes";

const cx = classNames.bind(styles);

type Props = {
  type?:
    | "primary"
    | "secondary"
    | "link"
    | "success"
    | "success-gradient"
    | "error"
    | "error-gradient";
  className?: string;
  children: ReactChild;
  actionLeft?: Function;
  actionRight?: Function;
};

const Badge = ({
  type,
  className,
  children,
  actionLeft,
  actionRight,
}: Props) => {
  const badgeClassName = cx(className, "common", {
    [`type-${type}`]: type,
  });

  let textColor: textColorsType = "primary";
  if (type === "error") {
    textColor = "white";
  } else if (type === "success") {
    textColor = "white";
  } else if (type === "secondary") {
    textColor = "white";
  } else if (type === "link") {
    textColor = "theme";
  } else if (type === "success-gradient") {
    textColor = "success";
  } else if (type === "error-gradient") {
    textColor = "error";
  }
  return (
    <Flex row center middle className={badgeClassName}>
      {typeof actionLeft === "function" && (
        <div className={styles.actionLeftStyle}>{actionLeft()}</div>
      )}
      {typeof children === "string" || typeof children === "number" ? (
        <Text type="smallBold" color={textColor}>
          {children}
        </Text>
      ) : (
        children
      )}
      {typeof actionRight === "function" && (
        <div className={styles.actionRightStyle}>{actionRight()}</div>
      )}
    </Flex>
  );
};

const defaultProps = {
  type: "primary",
};

Badge.defaultProps = defaultProps;

export default Badge;
