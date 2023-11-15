import classNames from "classnames/bind";
import { CSSProperties, useState } from "react";
import styles from "./inputtext.module.css";
import { keyBoardProps, statusType } from "./inputTextTypes";
import LabelWrapper from "../LabelWrapper/LabelWrapper";

const cx = classNames.bind(styles);

type Props = {
  placeholder?: string;
  autoComplete?: string;
  className?: string;
  name?: string;
  label?: string;
  required?: boolean;
  value?: string;
  disabled?: boolean;
  onChange?: (a: any) => void;
  maxLength?: number;
  minLength?: number;
  onKeyPress?: (a: any) => void;
  keyboardType?: keyBoardProps;
  style?: CSSProperties;
  actionRight?: Function;
  autoFocus?: boolean;
  actionLeft?: Function;
  message?: string;
  white?: boolean;
  status?: statusType;
  size?: "small" | "medium";
  defaultValue?: string;
};

const InputText = ({
  placeholder,
  autoComplete,
  className,
  name,
  label,
  required,
  value,
  disabled,
  keyboardType,
  onChange,
  onKeyPress,
  maxLength,
  minLength,
  style,
  actionRight,
  autoFocus,
  actionLeft,
  message,
  white,
  status,
  size,
  defaultValue,
}: Props) => {
  const [isFocus, setFocus] = useState(false);

  const inputClassName = cx(className, styles.common, {
    [`status-${status}`]: status,
    white,
    ["primaryFocus"]: isFocus,
    [`sizeRadius-${size}`]: size,
    disabled,
  });

  const handleFocus = () => {
    setFocus(true);
  };

  const handleBlur = (e: any) => {
    setFocus(false);
  };

  return (
    <LabelWrapper
      label={label}
      required={required}
      status={status}
      message={message}
    >
      <div className={cx("inputDiv", inputClassName)}>
        {typeof actionLeft === "function" && (
          <div className={styles.actionLeftStyle}>{actionLeft()}</div>
        )}
        <input
          defaultValue={defaultValue}
          autoFocus={autoFocus}
          maxLength={maxLength}
          minLength={minLength}
          name={name}
          onKeyPress={onKeyPress}
          disabled={disabled}
          type={keyboardType}
          onChange={onChange}
          autoComplete={autoComplete}
          value={value}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={placeholder}
          className={cx("inputStyle", { [`size-${size}`]: size })}
          style={style}
        />

        {typeof actionRight === "function" && (
          <div className={styles.actionRightStyle}>{actionRight()}</div>
        )}
      </div>
    </LabelWrapper>
  );
};

const defaultProps = {
  size: "medium",
};

InputText.defaultProps = defaultProps;

export default InputText;
