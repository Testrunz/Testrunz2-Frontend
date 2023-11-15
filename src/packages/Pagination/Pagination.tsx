import classNames from "classnames/bind";
import SvgBack from "../../icons/SvgBack";
import SvgNext from "../../icons/SvgNext";
import Button from "../Button/Button";
import Flex from "../Flex/Flex";
import styles from "./pagination.module.css";
import { gray2, textShade3 } from "../../theme/colors";
import Text from "../Text/Text";

const cx = classNames.bind(styles);

type Props = {
  maxPages: number;
  currentPage: number;
  totalPages: number;
  onPageChange: (a: any) => void;
  totalItems: number;
};
const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  maxPages,
  totalItems,
}: Props) => {
  // Calculate the range of page numbers to display
  const range = [];
  const ellipsis = "...";
  const pageSize = 10; // Number of items per page

  // Helper function to add page numbers to the range
  const addPageToRange = (page: any) => {
    range.push(
      <Button
        style={{ height: 30, padding: 0, borderRadius: 4, borderWidth: 0 }}
        textColors={currentPage === page ? "primary" : "shade-3"}
        className={cx("btnCommon", "btnMargin", {
          btnActive: currentPage === page,
          btnDeActive: currentPage !== page,
        })}
        key={page}
        onClick={() => onPageChange(page)}
      >
        {page}
      </Button>
    );
  };

  const handlePrevClick = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextClick = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  if (totalPages <= maxPages) {
    // If the total number of pages is less than or equal to the maximum, show all page numbers
    for (let i = 1; i <= totalPages; i++) {
      addPageToRange(i);
    }
  } else {
    // Show a truncated range of page numbers with an ellipsis in between
    const leftEllipsis = currentPage - 3 > 1;
    const rightEllipsis = currentPage + 3 < totalPages;

    addPageToRange(1); // Always show the first page

    if (leftEllipsis) {
      range.push(
        <Button
          style={{
            marginLeft: 4,
            height: 30,
            padding: 0,
            borderRadius: 4,
            borderWidth: 0,
          }}
          className={cx("btnCommon", "btnDeActive")}
        >
          {ellipsis}
        </Button>
      );
    }

    // Calculate the starting and ending page numbers for the range
    const startPage = Math.max(2, currentPage - 1);
    const endPage = Math.min(totalPages - 1, currentPage + 1);

    for (let i = startPage; i <= endPage; i++) {
      addPageToRange(i);
    }

    if (rightEllipsis) {
      range.push(
        <Button
          style={{
            marginLeft: 4,
            height: 30,
            padding: 0,
            borderRadius: 4,
            borderWidth: 0,
          }}
          className={cx("btnCommon", "btnDeActive")}
        >
          {ellipsis}
        </Button>
      );
    }

    addPageToRange(totalPages); // Always show the last page
  }
  const rangeStart = currentPage;
  const rangeEnd = currentPage * pageSize;

  const endItem = Math.min(currentPage * pageSize, totalItems);

  if (totalPages === 0) {
    return <></>;
  }
  return (
    <Flex row center between>
      <Flex>
        <Text type="captionBold" color="shade-3">
          Showing {rangeStart} - {endItem} out of {totalPages}
        </Text>
      </Flex>
      <Flex row center>
        <Button
          types="link"
          onClick={handlePrevClick}
          disabled={currentPage === 1}
          style={{ cursor: currentPage === 1 ? "not-allowed" : "pointer" }}
        >
          <SvgBack fill={textShade3} fillOne={gray2} />
        </Button>
        <div style={{ marginBottom: 3 }}>{range}</div>

        <Button
          style={{
            marginLeft: 4,
            cursor: currentPage === totalPages ? "not-allowed" : "pointer",
          }}
          types="link"
          onClick={handleNextClick}
          disabled={currentPage === totalPages}
        >
          <SvgNext fill={textShade3} fillOne={gray2} />
        </Button>
      </Flex>
    </Flex>
  );
};

const defaultProps = {
  maxPages: 10,
  currentPage: 0,
  totalPages: 0,
  onPageChange: () => {},
};

Pagination.defaultProps = defaultProps;

export default Pagination;
