import React, { memo } from "react";
import Text from "../Text/Text";
import styles from "./checkboxlabel.module.css";
import { textColorsType } from "../Text/textTypes";

type Props = {
  labelColor?: textColorsType;
  label: import("react").ReactNode;
};

const CheckboxLabel = ({ labelColor, label }: Props) => {
  if (!label) {
    return null;
  }
  return (
    <Text type={"captionBold"} color={labelColor} className={styles.text}>
      {label}
    </Text>
  );
};

export default memo(
  CheckboxLabel,
  (prevProps: Props, nextProps: Props) => prevProps.label === nextProps.label
);
