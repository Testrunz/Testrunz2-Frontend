import { Modal } from "antd";
import styles from "./sharerunzmodal.module.css";
import Flex from "../../packages/Flex/Flex";
import Button from "../../packages/Button/Button";
import Text from "../../packages/Text/Text";
import SvgClose from "../../icons/SvgClose";
import Table from "../../packages/Table/Table";
import CheckBox from "../../packages/CheckBox/CheckBox";
import SvgUserProfile from "../../icons/SvgUserProfile";
import LableWithIcon from "../../common/LableWithIcon";
import SvgPlus from "../../icons/SvgPlus";

type Props = {
  open: boolean;
  cancelClick: () => void;
  shareOnClick: () => void;
};
const ShareRunzModal = ({ open, shareOnClick, cancelClick }: Props) => {
  const dataSource = [
    {
      eventType: "Poker",
      Username: "Organization C",
    },
    {
      eventType: "Poker",
      Username: "Organization C",
    },
    {
      eventType: "Poker",
      Username: "Organization C",
    },
    {
      eventType: "Poker",
      Username: "Organization C",
    },
    {
      eventType: "Poker",
      Username: "Organization C",
    },
  ];
  const columns = [
    {
      title: "Event Type",
      dataIndex: "eventType",
      key: "eventType",
    },
    {
      title: "Amount Backed",
      dataIndex: "Username",
      key: "Username",
      render: (value: string) => <Text align="right">{value}</Text>,
    },
  ];

  const handleSelections = () => {
    return (
      <Flex>
        <CheckBox type="black" />
      </Flex>
    );
  };
  const items = [
    { icon: <SvgUserProfile height={40} width={40} /> },
    { icon: <SvgUserProfile height={40} width={40} /> },
    { icon: <SvgUserProfile height={40} width={40} /> },
    { icon: <SvgUserProfile height={40} width={40} /> },
    { icon: <SvgUserProfile height={40} width={40} /> },
    { icon: <SvgUserProfile height={40} width={40} /> },
    { icon: <SvgUserProfile height={40} width={40} /> },
    { icon: <SvgUserProfile height={40} width={40} /> },
  ];
  return (
    <Modal
      width={700}
      onCancel={cancelClick}
      title={<Text type="title">Share runz</Text>}
      closeIcon={<SvgClose />}
      centered
      open={open}
      footer={
        <Flex row end center className={styles.footer}>
          <Button
            onClick={cancelClick}
            className={styles.cancelBtn}
            types="tertiary-1"
          >
            Cancel
          </Button>
          <Button onClick={shareOnClick} className={styles.yesBtn}>
            Share
          </Button>
        </Flex>
      }
    >
      <Flex>
        <Text
          className={styles.selectedText}
          color="shade-2"
          type="captionBold"
        >
          You have selected following runz to share
        </Text>
        <Table
          isAction={false}
          rowSelection={handleSelections}
          customHeader={
            <Flex row between className={styles.header}>
              <Text type="bodyBold" color="shade-2">
                Notifications
              </Text>
              <Text type="bodyBold" color="shade-2">
                Created by
              </Text>
            </Flex>
          }
          showHeader={false}
          dataSource={dataSource}
          columns={columns}
        />
        <Flex className={styles.shareContainer}>
          <Text color="shade-2" type="captionBold">
            Share with
          </Text>
          <Flex row center>
            <Flex row center>
              {items.slice(0, 4).map((item, index) => {
                return <Flex key={index.toString()}>{item.icon}</Flex>;
              })}
              {items.length > 4 && (
                <Text style={{ marginLeft: 4 }} type="bodyMedium">
                  +{items.length - 4}more
                </Text>
              )}
            </Flex>
            <Button types="tertiary" height="small" style={{ marginLeft: 8 }}>
              <LableWithIcon
                type="bodyMedium"
                actionLeft={() => <SvgPlus />}
                label="Add"
              />
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </Modal>
  );
};

export default ShareRunzModal;
