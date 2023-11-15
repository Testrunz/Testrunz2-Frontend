import { FormikProps } from "formik";
import { formType } from "./RealTimeChart";
import { LabelColorInput } from "../../common/LineChart/LabelColorInput";

type Props = {
  dataSetIndex: any;
  list: any;
  formik: FormikProps<formType>;
  dataSetList: any;
  mainIndex: number;
};

const RealTimeYaxios = ({
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

          formik.setFieldValue("lineData", updatedChartData);
        }}
      />
    </div>
  );
};

export default RealTimeYaxios;
