import LableWithIcon from "../../common/LableWithIcon";
import SvgCalendar from "../../icons/SvgCalendar";
import SvgSearch from "../../icons/SvgSearch";
import SvgSort from "../../icons/SvgSort";
import Flex from "../../packages/Flex/Flex";
import InputText from "../../packages/InputText/InputText";
import SelectTag from "../../packages/SelectTag/SelectTag";
import styles from "./assetscustomheader.module.css";

export const AssetsDetailsHeader = () => {
  return (
    <Flex flex={1}>
      <LableWithIcon
        type="bodyBold"
        color="shade-3"
        label="Assets details"
        actionRight={() => <SvgSort />}
        containerClassName={styles.sortTitleFlex}
      />

      <Flex row center flex={1}>
        <div style={{ flex: 1 }}>
          <SelectTag
            options={[{ label: "ss", value: "11" }]}
            inputHeight={20}
            placeholder="Asset ID"
          />
        </div>

        <div className={styles.inputMargin}>
          <SelectTag
            options={[{ label: "ss", value: "11" }]}
            inputHeight={35}
            placeholder="Department"
          />
        </div>
        <div style={{ flex: 1 }}>
          <SelectTag
            options={[{ label: "ss", value: "11" }]}
            inputHeight={35}
            placeholder="Lab"
          />
        </div>
        <div className={styles.inputMargin}>
          <InputText
            white
            size="small"
            placeholder="Search"
            actionRight={() => <SvgSearch height={20} width={20} />}
          />
        </div>
      </Flex>
    </Flex>
  );
};

export const AssetsCreatedOnHeader = () => {
  return (
    <Flex flex={1}>
      <LableWithIcon
        containerClassName={styles.sortTitleFlex}
        label="Purchased on"
        type="bodyBold"
        color="shade-3"
        actionRight={() => <SvgSort />}
      />

      <InputText
        white
        size="small"
        placeholder="DD/MM/YYYY"
        actionRight={() => <SvgCalendar />}
      />
    </Flex>
  );
};
export const AssetsDueDateHeader = () => {
  return (
    <Flex flex={1}>
      <LableWithIcon
        containerClassName={styles.sortTitleFlex}
        label="Last Used"
        type="bodyBold"
        color="shade-3"
        actionRight={() => <SvgSort />}
      />

      <InputText
        white
        size="small"
        placeholder="DD/MM/YYYY"
        actionRight={() => <SvgCalendar />}
      />
    </Flex>
  );
};

export const AssetsStatusHeader = () => {
  return (
    <Flex flex={1}>
      <LableWithIcon
        containerClassName={styles.sortTitleFlex}
        label="Status"
        type="bodyBold"
        color="shade-3"
        actionRight={() => <SvgSort />}
      />

      <InputText
        white
        size="small"
        placeholder="Select status"
        actionRight={() => <SvgSearch height={20} width={20} />}
      />
    </Flex>
  );
};

export const AssetsAssignedHeader = () => {
  return (
    <Flex flex={1}>
      <LableWithIcon
        containerClassName={styles.sortTitleFlex}
        label="Availability"
        type="bodyBold"
        color="shade-3"
        actionRight={() => <SvgSort />}
      />

      <InputText
        white
        size="small"
        placeholder="Select Availability"
        actionRight={() => <SvgSearch height={20} width={20} />}
      />
    </Flex>
  );
};
