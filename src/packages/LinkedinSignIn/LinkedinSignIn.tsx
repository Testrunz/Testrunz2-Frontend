import { useNavigate } from "react-router-dom";
import { auth, provider } from "../../utils/firebase";
import Button from "../Button/Button";
import Flex from "../Flex/Flex";
import SvgLinkedIn from "../../icons/SvgLinkedIn";
import Text from "../Text/Text";
import styles from "./linkedinsignin.module.css";

const LinkedinSignIn = () => {
  const navigate = useNavigate();
  const handlerGoogleSignIn = (e: any) => {
    e.preventDefault();
    auth
      .signInWithPopup(provider)
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        //  console.error(err);
      });
  };

  return (
    <Button
      onClick={handlerGoogleSignIn}
      className={styles.btnContainer}
      style={{ marginTop: 20 }}
    >
      <Flex row center>
        <SvgLinkedIn />
        <Text type="bodyBold" className={styles.marginLeft}>
          Sign up with Linkedin
        </Text>
      </Flex>
    </Button>
  );
};

export default LinkedinSignIn;
