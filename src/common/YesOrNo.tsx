import { Modal } from "antd";
import { ReactChild } from "react";
import Text from "../packages/Text/Text";
import SvgClose from "../icons/SvgClose";
import Flex from "../packages/Flex/Flex";
import styles from "./yesorno.module.css";
import Button from "../packages/Button/Button";
import Loader from "../packages/Loader/Loader";

type Props = {
  open: boolean;
  yesClick: () => void;
  noClick: () => void;
  icon: ReactChild;
  description: ReactChild;
  title: string;
  noBtnTitle?: string;
  yesBtnTitle?: string;
  isLoader?: boolean;
};

const YesOrNo = ({
  open,
  yesClick,
  noClick,
  icon,
  description,
  title,
  noBtnTitle = "No",
  yesBtnTitle = "Yes",
  isLoader,
}: Props) => {
  return (
    <Modal
      onCancel={noClick}
      title={<Text type="title">{title}</Text>}
      closeIcon={<SvgClose />}
      centered
      open={open}
      footer={
        <Flex row center middle className={styles.footer}>
          <Button onClick={noClick} className={styles.noBtn} types="tertiary-1">
            {noBtnTitle}
          </Button>
          <Button onClick={yesClick} className={styles.yesBtn}>
            {yesBtnTitle}
          </Button>
        </Flex>
      }
    >
      <Flex center middle marginTop={20}>
        {isLoader && <Loader />}
        {icon}
        {typeof description === "string" ? (
          <Text
            align="center"
            className={styles.desText}
            type="bodyBold"
            color="shade-2"
          >
            {description}
          </Text>
        ) : (
          <Flex center middle className={styles.desText}>
            {description}
          </Flex>
        )}
      </Flex>
    </Modal>
  );
};

export default YesOrNo;
