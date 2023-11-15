import { useState } from "react";
import Button from "../Button/Button";
import Flex from "../Flex/Flex";
import styles from "./buttongroup.module.css";

type Props = {
  buttons: string[];
  defaultSelected?: string;
  onButtonChange: (a: any) => void;
};
const ButtonGroup = ({ buttons, defaultSelected, onButtonChange }: Props) => {
  const [selectedButton, setSelectedButton] = useState(defaultSelected);

  const handleButtonClick = (button: any) => {
    setSelectedButton(button);
    if (onButtonChange) {
      onButtonChange(button);
    }
  };

  return (
    <Flex row center flex={1}>
      {buttons.map((button, index) => (
        <Button
          key={index}
          types={selectedButton === button ? "primary" : "tertiary"}
          onClick={() => handleButtonClick(button)}
          // className={selectedButton === button ? "active" : ""}
          className={styles.btn}
        >
          {button}
        </Button>
      ))}
    </Flex>
  );
};

export default ButtonGroup;
