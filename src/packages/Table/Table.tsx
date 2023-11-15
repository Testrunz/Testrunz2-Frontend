import classNames from "classnames/bind";
import { ReactChild } from "react";
import Flex from "../Flex/Flex";
import Text from "../Text/Text";
import Pagination from "../Pagination/Pagination";
import styles from "./table.module.css";
import TableActions from "./TableActions";
import Rows, { ColumnItem } from "./Rows";
import TableTitle from "./TableTitle";

const cx = classNames.bind(styles);

export type tableColors = "white" | "theme";

type DefaultProps = {
  columns: ColumnItem[];
  dataSource: { [key: string]: any }[];
  rowPointer?: boolean;
  showHeader?: boolean;
  itemsPerPage?: number;
  onPageChange: (a: any) => void;
  isAction?: boolean;
  hideRowSelection: boolean;
};

const defaultProps: DefaultProps = {
  columns: [],
  dataSource: [],
  showHeader: true,
  itemsPerPage: 10,
  onPageChange: () => {},
  isAction: true,
  hideRowSelection: false,
};

type Props = {
  scrollHeight?: number;
  rowSelection?: Function;
  rowSelectionAll?: Function;
  disableMultiSelect?: boolean;
  fixedHeight?: number | string;
  customHeader?: ReactChild;
  actionTitle?: string;
  actionTitleBtn?: Function;
  hideActions?: boolean;
  currentPage?: number;
  rowUnSelectAll?: Function;
  closeAction?: () => void;
  rowDeleteAction?: () => void;
  rowShareAction?: () => void;
  rowSubmitAction?: () => void;
  pagination?: boolean;
  searchOnChange?: (a: any) => void;
  searchValue?: string;
} & typeof defaultProps;

const Table = ({
  dataSource,
  columns,
  scrollHeight,
  rowPointer,
  rowSelection,
  disableMultiSelect,
  fixedHeight,
  showHeader,
  customHeader,
  actionTitleBtn,
  actionTitle,
  hideActions,
  currentPage,
  onPageChange,
  itemsPerPage,
  rowSelectionAll,
  rowUnSelectAll,
  closeAction,
  rowDeleteAction,
  rowShareAction,
  rowSubmitAction,
  pagination,
  isAction,
  hideRowSelection,
  searchOnChange,
  searchValue,
}: Props) => {
  const totalRows = dataSource.length;

  // Calculate the starting and ending indices for the current page
  const indexOfLastItem = Number(currentPage) * Number(itemsPerPage);
  const indexOfFirstItem = indexOfLastItem - Number(itemsPerPage);

  // Slice the array of items to display only the items for the current page
  const currentItems = dataSource.slice(indexOfFirstItem, indexOfLastItem);

  // Calculate the number of pages
  const totalPages = Math.ceil(totalRows / Number(itemsPerPage));

  const finalData = pagination ? currentItems : dataSource;
  return (
    <Flex className={styles.overAllContainer}>
      {isAction && (
        <TableActions
          actionTitle={actionTitle}
          actionTitleBtn={actionTitleBtn}
          hideActions={hideActions}
          dataSource={finalData}
          disableMultiSelect={disableMultiSelect}
          rowSelection={rowSelectionAll}
          rowUnSelectAll={rowUnSelectAll}
          closeAction={closeAction}
          rowDeleteAction={rowDeleteAction}
          rowShareAction={rowShareAction}
          rowSubmitAction={rowSubmitAction}
          searchOnChange={searchOnChange}
          searchValue={searchValue}
        />
      )}
      {customHeader && (
        <Flex className={cx("headerContainer")}>{customHeader}</Flex>
      )}
      <Flex className={cx("overAll")}>
        {showHeader && (
          <TableTitle
            rowSelection={rowSelection}
            columns={columns}
            dataSource={finalData}
            disableMultiSelect={disableMultiSelect}
          />
        )}

        <div
          style={{
            height: fixedHeight ? fixedHeight : "100%",
          }}
          className={cx({ rowScroll: scrollHeight || fixedHeight })}
        >
          {finalData.length ? (
            finalData.map((item, index) => (
              <div
                key={index}
                className={cx("rowHover", {
                  rowPointer: rowPointer,
                })}
              >
                <Rows
                  key={index}
                  item={item}
                  columns={columns}
                  rowIndex={index}
                  scrollHeight={scrollHeight}
                  totalRows={totalRows}
                  rowSelection={rowSelection}
                  disableMultiSelect={disableMultiSelect}
                  hideRowSelection={hideRowSelection}
                />
              </div>
            ))
          ) : (
            <Flex center height={200} middle>
              <Text color="shade-3">No Records to display!!</Text>
            </Flex>
          )}
        </div>
        {pagination && (
          <div className={styles.pagination}>
            <Pagination
              totalItems={totalRows}
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={onPageChange}
              maxPages={itemsPerPage}
            />
          </div>
        )}
      </Flex>
    </Flex>
  );
};

Table.defaultProps = defaultProps;

export default Table;
