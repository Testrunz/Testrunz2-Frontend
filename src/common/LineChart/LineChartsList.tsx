import { Line } from "react-chartjs-2";
import React, { useEffect, useRef, useState } from "react";
import { FieldArray, FieldArrayRenderProps, FormikProps } from "formik";
import Flex from "../../packages/Flex/Flex";
import Button from "../../packages/Button/Button";
import LableWithIcon from "../LableWithIcon";
import styles from "./linechartslist.module.css";
import Text from "../../packages/Text/Text";
import { formType } from "./LineCharts";
import SelectTag from "../../packages/SelectTag/SelectTag";
import Yaxios from "./Yaxios";
import { lineScaleData, staticData } from "./mock";
import { LabelColorInput } from "./LabelColorInput";

type Props = {
  list: any;
  index: number;
  formik: FormikProps<formType>;
  getTableList: any;
  originalData: any;
  mainFormikHelpers: FieldArrayRenderProps;
};

const LineChartsList = ({
  list,
  index,
  formik,
  getTableList,
  originalData,
  mainFormikHelpers,
}: Props) => {
  const [isTable, setTable] = useState<any>(list);

  const handleAddChart = () => {
    let addChartData: any = formik.values.data;
    addChartData = addChartData.concat(originalData[index + 1]);

    let addChartLineData: any = formik.values.lineData;
    const resultLine = staticData.map((list, index) => {
      return {
        label: "",
        data: [],
        borderColor: list?.borderColor,
        backgroundColor: list?.borderColor,
        yAxisID: `y1`,
      };
    });
    addChartLineData = addChartLineData.concat([resultLine]);

    let addChartLineScaleData: any = formik.values.lineScaleData;
    addChartLineScaleData = addChartLineScaleData.concat([lineScaleData]);

    formik.setFieldValue("data", addChartData);
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

  const handleSelectTable = (event: any) => {
    setTable(event);
    const filterData = originalData.filter(
      (list: any) => list.label === event.value
    );
    mainFormikHelpers.replace(index, filterData[0]);
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
    updatedChartData[index] = resultLine;
    formik.setFieldValue("lineData", updatedChartData);
  };

  useEffect(() => {
    if (formik.values.xAxios[index] === undefined) {
      const updatedxAxios: any = [...formik.values.xAxios];
      updatedxAxios[index] = formik?.values?.data[index]?.data[0];
      formik.setFieldValue("xAxios", updatedxAxios);
    }
  }, [formik.values.xAxios]);

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
    stacked: false,
    plugins: {
      title: {
        display: false,
        text: "",
      },
      legend: {
        display: false,
      },
    },
    scales: formik.values.lineScaleData[index],
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

  return (
    <Flex>
      <Flex marginBottom={20} row center between className={styles.titleFlex}>
        <SelectTag
          value={isTable}
          onChange={handleSelectTable}
          options={notMatchingData}
          placeholder="Select"
          label="Table Name"
        />
        {index === 0 && originalData?.length > 1 && (
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
      <Flex row>
        <div style={{ flex: 9 }}>
          <Flex>
            <Line
              redraw
              options={options}
              data={{
                labels: formik.values.xAxios[index]
                  ? formik.values.xAxios[index].values
                  : [1, 2, 3, 4, 5, 6, 7, 8, 9],
                datasets: formik.values.lineData[index],
              }}
            />
            <Text align="center">{formik.values.xAxios[index]?.label}</Text>
          </Flex>

          <FieldArray
            name="xAxios"
            render={(xAxiosFormikHelpers) => {
              return (
                <div
                  style={{
                    alignItems: "center",
                    display: "flex",
                    justifyContent: "center",
                    marginTop: 20,
                    paddingBottom: 30,
                  }}
                >
                  <div
                    style={{
                      width: 200,
                    }}
                  >
                    <LabelColorInput
                      isY={false}
                      title={"X"}
                      getOptionValue={(option: any) => option.values}
                      value={
                        formik.values.xAxios[index]
                          ? formik.values.xAxios[index]
                          : ""
                      }
                      options={formik.values.data[index].data}
                      onChange={(event) => {
                        xAxiosFormikHelpers.replace(index, event);
                      }}
                      isColor={false}
                    />
                  </div>
                </div>
              );
            }}
          />
        </div>
        <Flex
          height={window.innerHeight - 201}
          flex={3}
          row
          start
          between
          className={styles.yAxiosContainer}
        >
          <Flex>
            <FieldArray
              name="lineData"
              render={() => {
                return (
                  <>
                    <Flex row end className={styles.yAxiosBtn}>
                      <Button
                        disabled={formik.values.lineData[index]?.length === 4}
                        types="tertiary"
                        className={styles.btnDelete}
                        textSize={20}
                        onClick={() => {
                          const addYaxios: any = [...formik.values.lineData];
                          if (addYaxios[index]?.length > 0) {
                            addYaxios[index].pop();
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
                          addYaxios[index].push({
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
                      formik.values?.lineData[index]?.map(
                        (dataSetList: any, dataSetIndex: number) => {
                          return (
                            <Yaxios
                              mainIndex={index}
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
      </Flex>
    </Flex>
  );
};

export default React.memo(LineChartsList);
