import { CSSProperties, ReactChild } from "react";
import styles from "./drawer.module.scss";
import classNames from "classnames/bind";
import Flex from "../Flex/Flex";

type Props = {
  open: boolean;
  onClose?: () => void;
  children: ReactChild;
  className?: CSSProperties;
};
const cx = classNames.bind(styles);

const Drawer = ({ onClose, open, children, className }: Props) => {
  return (
    <div>
      <Flex
        height={window.innerHeight}
        className={cx("drawer", { open: open, className })}
      >
        {children}
      </Flex>
      {open && <div className={styles.overlay} onClick={onClose} />}
    </div>
  );
};

export default Drawer;
