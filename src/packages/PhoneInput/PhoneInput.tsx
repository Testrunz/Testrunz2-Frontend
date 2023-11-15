import { useState } from "react";
import Phone, { CountryData } from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import LabelWrapper from "../LabelWrapper/LabelWrapper";
import styles from "./phoneinput.module.css";
import { statusType } from "../InputText/inputTextTypes";

const defaultProps = {
  defaultCountry: "in",
};
type Props = {
  defaultCountry?: string;
  value?: string;
  onChange?: (
    value: string,
    data: CountryData | {},
    event: React.ChangeEvent<HTMLInputElement>,
    formattedValue: string
  ) => void;
  label?: string;
  required?: boolean;
  message?: string;
  status?: statusType;
} & typeof defaultProps;

const PhoneInput = ({
  defaultCountry,
  value,
  onChange,
  label,
  required,
  message,
  status,
}: Props) => {
  const [isFocus, setFocus] = useState(false);

  const handleFocus = () => {
    setFocus(true);
  };
  const handleBlur = () => {
    setFocus(false);
  };
  return (
    <LabelWrapper
      label={label}
      required={required}
      message={message}
      status={status}
    >
      <Phone
        onlyCountries={["in"]}
        onFocus={handleFocus}
        onBlur={handleBlur}
        inputClass={styles.phoneInput}
        dropdownClass={styles.dropDownStyle}
        country={defaultCountry}
        value={value}
        onChange={onChange}
      />
    </LabelWrapper>
  );
};

PhoneInput.defaultProps = defaultProps;

export default PhoneInput;
