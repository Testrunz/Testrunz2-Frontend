import classNames from "classnames/bind";
import { memo, ReactNode } from "react";
import Flex from "../Flex/Flex";
import Text from "../Text/Text";
import { textColorsType } from "../Text/textTypes";
import styles from "./titlecolumns.module.css";

const cx = classNames.bind(styles);

export interface Item {
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
  align?: "center";
}

type DefaultTitleProps = {
  columns: Item[];
};

const defaultTitleProps: DefaultTitleProps = {
  columns: [],
};

const TitleColumns = ({ columns }: DefaultTitleProps) => {
  return (
    <>
      {columns.map((column) => {
        const { renderFilter, renderTitle, ...columnRestData } = column;
        const flex = columnRestData.flex ? columnRestData.flex : 1;
        const center = columnRestData.align === "center" ? true : false;
        return (
          <Flex
            row
            center
            start
            flex={flex}
            key={column.dataIndex}
            className={cx("titleTextStyle")}
            middle={center}
          >
            {renderTitle ? (
              renderTitle(column.title as string)
            ) : (
              <Text type="bodyBold">{column.title as string}</Text>
            )}
            {typeof renderFilter === "function" && renderFilter(columnRestData)}
          </Flex>
        );
      })}
    </>
  );
};

TitleColumns.defaultTitleProps = defaultTitleProps;

export default memo(
  TitleColumns,
  (prevProps: DefaultTitleProps, nextProps: DefaultTitleProps) =>
    prevProps.columns === nextProps.columns
);

// export default TitleColumns;
