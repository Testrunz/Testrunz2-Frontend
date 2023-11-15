import { useState, useEffect, Ref, forwardRef } from "react";
import Select, {
  GetOptionLabel,
  GetOptionValue,
  GroupBase,
  InputActionMeta,
  Options,
} from "react-select";
import { SelectComponents } from "react-select/dist/declarations/src/components";
import { FilterOptionOption } from "react-select/dist/declarations/src/filters";
import { selectTagTheme } from "./selectHelper";
import LabelWrapper from "../LabelWrapper/LabelWrapper";
import {
  primaryShade1,
  textShade1,
  textShade3,
  white,
} from "../../theme/colors";

export type inputColors = "white" | "theme";

export type list = {
  [key: string]: any;
};

type Props = {
  options: list[];
  isClearable?: boolean;
  isDisabled?: boolean;
  isSearchable?: boolean;
  isLoading?: boolean;
  placeholder?: string;
  onChange?: (a: any, b?: any) => void;
  value?: string | number | any;
  name?: string;
  required?: boolean;
  label?: string;
  defaultValue?: { label: string; value: string | number | any };
  components?: Partial<SelectComponents<any, boolean, GroupBase<any>>>;
  id?: string;
  isOptionSelected?: (option: any, selectValue: Options<any>) => boolean;
  onInputChange?: (newValue: string, actionMeta: InputActionMeta) => void;
  getOptionLabel?: GetOptionLabel<any>;
  getOptionValue?: GetOptionValue<any>;
  noOptionsMessage?: (obj: { inputValue: string }) => React.ReactNode;
  filterOption?:
    | ((option: FilterOptionOption<any>, inputValue: string) => boolean)
    | null
    | undefined;
  autoFocus?: boolean;
  inputId?: string;
  inputColor?: inputColors;
  inputHeight?: number;
  isMulti?: boolean;
  inputMaxHeight?: boolean;
};

const SelectTag = (
  {
    isLoading,
    options,
    isClearable,
    isDisabled,
    isSearchable = false,
    placeholder,
    onChange,
    value,
    name,
    required,
    label,
    defaultValue,
    components,
    id,
    isOptionSelected,
    onInputChange,
    getOptionLabel,
    getOptionValue,
    noOptionsMessage,
    filterOption,
    autoFocus,
    inputId,
    inputColor = "white",
    inputHeight = 35,
    isMulti,
    inputMaxHeight,
  }: Props,
  ref: Ref<any> | undefined
) => {
  const [isInputColor, setInputColor] = useState(white);
  const [isInputValueColor, setInputValueColor] = useState(textShade1);

  useEffect(() => {
    if (inputColor === "theme") {
      setInputColor(primaryShade1);
      setInputValueColor(white);
    }
  }, [inputColor]);

  return (
    <LabelWrapper required={required} label={label}>
      <Select
        isMulti={isMulti}
        inputId={inputId}
        ref={ref}
        id={id}
        defaultValue={defaultValue}
        value={value}
        name={name}
        isLoading={isLoading}
        isDisabled={isDisabled}
        isSearchable={isSearchable}
        isClearable={isClearable}
        options={options}
        placeholder={placeholder}
        onChange={onChange}
        styles={{
          option: (provided: any, state: any) => ({
            ...provided,
            fontSize: 12,
            color: state.isSelected ? white : textShade1,
          }),
          control: (provided: any, state: { isFocused: any }) => ({
            ...provided,
            [inputMaxHeight ? "maxHeight" : "minHeight"]: inputHeight,
            boxShadow: state.isFocused ? null : null,
            boxSizing: "border-box",
            borderColor: textShade3,
            flex: 1,
          }),
          valueContainer: (provided: any) => ({
            ...provided,
            [inputMaxHeight ? "maxHeight" : "minHeight"]: inputHeight,
            padding: "0 8px",
            fontSize: 12,
            color: textShade1,
          }),
          input: (provided: any) => ({
            ...provided,
            margin: "0px",
            fontSize: 12,
            fontFamily: `Poppins`,
            boxSizing: "border-box",
            color: isInputValueColor,
          }),
          indicatorsContainer: (provided: any) => ({
            ...provided,
            [inputMaxHeight ? "maxHeight" : "minHeight"]: inputHeight,
            cursor: "pointer",
            boxSizing: "border-box",
          }),
          clearIndicator: (provided: any) => ({
            ...provided,
            cursor: "pointer",
          }),
          placeholder: (defaultStyles: any) => {
            return {
              ...defaultStyles,
              color: textShade3,
              fontSize: 12,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              fontFamily: "Poppins-Regular",
            };
          },
          menu: (provided: any) => ({
            ...provided,
            margin: 0,
            borderBottomLeftRadius: 4,
            borderBottomRightRadius: 4,
            borderTopLeftRadius: 0,
            borderTopRightRadius: 0,
            boxSizing: "border-box",
            backgroundColor: white,
            zIndex: 12,
          }),
          singleValue: (provided: any) => ({
            ...provided,
            color: isInputValueColor,
            fontWeight: "500",
          }),
          menuList: (provided: any) => ({
            ...provided,
            overflow: "overlay",
            maxHeight: 200,
            scrollbarWidth: "thin",
            padding: 0,
          }),
        }}
        theme={(theme) => selectTagTheme(theme, isInputColor)}
        components={components}
        isOptionSelected={isOptionSelected}
        onInputChange={onInputChange}
        filterOption={filterOption}
        getOptionLabel={getOptionLabel}
        getOptionValue={getOptionValue}
        noOptionsMessage={noOptionsMessage}
        autoFocus={autoFocus}
      />
    </LabelWrapper>
  );
};

export default forwardRef(SelectTag);
