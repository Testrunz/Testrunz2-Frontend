import { memo, ReactNode } from "react";
import classNames from "classnames/bind";
import TitleColumns from "./TitleColumns";
import styles from "./tabletitle.module.css";
import RowSelection from "./RowSelection";
import { textColorsType } from "../Text/textTypes";

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
  dataSource: { [key: string]: any }[];
  borderNone?: boolean;
  rowSelection?: Function;
  disableMultiSelect?: boolean;
};

const defaultTitleProps: DefaultTitleProps = {
  columns: [],
  dataSource: [],
};

const Title = ({
  columns,
  borderNone,
  dataSource,
  rowSelection,
  disableMultiSelect,
}: typeof defaultTitleProps) => {
  return (
    <div
      className={cx("titleContainer", {
        titleBorder: !borderNone,
        titleBorderNone: borderNone,
      })}
    >
      {/* <RowSelection
        rowSelection={rowSelection}
        disableMultiSelect={disableMultiSelect}
        item={dataSource}
      /> */}
      <TitleColumns columns={columns} />
    </div>
  );
};

Title.defaultProps = defaultTitleProps;

export default memo(Title);
