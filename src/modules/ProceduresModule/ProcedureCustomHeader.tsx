import { FormikProps } from "formik";
import { useMemo, useState } from "react";
import LableWithIcon from "../../common/LableWithIcon";
import SvgSort from "../../icons/SvgSort";
import Flex from "../../packages/Flex/Flex";
import InputText from "../../packages/InputText/InputText";
import SelectTag from "../../packages/SelectTag/SelectTag";
import { MoreInfoList } from "../MyPageModule/store/mypage.types";
import { filterFormType } from "./ProceduresScreen";
import styles from "./procedurecustomheader.module.css";
import { Procedures } from "./store/procedures.types";
import moment from "moment";
import Button from "../../packages/Button/Button";
import { MultiSelect } from "react-multi-select-component";
import {
  valueDepartmentRenderer,
  valueLabRenderer,
} from "../RunzModule/RunzCustomHeader";

export const ProcedureHeader = ({
  moreInfoList,
  formik,
  dataList,
  setData,
  isData,
  data,
}: {
  moreInfoList: MoreInfoList[];
  formik: FormikProps<filterFormType>;
  dataList: Procedures;
  setData: (a: any) => void;
  isData: any;
  data: any;
}) => {
  const [isFilter, setFilter] = useState("");

  const getDepartmentOption: any = useMemo(() => {
    const result = moreInfoList.filter(
      (list) => list._id?.toString() === dataList?.organization?.toString()
    );
    return result ? result[0] : { department: [], labtype: [] };
  }, [dataList?.organization]);

  const getIdOptions: any = dataList?.procedureIds?.map((list) => {
    return { label: list.id, value: list.id };
  });

  const sortByNameAscending = () => {
    setFilter("Ascending");
    const sortedData = [...isData].sort((a, b) =>
      a.title.localeCompare(b.title)
    );
    setData(sortedData);
  };

  const sortByNameDescending = () => {
    setFilter("Descending");
    const sortedData = [...isData].sort((a, b) =>
      b.title.localeCompare(a.title)
    );
    setData(sortedData);
  };

  return (
    <Flex flex={1}>
      <LableWithIcon
        type="bodyBold"
        color="shade-3"
        label="Procedure details"
        actionRight={() => (
          <Button
            title={isFilter}
            onClick={() => {
              if (isFilter === "") {
                sortByNameAscending();
              } else if (isFilter === "Ascending") {
                sortByNameDescending();
              } else if (isFilter === "Descending") {
                setFilter("");
                setData(data);
              }
            }}
            types="link"
          >
            <SvgSort />
          </Button>
        )}
        containerClassName={styles.sortTitleFlex}
      />

      <Flex row center flex={1}>
        <div style={{ flex: 1 }}>
          <SelectTag
            isClearable
            isSearchable
            options={getIdOptions?.length > 0 ? getIdOptions : []}
            inputHeight={35}
            placeholder="ID"
            value={formik.values.id}
            onChange={(event) => {
              if (event) {
                formik.setFieldValue("id", event);
              } else {
                formik.setFieldValue("id", "");
              }
            }}
          />
        </div>

        <div className={styles.inputMargin}>
          <MultiSelect
            options={
              getDepartmentOption?.department
                ? getDepartmentOption?.department
                : []
            }
            value={formik.values.department}
            onChange={(event: any) => {
              formik.setFieldValue("department", event);
            }}
            valueRenderer={valueDepartmentRenderer}
            labelledBy="Department"
          />
        </div>
        <div style={{ flex: 1 }}>
          <MultiSelect
            options={
              getDepartmentOption?.labtype ? getDepartmentOption?.labtype : []
            }
            value={formik.values.lab}
            onChange={(event: any) => {
              formik.setFieldValue("lab", event);
            }}
            valueRenderer={valueLabRenderer}
            labelledBy="Lab"
          />
        </div>
      </Flex>
    </Flex>
  );
};

export const CreatedOnHeader = ({
  formik,
  setData,
  isData,
  data,
}: {
  formik: FormikProps<filterFormType>;
  setData: (a: any) => void;
  isData: any;
  data: any;
}) => {
  const [isFilter, setFilter] = useState("");

  const sortByNameAscending = () => {
    setFilter("Ascending");
    const sortedData = [...isData].sort((a, b) =>
      moment(a.createdOn)
        .format("DD/MM/YYYY hh:mm A")
        .localeCompare(moment(b.createdOn).format("DD/MM/YYYY hh:mm A"))
    );
    setData(sortedData);
  };

  const sortByNameDescending = () => {
    setFilter("Descending");
    const sortedData = [...isData].sort((a, b) =>
      moment(b.createdOn)
        .format("DD/MM/YYYY hh:mm A")
        .localeCompare(moment(a.createdOn).format("DD/MM/YYYY hh:mm A"))
    );
    setData(sortedData);
  };

  return (
    <Flex flex={1}>
      <LableWithIcon
        containerClassName={styles.sortTitleFlex}
        label="Created on"
        type="bodyBold"
        color="shade-3"
        actionRight={() => (
          <Button
            title={isFilter}
            onClick={() => {
              if (isFilter === "") {
                sortByNameAscending();
              } else if (isFilter === "Ascending") {
                sortByNameDescending();
              } else if (isFilter === "Descending") {
                setFilter("");
                setData(data);
              }
            }}
            types="link"
          >
            <SvgSort />
          </Button>
        )}
      />

      <Flex flex={1}>
        <InputText
          keyboardType="date"
          white
          size="small"
          placeholder="DD/MM/YYYY"
          value={formik.values.createdOn}
          onChange={formik.handleChange("createdOn")}
        />
      </Flex>
    </Flex>
  );
};

export const CreatedByHeader = ({
  formik,
  dataList,
  setData,
  isData,
  data,
}: {
  formik: FormikProps<filterFormType>;
  dataList: Procedures;
  setData: (a: any) => void;
  isData: any;
  data: any;
}) => {
  const [isFilter, setFilter] = useState("");

  const getNameOptions: any = dataList?.procedureIds?.map((list) => {
    return { label: list.createdBy, value: list.createdBy };
  });
  const uniqueData = getNameOptions?.filter(
    (item: any, index: any, self: any) => {
      // Find the index of the first occurrence of the item in the array
      const firstIndex = self.findIndex(
        (obj: any) => obj.label === item.label && obj.value === item.value
      );
      // Keep only the first occurrence (index matches the current index)
      return index === firstIndex;
    }
  );

  const sortByNameAscending = () => {
    setFilter("Ascending");
    const sortedData = [...isData].sort((a, b) =>
      a.createdBy.localeCompare(b.createdBy)
    );
    setData(sortedData);
  };

  const sortByNameDescending = () => {
    setFilter("Descending");
    const sortedData = [...isData].sort((a, b) =>
      b.createdBy.localeCompare(a.createdBy)
    );
    setData(sortedData);
  };
  return (
    <Flex flex={1}>
      <LableWithIcon
        containerClassName={styles.sortTitleFlex}
        label="Created By"
        type="bodyBold"
        color="shade-3"
        actionRight={() => (
          <Button
            title={isFilter}
            onClick={() => {
              if (isFilter === "") {
                sortByNameAscending();
              } else if (isFilter === "Ascending") {
                sortByNameDescending();
              } else if (isFilter === "Descending") {
                setFilter("");
                setData(data);
              }
            }}
            types="link"
          >
            <SvgSort />
          </Button>
        )}
      />
      <Flex flex={1}>
        <SelectTag
          isClearable
          isSearchable
          inputHeight={35}
          placeholder="Created By"
          value={formik.values.createdBy}
          onChange={(event) => {
            if (event) {
              formik.setFieldValue("createdBy", event);
            } else {
              formik.setFieldValue("createdBy", "");
            }
          }}
          options={uniqueData?.length > 0 ? uniqueData : []}
        />
      </Flex>
    </Flex>
  );
};
