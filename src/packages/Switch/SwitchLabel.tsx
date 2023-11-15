import React, { memo } from "react";
import Text from "../Text/Text";
import styles from "./switchlabel.module.css";
import { textColorsType } from "../Text/textTypes";

type Props = {
  labelColor?: textColorsType;
  label: import("react").ReactNode;
};

const SwitchLabel = ({ labelColor, label }: Props) => {
  if (!label) {
    return null;
  }
  return (
    <Text type="captionBold" color={labelColor} className={styles.text}>
      {label}
    </Text>
  );
};

export default memo(
  SwitchLabel,
  (prevProps: Props, nextProps: Props) => prevProps.label === nextProps.label
);
