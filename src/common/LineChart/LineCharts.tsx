import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { FieldArray, FormikProvider, useFormik } from "formik";
import { useEffect } from "react";
import LineChartsList from "./LineChartsList";
import { lineScaleData, staticData } from "./mock";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import React from "react";

ChartJS.register(
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
  xAxios: { label: string; values: any[] }[];
  lineScaleData: any[];
};

const initialValues: formType = {
  data: [],
  lineData: [],
  xAxios: [],
  lineScaleData: [],
};

type Props = {
  getRunzId: any;
};
const LineCharts = ({ getRunzId }: Props) => {
  const { runzData } = useSelector(
    ({ getRunzListDetailsReducers }: RootState) => {
      return {
        runzData: getRunzListDetailsReducers.data,
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
      formik.setFieldValue("data", [runzData?.experiment?.table[0]]);
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

  return (
    <div>
      <FormikProvider value={formik}>
        <FieldArray
          name="data"
          render={(mainFormikHelpers) => {
            return formik.values?.data?.map((list: any, index: any) => {
              return (
                <LineChartsList
                  originalData={runzData?.experiment?.table}
                  getTableList={getTableList}
                  formik={formik}
                  index={index}
                  list={list}
                  mainFormikHelpers={mainFormikHelpers}
                />
              );
            });
          }}
        />
      </FormikProvider>
    </div>
  );
};

export default React.memo(LineCharts);
