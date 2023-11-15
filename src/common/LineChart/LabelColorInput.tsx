import { useRef, useState } from "react";
import Flex from "../../packages/Flex/Flex";
import Text from "../../packages/Text/Text";
import SelectTag from "../../packages/SelectTag/SelectTag";
import { yAxiosOptions } from "./mock";
import styles from "./linechartslist.module.css";

export const LabelColorInput = ({
  title,
  value,
  onChange,
  color,
  onChangeColor,
  isColor = true,
  options,
  valueY,
  onChangeY,
  isY = true,
  getOptionValue,
  getOptionLabel,
}: {
  title?: string;
  value: any;
  color?: string;
  onChangeColor?: any;
  onChange: (a: any) => void;
  isColor?: boolean;
  options: any;
  onChangeY?: (a: any) => void;
  valueY?: any;
  isY?: boolean;
  getOptionLabel?: any;
  getOptionValue?: any;
}) => {
  const [key, setKey] = useState(0); // unique key to force re-render

  const handleChange = (event: any) => {
    onChangeColor(event);
    setKey((prevKey) => prevKey + 1);
  };
  return (
    <Flex row center>
      {title && (
        <Text style={{ width: 25 }} type="subTitle">
          {title}
        </Text>
      )}
      <Flex flex={1} className={styles.axisLabel}>
        <SelectTag
          getOptionLabel={getOptionLabel}
          getOptionValue={getOptionValue}
          value={value}
          onChange={onChange}
          options={options}
        />
      </Flex>
      {isY && (
        <Flex flex={1} width={30} marginRight={8}>
          <SelectTag
            getOptionLabel={(option) => option.yAxisID}
            getOptionValue={(option) => option.yAxisID}
            value={valueY}
            onChange={onChangeY}
            options={yAxiosOptions}
          />
        </Flex>
      )}

      {isColor && (
        <input
          key={key}
          onChange={handleChange}
          className={styles.colorInput}
          type="color"
          value={color}
        />
      )}
    </Flex>
  );
};
