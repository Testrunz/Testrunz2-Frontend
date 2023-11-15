import { ReactChild } from "react";
import Flex from "../../packages/Flex/Flex";
import styles from "./loginframe.module.css";

type Props = {
  leftChild: ReactChild;
  rightChild: ReactChild;
  image?: string;
};

const LoginFrame = ({
  leftChild,
  rightChild,
  image = require("../../images/loginFrame.png"),
}: Props) => {
  return (
    <div
      className={styles.overAllContainer}
      style={{ height: window.innerHeight - 40, display: "flex",overflowY:'scroll' ,padding:20}}
    >
      <Flex className={styles.overAll}>
        <img src={image} alt="frame" className={styles.image} />
        <Flex row className={styles.container}>
          <Flex flex={6} className={styles.welcomeContainer}>
            {leftChild}
          </Flex>
          <Flex flex={6} className={styles.inputContainer}>
            {rightChild}
          </Flex>
        </Flex>
      </Flex>
    </div>
  );
};

export default LoginFrame;
