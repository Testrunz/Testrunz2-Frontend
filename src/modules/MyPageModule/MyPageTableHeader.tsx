import Flex from "../../packages/Flex/Flex";
import Text from "../../packages/Text/Text";
import styles from "./mypagetableheader.module.css";

const MyPageTableHeader = () => {
  return (
    <Flex row center between className={styles.container}>
      <Text type="bodyBold" color="shade-2">
        Current tasks
      </Text>
      <Flex row center>
        <Text type="bodyBold" color="shade-2">
          All tasks
        </Text>
        <Text type="bodyBold" color="shade-2" className={styles.newTask}>
          New tasks
        </Text>
        <Text type="bodyBold" color="shade-2">
          Submitted
        </Text>
        <Text className={styles.due} type="bodyBold" color="shade-2">
          Due
        </Text>
      </Flex>
    </Flex>
  );
};

export default MyPageTableHeader;
