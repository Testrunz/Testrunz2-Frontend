import React from "react";
import {
  Chart,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import StreamingPlugin from "chartjs-plugin-streaming";
import "chartjs-adapter-luxon";
import { FieldArray, FormikProvider, useFormik } from "formik";
import { useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import Loader from "../../packages/Loader/Loader";
import RealTimeLineChart from "./RealTimeLineList";
import { lineScaleData, staticData } from "./mock";

Chart.register(
  StreamingPlugin,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export type formType = {
  data: any[];
  lineData: any[];
  lineScaleData: any[];
};

const initialValues: formType = {
  data: [],
  lineData: [],
  lineScaleData: [],
};

const deepCopy = (obj: any) => {
  return JSON.parse(JSON.stringify(obj));
};
export const setDataValuesToEmpty = (data: any) => {
  const copiedData = deepCopy(data);
  copiedData.forEach((item: any) => {
    item.data.forEach((subItem: any) => {
      subItem.values = [];
    });
  });
  return copiedData;
};

type Props = {
  getRunzId: any;
};

const RealTimeChart = ({ getRunzId }: Props) => {
  const { runzData, isLoading } = useSelector(
    ({ getRunzListDetailsReducers, chartPostReducers }: RootState) => {
      return {
        runzData: getRunzListDetailsReducers.data,
        isLoading: chartPostReducers.isLoading,
      };
    }
  );

  const formik = useFormik({
    initialValues,
    onSubmit: () => {},
  });

  useEffect(() => {
    if (
      Array.isArray(runzData?.experiment?.table) &&
      runzData?.experiment?.table?.length > 0
    ) {
      formik.setFieldValue(
        "data",
        setDataValuesToEmpty([runzData?.experiment?.table[0]])
      );
      formik.setFieldValue("lineData", [staticData]);
      formik.setFieldValue("lineScaleData", [lineScaleData]);
    } else {
      formik.setFieldValue("data", []);
      formik.setFieldValue("lineData", [staticData]);
      formik.setFieldValue("lineScaleData", [lineScaleData]);
    }
  }, [runzData?.experiment?.table]);

  const getTableList = runzData?.experiment?.table?.map((list) => {
    return {
      value: list.value,
      label: list.label,
    };
  });

  const listData = useMemo(() => {
    return formik.values?.data;
  }, [formik.values?.data]);

  return (
    <>
      {isLoading && <Loader />}
      <FormikProvider value={formik}>
        <FieldArray
          name="data"
          render={(mainFormikHelpers) => {
            return listData?.map((list: any, index: any) => {
              return (
                <RealTimeLineChart
                  getRunzId={getRunzId}
                  originalData={runzData?.experiment?.table}
                  getTableList={getTableList}
                  formik={formik}
                  mainIndex={index}
                  list={list}
                  mainFormikHelpers={mainFormikHelpers}
                />
              );
            });
          }}
        />
      </FormikProvider>
    </>
  );
};

export default React.memo(RealTimeChart);
