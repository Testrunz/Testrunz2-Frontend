import { useState } from "react";
import styles from "./accordian.module.css"; // Import the CSS file for styling
import Flex from "../Flex/Flex";
import Text from "../Text/Text";
import SvgArrowDown from "../../icons/SvgArrowDown";
import SvgArrowUp from "../../icons/SvgArrowUp";

const Accordion = ({ title, children }: { title: string; children: any }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={styles.accordion}>
      <div onClick={handleToggle} className={styles.overallAccordian}>
        <Flex row between className={styles.accordianHeads}>
          <Flex column>
            <div className={styles.accordianInnerHead}>
              <Text size={16}>{title}</Text>
            </div>
          </Flex>

          <Flex column className={styles.alingCenter}>
            <div className={styles.accordianInnerHead}>
              {!isOpen && <SvgArrowDown />}
              {isOpen && <SvgArrowUp />}
            </div>
          </Flex>
        </Flex>
      </div>
      {isOpen && <div>{children}</div>}
    </div>
  );
};

export default Accordion;
