import { SketchPicker } from "react-color";
import { useState } from "react";
import SvgColorPicker from "../../icons/SvgColorPicker";
import Button from "../Button/Button";
import Flex from "../Flex/Flex";
import styles from "./colorpicker.module.css";

type Props = {
  onChange: (a: any) => void;
  color: string;
};

const ColorPicker = ({ onChange, color }: Props) => {
  const [isPicker, setPicker] = useState(false);
  const [isColor, setColor] = useState(color);

  const handlePicker = (value: any) => {
    setColor(value?.hex);
    setPicker(false);
  };

  return (
    <Flex className={styles.overAll}>
      <Button onClick={() => setPicker(true)} types="link">
        <SvgColorPicker fill={isColor} />
      </Button>
      {isPicker && (
        <div className={styles.pickerDiv}>
          <SketchPicker color={"red"} onChange={handlePicker} />
        </div>
      )}
    </Flex>
  );
};

export default ColorPicker;
