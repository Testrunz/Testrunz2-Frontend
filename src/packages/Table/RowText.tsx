import React, { memo } from "react";
import Text from "../Text/Text";
import styles from "./rowtext.module.css";

type Props = {
  columnData?: React.ReactNode;
  center: boolean;
};

const RowText = ({ columnData, center }: Props) => {
  if (!columnData) {
    return <></>;
  }
  return (
    <Text align={center ? "center" : "start"} className={styles.textStyle}>
      {columnData}
    </Text>
  );
};

export default memo(RowText);
