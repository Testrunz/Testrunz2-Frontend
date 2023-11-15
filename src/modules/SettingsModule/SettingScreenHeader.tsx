import Flex from "../../packages/Flex/Flex";
import Text from "../../packages/Text/Text";
import styles from "./settingscreenheader.module.css";
import InputText from "../../packages/InputText/InputText";
import Button from "../../packages/Button/Button";
import SvgSearch from "../../icons/SvgSearch";

type Props = {
  title: string;
  description: string;
  isSearch?: boolean;
  onClick?: () => void;
};
const SettingScreenHeader = ({
  title,
  description,
  isSearch,
  onClick,
}: Props) => {
  return (
    <Flex row between className={styles.overAll}>
      <Flex>
        <Text color="shade-2" type="title">
          {title}
        </Text>

        <Text style={{ marginTop: 4 }} color="shade-2" type="bodyMedium">
          {description}
        </Text>
      </Flex>

      <Flex>
        {isSearch && (
          <InputText placeholder="Search" actionRight={() => <SvgSearch />} />
        )}

        {onClick && (
          <Button style={{ marginLeft: 4 }} types="primary" onClick={onClick}>
            + Add New
          </Button>
        )}
      </Flex>
    </Flex>
  );
};

export default SettingScreenHeader;
