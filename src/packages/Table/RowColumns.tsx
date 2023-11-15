import { memo, ReactNode } from "react";
import classNames from "classnames/bind";
import Flex from "../Flex/Flex";
import RowText from "./RowText";
import styles from "./rowcolumns.module.css";
import { isEmpty } from "../../utils/validators";
import Button from "../Button/Button";

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
  align?: string;
  rowOnClick?: (a: any) => void;
}

type Props = {
  columns: ColumnItem[];
  item: { [key: string]: string | number | ReactNode };
  rowIndex: number;
  scrollHeight?: number;
};
const RowColumns = ({ columns, item, rowIndex, scrollHeight }: Props) => {
  return (
    <>
      {columns.map((column, columnIndex) => {
        const { dataIndex, flex, render, ...columnRestData } = column;
        const columnFlex = flex || 1;
        const columnData = !isEmpty(dataIndex) ? item[dataIndex] : "";
        const center = columnRestData.align === "center" ? true : false;

        return typeof column?.rowOnClick === "function" ? (
          <div
            className={cx({
              rowPadding: !scrollHeight,
              rowPaddingOne: scrollHeight,
            })}
            key={column.dataIndex}
            style={{
              flex: columnFlex,
              display: "flex",
              flexDirection: "column",
            }}
            onClick={() => {
              if (column && column?.rowOnClick) {
                column.rowOnClick(item);
              }
            }}
          >
            {typeof render === "function" ? (
              <Flex>{render(columnData, item, rowIndex, columnIndex)}</Flex>
            ) : (
              <RowText center={center} columnData={columnData} />
            )}
          </div>
        ) : (
          <Flex
            key={column.dataIndex}
            flex={columnFlex}
            className={cx({
              rowPadding: !scrollHeight,
              rowPaddingOne: scrollHeight,
            })}
          >
            {typeof render === "function" ? (
              <Flex>{render(columnData, item, rowIndex, columnIndex)}</Flex>
            ) : (
              <RowText center={center} columnData={columnData} />
            )}
          </Flex>
        );
      })}
    </>
  );
};

export default memo(
  RowColumns,
  (prevProps: Props, nextProps: Props) =>
    prevProps.columns === nextProps.columns
);
