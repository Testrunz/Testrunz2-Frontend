import SvgNewWindow from "../../icons/SvgNewWindow";
import SvgUserProfile from "../../icons/SvgUserProfile";
import Button from "../../packages/Button/Button";
import Drawer from "../../packages/Drawer/Drawer";
import Flex from "../../packages/Flex/Flex";
import Text from "../../packages/Text/Text";
import styles from "./notificationdrawer.module.css";

type Props = {
  open: boolean;
  onClose?: () => void;
};

const NotificationDrawer = ({ open, onClose }: Props) => {
  const data = [
    {
      title: "Tester A had submitted the assigned task ID05828ADN.",
      des: "Thickness of a paper by vernier calliperse.",
      date: "2h ago",
    },
    {
      title: "Tester A had submitted the assigned task ID05828ADN.",
      des: "Thickness of a paper by vernier calliperse.",
      date: "2h ago",
    },
    {
      title: "Tester A had submitted the assigned task ID05828ADN.",
      des: "Thickness of a paper by vernier calliperse.",
      date: "2h ago",
    },
    {
      title: "Tester A had submitted the assigned task ID05828ADN.",
      des: "Thickness of a paper by vernier calliperse.",
      date: "2h ago",
    },
    {
      title: "Tester A had submitted the assigned task ID05828ADN.",
      des: "Thickness of a paper by vernier calliperse.",
      date: "2h ago",
    },
  ];
  return (
    <Drawer open={open} onClose={onClose}>
      <Flex>
        <Flex row between center className={styles.header}>
          <Text>Notifications</Text>
          <Flex row center>
            <Button types="link">
              <Text size={16} className={styles.markTitle} color="shade-2">
                Mark all as read
              </Text>
            </Button>
            <Button types="link" style={{ marginLeft: 16 }}>
              <SvgNewWindow />
            </Button>
          </Flex>
        </Flex>
        {data.map((list, index) => {
          return (
            <Flex row center key={index.toString()} className={styles.listRow}>
              <SvgUserProfile height={36} width={36} />
              <Flex flex={10} className={styles.title}>
                <Text type="bodyBold">{list.title}</Text>
                <Text color="shade-2" type="captionBold">
                  {list.des}
                </Text>
              </Flex>
              <Text color="shade-2" type="captionBold">
                {list.date}
              </Text>
            </Flex>
          );
        })}
      </Flex>
    </Drawer>
  );
};

export default NotificationDrawer;
