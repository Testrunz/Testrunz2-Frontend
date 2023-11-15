import { FormikProps } from "formik";
import { formType } from "./LineCharts";
import { LabelColorInput } from "./LabelColorInput";

type Props = {
  dataSetIndex: any;
  list: any;
  formik: FormikProps<formType>;
  dataSetList: any;
  mainIndex: number;
};

const Yaxios = ({
  dataSetIndex,
  list,
  formik,
  dataSetList,
  mainIndex,
}: Props) => {
  let values: any = "";
  if (formik.values?.lineData[mainIndex][dataSetIndex]) {
    values = {
      label: formik.values?.lineData[mainIndex][dataSetIndex]?.label,
      value: formik.values?.lineData[mainIndex][dataSetIndex]?.label,
    };
  } else {
    values = "";
  }

  return (
    <div style={{ marginBottom: 8, flex: 1, width: 300 }}>
      <LabelColorInput
        valueY={dataSetList}
        onChangeY={(event) => {
          const updatedChartData: any = [...formik.values.lineData];

          updatedChartData[mainIndex][dataSetIndex].yAxisID = event.yAxisID;
          formik.setFieldValue("lineData", updatedChartData);
        }}
        value={values}
        options={list?.data}
        color={dataSetList.borderColor}
        onChangeColor={(event: any) => {
          console.log("event.target.value", event.target.value);

          const updatedChartData: any = [...formik.values.lineData];
          updatedChartData[mainIndex][dataSetIndex].borderColor =
            event.target.value;
          updatedChartData[mainIndex][dataSetIndex].backgroundColor =
            event.target.value;
          formik.setFieldValue("lineData", updatedChartData);
        }}
        onChange={(event) => {
          const updatedChartData: any = [...formik.values.lineData];
          updatedChartData[mainIndex][dataSetIndex].label = event.label;
          updatedChartData[mainIndex][dataSetIndex].data = event.values;
          formik.setFieldValue("lineData", updatedChartData);
        }}
      />
    </div>
  );
};

export default Yaxios;
