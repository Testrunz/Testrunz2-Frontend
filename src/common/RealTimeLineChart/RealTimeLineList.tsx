import React, { useEffect, useState } from "react";
import { FieldArray, FormikProps } from "formik";
import { Line } from "react-chartjs-2";
import Flex from "../../packages/Flex/Flex";
import styles from "../../common/LineChart/linechartslist.module.css";
import Button from "../../packages/Button/Button";
import LableWithIcon from "../LableWithIcon";
import Text from "../../packages/Text/Text";
import SelectTag from "../../packages/SelectTag/SelectTag";
import { URL_WEB_SOCKET } from "../../utils/constants";
import store from "../../redux/store";
import RealTimeYaxios from "./RealTimeYaxios";
import { lineScaleData, staticData } from "./mock";
import { setDataValuesToEmpty } from "./RealTimeChart";
import { chartPostMiddleWare } from "../../modules/RunzModule/store/runzMiddleware";

const RealTimeLineList = ({
  formik,
  mainIndex,
  list,
  originalData,
  mainFormikHelpers,
  getRunzId,
  getTableList,
}: {
  formik: FormikProps<any>;
  mainIndex: any;
  list: any;
  originalData: any;
  mainFormikHelpers: any;
  getRunzId: any;
  getTableList: any;
}) => {
  const [isTable, setTable] = useState<any>(list);
  const [socket, setSocket] = useState<any>(null);
  const [isConnected, setIsConnected] = useState(false);

  const handleSelectTable = (event: any) => {
    setTable(event);
    const filterData = originalData.filter(
      (list: any) => list.label === event.value
    );
    mainFormikHelpers.replace(mainIndex, filterData[0]);
    const updatedChartData: any = [...formik.values.lineData];
    const resultLine = staticData.map((_list, index) => {
      return {
        label: "",
        data: [],
        borderColor: "#000000",
        backgroundColor: "#000000",
        yAxisID: `y${index + 1}`,
      };
    });
    updatedChartData[mainIndex] = resultLine;
    formik.setFieldValue("lineData", updatedChartData);
  };

  function findNotMatchingData(arr1: any, arr2: any) {
    const notMatchingData = [];

    for (const item1 of arr1) {
      let isMatching = false;
      for (const item2 of arr2) {
        if (item1.value === item2.value && item1.label === item2.label) {
          isMatching = true;
          break;
        }
      }
      if (!isMatching) {
        notMatchingData.push(item1);
      }
    }

    for (const item2 of arr2) {
      let isMatching = false;
      for (const item1 of arr1) {
        if (item2.value === item1.value && item2.label === item1.label) {
          isMatching = true;
          break;
        }
      }
      if (!isMatching) {
        notMatchingData.push(item2);
      }
    }
    return notMatchingData;
  }

  const notMatchingData = findNotMatchingData(formik.values.data, getTableList);

  const handleAddChart = () => {
    let addChartData: any = formik.values.data;
    addChartData = addChartData.concat(originalData[mainIndex + 1]);
    let addChartLineData: any = formik.values.lineData;
    const resultLine = staticData.map((_list) => {
      return {
        label: "",
        data: [],
        borderColor: "#000000",
        backgroundColor: "#000000",
        yAxisID: `y1`,
      };
    });
    addChartLineData = addChartLineData.concat([resultLine]);
    let addChartLineScaleData: any = formik.values.lineScaleData;
    addChartLineScaleData = addChartLineScaleData.concat([lineScaleData]);
    formik.setFieldValue("data", setDataValuesToEmpty(addChartData));
    formik.setFieldValue("lineData", addChartLineData);
    formik.setFieldValue("lineScaleData", addChartLineScaleData);
  };

  const handleDeleteChart = () => {
    let addChartData: any = formik.values.data;
    addChartData?.pop();

    let addChartLineData: any = formik.values.lineData;
    addChartLineData?.pop();
    let addChartLineScaleData: any = formik.values.lineScaleData;
    addChartLineScaleData?.pop();
    formik.setFieldValue("data", addChartData);
    formik.setFieldValue("lineData", addChartLineData);
    formik.setFieldValue("lineScaleData", addChartLineScaleData);
  };

  const connectWebSocket = () => {
    setIsConnected(true);

    let newSocket = new WebSocket(URL_WEB_SOCKET);
    newSocket.onopen = () => {
      newSocket.send(JSON.stringify({ type: "start" }));
    };
    const updatedConfigs = formik.values.lineScaleData.map(
      (config: any, indexConf: any) => {
        if (indexConf === mainIndex) {
          return {
            ...config,
            x: {
              title: {
                display: false,
                text: "X-axis",
              },
              type: "realtime",
              realtime: {
                delay: 20000,
                onRefresh: (charts: any) => {
                  newSocket.onmessage = (event: any) => {
                    const newCharts = JSON.parse(event?.data);
                    charts.data.datasets.forEach((dataset: any) => {
                      if (dataset.label && dataset.label === newCharts?.title) {
                        dataset.data.push({
                          x: newCharts?._time,
                          y: newCharts?._value,
                        });
                      }
                    });
                  };
                },
              },
            },
          };
        }
        return config;
      }
    );
    formik.setFieldValue("lineScaleData", updatedConfigs);
    setSocket(newSocket);
  };

  const disconnectWebSocket = () => {
    if (socket) {
      // const updatedConfigs = formik.values.lineScaleData.map(
      //   (config: any, indexConf: any) => {
      //     if (indexConf === mainIndex) {
      //       return {
      //         ...config,
      //         x: {
      //           title: {
      //             display: false,
      //             text: "X-axis",
      //           },
      //         },
      //       };
      //     }
      //     return config;
      //   }
      // );
      // formik.setFieldValue("lineScaleData", updatedConfigs);
      socket.send(JSON.stringify({ type: "stop" }));
      setIsConnected(false);
      socket.close();
      setSocket(null);
    }
  };

  const filterHeader = formik.values?.data[mainIndex]?.data.map(
    (list: any) => list.label
  );

  const options: any = {
    animation: {
      duration: 0,
      easing: "linear",
    },
    responsive: true,
    interaction: {
      mode: "index" as const,
      intersect: false,
    },
    plugins: {
      title: {
        display: false,
        text: "",
      },
      legend: {
        display: false,
      },
    },
    scales: formik.values.lineScaleData[mainIndex],
  };

  return (
    <>
      <Flex>
        <Flex marginBottom={20} row center between className={styles.titleFlex}>
          <SelectTag
            value={isTable}
            onChange={handleSelectTable}
            options={notMatchingData}
            placeholder="Select"
            label="Table Name"
          />
          {mainIndex === 0 && originalData?.length > 1 && (
            <Flex row>
              <Button
                style={{ marginRight: 16 }}
                disabled={formik.values.data.length === 1}
                onClick={handleDeleteChart}
                height="small"
                className={styles.addBtn}
                types="tertiary"
              >
                <LableWithIcon
                  label="Delete"
                  actionLeft={() => <Text size={20}>-</Text>}
                />
              </Button>
              <Button
                disabled={originalData?.length === formik.values.data.length}
                onClick={handleAddChart}
                height="small"
                className={styles.addBtn}
                types="tertiary"
              >
                <LableWithIcon
                  label="Add"
                  actionLeft={() => <Text size={20}>+</Text>}
                />
              </Button>
            </Flex>
          )}
        </Flex>
      </Flex>
      <Flex row>
        <Flex flex={9}>
          <Line
            redraw
            data={{
              datasets: formik.values.lineData[mainIndex],
            }}
            options={options}
          />
          {formik.values.data?.length - 1 === mainIndex && (
            <Flex row center middle marginTop={30} paddingBottom={60}>
              <Button
                disabled={isConnected}
                onClick={() => {
                  store
                    .dispatch(
                      chartPostMiddleWare({
                        runzId: getRunzId,
                        values: filterHeader,
                      })
                    )
                    .then((res) => {
                      if (res.payload) {
                        connectWebSocket();
                      } else {
                        setIsConnected(false);
                      }
                    })
                    .catch(() => {
                      setIsConnected(false);
                    });
                }}
                style={{
                  marginRight: 16,
                }}
              >
                Start
              </Button>
              <Button
                disabled={!isConnected}
                types="tertiary"
                onClick={disconnectWebSocket}
              >
                Stop
              </Button>
            </Flex>
          )}
        </Flex>
        <Flex
          height={window.innerHeight - 201}
          flex={3}
          start
          between
          className={styles.yAxiosContainer}
        >
          <FieldArray
            name="lineData"
            render={() => {
              return (
                <>
                  <Flex row end className={styles.yAxiosBtn}>
                    <Button
                      disabled={formik.values.lineData[mainIndex]?.length === 4}
                      types="tertiary"
                      className={styles.btnDelete}
                      textSize={20}
                      onClick={() => {
                        const addYaxios: any = [...formik.values.lineData];
                        if (addYaxios[mainIndex]?.length > 0) {
                          addYaxios[mainIndex].pop();
                          formik.setFieldValue(`lineData`, addYaxios);
                        }
                      }}
                    >
                      -
                    </Button>
                    <Button
                      types="tertiary"
                      style={{ marginLeft: 16 }}
                      className={styles.btnDelete}
                      textSize={20}
                      onClick={() => {
                        const addYaxios: any = [...formik.values.lineData];
                        addYaxios[mainIndex].push({
                          backgroundColor: "#000000",
                          borderColor: "#000000",
                          data: [],
                          label: "",
                          yAxisID: "y1",
                        });
                        formik.setFieldValue(`lineData`, addYaxios);
                      }}
                    >
                      +
                    </Button>
                  </Flex>
                  {Array.isArray(formik.values?.lineData) &&
                    formik.values?.lineData.length > 0 &&
                    formik.values?.lineData[mainIndex]?.map(
                      (dataSetList: any, dataSetIndex: number) => {
                        return (
                          <RealTimeYaxios
                            mainIndex={mainIndex}
                            dataSetIndex={dataSetIndex}
                            list={list}
                            formik={formik}
                            dataSetList={dataSetList}
                          />
                        );
                      }
                    )}
                </>
              );
            }}
          />
        </Flex>
      </Flex>
    </>
  );
};

export default React.memo(RealTimeLineList);
