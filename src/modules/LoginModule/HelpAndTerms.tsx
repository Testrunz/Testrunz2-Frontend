import SvgInfo from "../../icons/SvgInfo";
import Flex from "../../packages/Flex/Flex";
import Text from "../../packages/Text/Text";
import styles from "./helpandterms.module.css";

const HelpAndTerms = () => {
  return (
    <Flex between row center>
      <Flex row center>
        <SvgInfo />
        <Text color="shade-2" className={styles.chooseLang}>
          English (United states)
        </Text>
      </Flex>

      <Flex row center>
        <Text color="shade-2">Help</Text>
        <Text color="shade-2" className={styles.terms}>
          Terms
        </Text>
        <Text color="shade-2">Privacy</Text>
      </Flex>
    </Flex>
  );
};

export default HelpAndTerms;
