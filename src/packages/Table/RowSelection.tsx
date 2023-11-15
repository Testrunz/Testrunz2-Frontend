import { memo, ReactNode } from "react";

type Props = {
  rowSelection?: Function;
  disableMultiSelect?: boolean;
  item:
    | { [key: string]: string | number | ReactNode }
    | { [key: string]: any }[];
};

const RowSelection = ({ rowSelection, disableMultiSelect, item }: Props) => {
  return (
    <>
      {typeof rowSelection === "function" && !disableMultiSelect && (
        <div
          style={
            {
              // paddingRight: 20,
              // paddingLeft: 16,
              // width: 32,
              // justifyContent: "flex-end",
              // alignItems: "center",
              // display: "flex",
              // flexDirection: "column",
            }
          }
        >
          {rowSelection(item)}
        </div>
      )}
    </>
  );
};

export default memo(
  RowSelection,
  (prevProps: Props, nextProps: Props) =>
    prevProps.rowSelection === nextProps.rowSelection
);
