import { Modal } from "antd";
import Text from "../packages/Text/Text";
import SvgClose from "../icons/SvgClose";
import Flex from "../packages/Flex/Flex";
import styles from "./notauthorizedmodal.module.css";
import Button from "../packages/Button/Button";
import SvgNotAuthorized from "../icons/SvgNotAuthorized";

type Props = {
  open: boolean;
  onClick: () => void;
};

const NotAuthorizedModal = ({ open, onClick }: Props) => {
  return (
    <Modal
      width={700}
      onCancel={onClick}
      title={<Text type="title">Not authorized!</Text>}
      closeIcon={<SvgClose />}
      centered
      open={open}
      footer={
        <Flex className={styles.footer}>
          <Button onClick={onClick} className={styles.yesBtn}>
            Close
          </Button>
        </Flex>
      }
    >
      <Flex center middle>
        <SvgNotAuthorized />

        <Text
          style={{ marginTop: 10 }}
          align="center"
          type="button-4"
          color="shade-3"
        >
          We are sorry to inform you!
        </Text>
        <Text
          style={{ marginTop: 20 }}
          align="center"
          type="button-1"
          color="shade-3"
        >
          You are not authorized to access this path.
        </Text>
      </Flex>
    </Modal>
  );
};

export default NotAuthorizedModal;
