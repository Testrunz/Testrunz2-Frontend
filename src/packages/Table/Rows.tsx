import { ReactNode, memo } from "react";
import classNames from "classnames/bind";
import Flex from "../Flex/Flex";
import RowColumns from "./RowColumns"; // eslint-disable-line
import styles from "./rows.module.css";
import RowSelection from "./RowSelection";

const cx = classNames.bind(styles);
export interface ColumnItem {
  title: string | ReactNode;
  dataIndex: string;
  key?: string;
  renderFilter?: Function;
  flex?: number;
  render?: (
    a: any,
    rowData: any,
    rowIndex: number,
    columnIndex: number
  ) => ReactNode;
  renderTitle?: (a: string) => ReactNode;
}

type RowsProps = {
  item: { [key: string]: string | number | ReactNode };
  columns: ColumnItem[];
  rowIndex: number;
  scrollHeight?: number;
  totalRows?: number;
  rowSelection?: Function;
  disableMultiSelect?: boolean;
  hideRowSelection: boolean;
};

const Rows = ({
  item,
  columns,
  rowIndex,
  scrollHeight,
  totalRows,
  rowSelection,
  disableMultiSelect,
  hideRowSelection,
}: RowsProps) => {
  const borderStyle = rowIndex + 1 !== totalRows;

  return (
    <Flex
      row
      center
      className={cx("rowBorder", {
        borderNone: !borderStyle,
      })}
    >
      {!hideRowSelection && (
        <RowSelection
          rowSelection={rowSelection}
          item={item}
          disableMultiSelect={disableMultiSelect}
        />
      )}

      <RowColumns
        columns={columns}
        item={item}
        rowIndex={rowIndex}
        scrollHeight={scrollHeight}
      />
    </Flex>
  );
};

export default memo(Rows);
