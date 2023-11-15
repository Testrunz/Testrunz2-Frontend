import styles from "./microsoftsignIn.module.css";
import Button from "../Button/Button";
import Flex from "../Flex/Flex";
import SvgMicrosoft from "../../icons/SvgMicrosoft";
import Text from "../Text/Text";

type Props = {
  onClick: (a: any) => void;
  isLogin?: boolean;
};
const MicrosoftSignIn = ({ onClick, isLogin }: Props) => {
  return (
    <Button
      onClick={onClick}
      className={styles.btnContainer}
      style={{ marginTop: 20 }}
    >
      <Flex row center>
        <SvgMicrosoft />
        <Text type="bodyBold" className={styles.marginLeft}>
          {isLogin ? "Login" : "Sign up"} with Microsoft
        </Text>
      </Flex>
    </Button>
  );
};

export default MicrosoftSignIn;
