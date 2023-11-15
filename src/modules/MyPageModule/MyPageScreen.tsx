import { useMemo, useState } from "react";
import Calendar from "react-calendar";
import Flex from "../../packages/Flex/Flex";
import Table from "../../packages/Table/Table";
import Text from "../../packages/Text/Text";
import styles from "./mypagescreen.module.css";
import Badge from "../../packages/Badge/Badge";
import MyPageTableHeader from "./MyPageTableHeader";
import SvgChevronLeft from "../../icons/SvgChevronLeft";
import SvgChevronRight from "../../icons/SvgChevronRight";
import SvgNoTask from "../../icons/SvgNoTask";
import { HEADER_HEIGHT } from "../../utils/constants";

export const ACTIVE_BACKING_BOARD = [
  {
    task: "Thickness of a paper by vernier calliperse",
    des: "Dept- Physics / Lab- Mechanical / ID05828ADN",
    Username: "Username",
    date: "02/05/2022",
  },
  {
    task: "Demonstrate that carbon dioxide is released during the process of respiration.",
    des: "Dept- Physics / Lab- Mechanical / ID05828ADN",
    Username: "Username",
    date: "02/05/2022",
  },
  {
    task: "Qualitative analysis for Cu, Zn, Fe, Al",
    des: "Dept- Physics / Lab- Mechanical / ID05828ADN",
    Username: "Username",
    date: "02/05/2022",
  },
];

const activeBackingBoard = () => [
  {
    title: "",
    dataIndex: "task",
    key: "task",
    flex: 5.5,
    render: (value: any, data: any) => {
      return (
        <Flex>
          <Text type="captionBold" color="shade-3">
            {data.des}
          </Text>
          <Text>{value}</Text>
        </Flex>
      );
    },
  },
  {
    title: "",
    dataIndex: "Username",
    key: "Username",
    flex: 1.5,
    Flex: 2.5,
    align: "center",
  },
  {
    title: "A",
    dataIndex: "date",
    key: "date",
    flex: 2,
    align: "center",
  },
  {
    title: "",
    dataIndex: "action",
    key: "action",
    flex: 2,
    align: "center",
    render: () => {
      return <Badge>aa</Badge>;
    },
  },
];

const MyPageScreen = () => {
  const columns = useMemo(() => activeBackingBoard(), []);
  const [selectedDates, setSelectedDates] = useState<any>([]);

  const handleDateChange = (date: any) => {
    const selectedDateIndex = selectedDates.findIndex((d: any) =>
      areDatesEqual(d, date)
    );

    if (selectedDateIndex > -1) {
      // If the date is already selected, remove it from the selection
      setSelectedDates((prevDates: any) => [
        ...prevDates.slice(0, selectedDateIndex),
        ...prevDates.slice(selectedDateIndex + 1),
      ]);
    } else {
      // If the date is not selected, add it to the selection
      setSelectedDates((prevDates: any) => [...prevDates, date]);
    }
  };

  const areDatesEqual = (dateA: any, dateB: any) =>
    dateA.getDate() === dateB.getDate() &&
    dateA.getMonth() === dateB.getMonth() &&
    dateA.getFullYear() === dateB.getFullYear();

  const mark = ["04-03-2020", "03-03-2020", "05-03-2020"];
  return (
    <Flex
      className={styles.overAll}
      height={window.innerHeight - HEADER_HEIGHT}
    >
      <Table
        isAction={false}
        pagination
        currentPage={1}
        customHeader={<MyPageTableHeader />}
        showHeader={false}
        dataSource={ACTIVE_BACKING_BOARD}
        columns={columns}
      />
      <Flex row className={styles.notificationsContainer}>
        <Flex flex={1}>
          <Table
            isAction={false}
            pagination
            currentPage={1}
            customHeader={
              <Text
                className={styles.notiHeader}
                type="bodyBold"
                color="shade-2"
              >
                Notifications
              </Text>
            }
            showHeader={false}
            dataSource={ACTIVE_BACKING_BOARD}
            columns={columns}
          />
        </Flex>
        <Flex className={styles.calendarFlex}>
          <Calendar
            prev2Label={""}
            next2Label={""}
            prevLabel={<SvgChevronLeft />}
            nextLabel={<SvgChevronRight />}
            onChange={handleDateChange}
            value={selectedDates}
            tileClassName={({ date }) =>
              selectedDates.some((d: any) => areDatesEqual(d, date))
                ? styles.selected
                : null
            }
          />
          <Flex flex={1} middle center className={styles.remainders}>
            <SvgNoTask height={70} width={70} />
            <Text type="smallBold" color="shade-3">
              No remainders found
            </Text>
          </Flex>
          {/* <div>
            Selected Dates:
            {selectedDates.map((date: any) => (
              <span key={date.toString()}>{date.toDateString()}, </span>
            ))}
          </div> */}
        </Flex>
      </Flex>
      {/* <SvgWelcomeRequester width={"100%"} />
      <SvgNoTaskCard width={"100%"} /> */}
    </Flex>
  );
};

export default MyPageScreen;
