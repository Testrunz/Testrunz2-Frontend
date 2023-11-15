import classNames from "classnames/bind";
import SvgClose from "../../icons/SvgClose";
import SvgDelete from "../../icons/SvgDelete";
import SvgSearch from "../../icons/SvgSearch";
import Button from "../Button/Button";
import Flex from "../Flex/Flex";
import InputText from "../InputText/InputText";
import Text from "../Text/Text";
import styles from "./tableactions.module.css";
import RowSelection from "./RowSelection";
import LableWithIcon from "../../common/LableWithIcon";
import SvgSubmit from "../../icons/SvgSubmit";
import SvgShare from "../../icons/SvgShare";

const cx = classNames.bind(styles);

type Props = {
  hideActions?: boolean;
  actionTitle?: string;
  actionTitleBtn?: Function;
  rowUnSelectAll?: Function;
  dataSource: { [key: string]: any }[];
  rowSelection?: Function;
  disableMultiSelect?: boolean;
  closeAction?: () => void;
  rowDeleteAction?: () => void;
  rowShareAction?: () => void;
  rowSubmitAction?: () => void;
  searchOnChange?: (a: any) => void;
  searchValue?: string;
};

const TableActions = ({
  hideActions,
  actionTitle,
  actionTitleBtn,
  dataSource,
  rowSelection,
  disableMultiSelect,
  rowUnSelectAll,
  closeAction,
  rowDeleteAction,
  rowShareAction,
  rowSubmitAction,
  searchOnChange,
  searchValue,
}: Props) => {
  return (
    <Flex>
      <Flex row between center className={styles.titleContainer}>
        <Text type="title" color="shade-2">
          {actionTitle}
        </Text>
        {typeof actionTitleBtn === "function" && <>{actionTitleBtn()}</>}
      </Flex>
      <Flex between className={styles.actionHeight}>
        <Flex row center between>
          <Flex row center className={cx({ hideActions })}>
            {typeof closeAction === "function" && (
              <Button onClick={closeAction} className={styles.closeAction}>
                <LableWithIcon
                  color="error"
                  type="captionBold"
                  label="Close actions"
                  actionLeft={() => <SvgClose />}
                />
              </Button>
            )}
            {typeof rowSelection === "function" && (
              <div className={styles.actionMargin}>
                <RowSelection
                  rowSelection={rowSelection}
                  disableMultiSelect={disableMultiSelect}
                  item={dataSource}
                />
              </div>
            )}
            {typeof rowUnSelectAll === "function" && (
              <div className={styles.actionMargin}>
                <RowSelection
                  rowSelection={rowUnSelectAll}
                  disableMultiSelect={disableMultiSelect}
                  item={dataSource}
                />
              </div>
            )}
            {typeof rowDeleteAction === "function" && (
              <Button
                onClick={rowDeleteAction}
                types="link"
                className={styles.actionMargin}
              >
                <LableWithIcon
                  type={"captionBold"}
                  color="shade-2"
                  label="Delete"
                  actionLeft={() => <SvgDelete />}
                />
              </Button>
            )}
            {typeof rowSubmitAction === "function" && (
              <Button
                onClick={rowSubmitAction}
                types="link"
                className={styles.actionMargin}
              >
                <LableWithIcon
                  type={"captionBold"}
                  color="shade-2"
                  label="Assign"
                  actionLeft={() => <SvgSubmit />}
                />
              </Button>
            )}
            {typeof rowShareAction === "function" && (
              <Button
                onClick={rowShareAction}
                types="link"
                className={styles.actionMargin}
              >
                <LableWithIcon
                  type={"captionBold"}
                  color="shade-2"
                  label="Share"
                  actionLeft={() => <SvgShare />}
                />
              </Button>
            )}
          </Flex>
          {hideActions && <div />}
          {typeof searchOnChange === "function" && (
            <InputText
              value={searchValue}
              onChange={searchOnChange}
              white
              placeholder="Search"
              actionRight={() => <SvgSearch />}
            />
          )}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default TableActions;
