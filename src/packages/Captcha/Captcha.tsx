import { useState } from "react";
import LabelWrapper from "../LabelWrapper/LabelWrapper";
import Flex from "../Flex/Flex";
import Text from "../Text/Text";
import styles from "./captcha.module.css";
import InputText from "../InputText/InputText";
import Button from "../Button/Button";

const generateCaptcha = () => {
  const randomString = Math.random().toString(36).slice(2, 8);
  return randomString;
};

type Props = {
  onClick: () => void;
};

const Captcha = ({ onClick }: Props) => {
  const [captcha, setCaptcha] = useState(generateCaptcha());
  const [userInput, setUserInput] = useState("");
  const [valid, setValid] = useState(false);
  const [error, setError] = useState(false);

  //   const refreshCaptcha = () => {
  //     setUserInput("");
  //     setCaptcha(generateCaptcha());
  //     setValid(false);
  //   };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (userInput === captcha) {
      setError(false);
      setValid(true);
      onClick();
    } else {
      setValid(false);
      setError(true);
    }
  };

  return (
    <Flex>
      <LabelWrapper label="Enter captcha">
        <Flex row>
          <Flex className={styles.captchaBox}>
            <Text className={styles.captchaText} type="title">
              {captcha}
            </Text>
          </Flex>
          <Flex flex={1}>
            <InputText
              keyboardType="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
            />
          </Flex>
        </Flex>
      </LabelWrapper>
      {error && userInput.length === 0 && (
        <Text type="captionRegular" color="error">
          This field is required
        </Text>
      )}
      {!valid && userInput.length > 0 && captcha !== userInput && (
        <Text type="captionRegular" color="error">
          Invalid Captcha
        </Text>
      )}
      <Button onClick={handleSubmit} className={styles.nextBtn}>
        Next
      </Button>
    </Flex>
  );
};

export default Captcha;
