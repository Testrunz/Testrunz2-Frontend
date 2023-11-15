import { memo, useCallback } from "react";
import SvgSwitch from "../../icons/SvgSwitch";
import SvgSwitchOutline from "../../icons/SvgSwitchOutline";
import SwitchLabel from "./SwitchLabel";
import styles from "./switch.module.css";
import { textColorsType } from "../Text/textTypes";
import Flex from "../Flex/Flex";

type DefaultPropsTypes = {
  name?: string;
  labelColor?: textColorsType;
};

const defaultProps: DefaultPropsTypes = {
  name: "",
  labelColor: "shade-3",
};

export type CheckBoxEventType = {
  target: {
    value: any[];
  };
};

type Props = {
  onClick?: (args: any) => void;
  onBlur?: (args: any) => void;
  checked?: boolean;
  size?: number;
  color?: string;
  label?: import("react").ReactNode;
  value?: any[];
  labelColor?: textColorsType;
  left?: boolean;
} & typeof defaultProps;

const CheckBox = ({
  onClick,
  checked,
  onBlur,
  label,
  labelColor,
  name,
  left,
  value,
}: Props) => {
  const handleOnClick = useCallback(
    (e: any) => {
      const isValuePresent = Array.isArray(value);
      if (typeof onClick === "function") {
        if (!value) {
          e.target.value = [name];
        } else if (isValuePresent) {
          if (value.includes(name)) {
            const filteredValue = value.filter((v) => v !== name);
            e.target.value = filteredValue;
          } else {
            e.target.value = [...value, name];
          }
        }
        onClick(e);
      }
    },
    [onClick]
  );

  return (
    <div
      role={"button"}
      tabIndex={-1}
      onClick={handleOnClick}
      onBlur={onBlur}
      className={styles.container}
    >
      {left && (
        <Flex marginRight={8}>
          <SwitchLabel label={label} labelColor={labelColor} />
        </Flex>
      )}
      {checked ? <SvgSwitch /> : <SvgSwitchOutline />}
      {!left && <SwitchLabel label={label} labelColor={labelColor} />}
    </div>
  );
};

CheckBox.defaultProps = defaultProps;

export default memo(CheckBox);
