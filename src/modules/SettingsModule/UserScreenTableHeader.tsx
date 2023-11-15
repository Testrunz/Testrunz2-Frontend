import { useMemo, useState } from "react";
import { FormikProps } from "formik";
import LableWithIcon from "../../common/LableWithIcon";
import SvgSort from "../../icons/SvgSort";
import Flex from "../../packages/Flex/Flex";
import InputText from "../../packages/InputText/InputText";
import SelectTag from "../../packages/SelectTag/SelectTag";
import { isEmpty } from "../../utils/validators";
import { MoreInfoList } from "../MyPageModule/store/mypage.types";
import { designationOptions } from "../LoginModule/mock";
import styles from "./userscreentableheader.module.css";
import { filterFormType } from "./UserTab";
import { STATUS_OPTIONS } from "./mock";
import Button from "../../packages/Button/Button";
import moment from "moment";
import { MultiSelect } from "react-multi-select-component";
import {
  valueDepartmentRenderer,
  valueLabRenderer,
} from "../RunzModule/RunzCustomHeader";

export const UserDetailsHeader = ({
  moreInfoList,
  formik,
  setData,
  isData,
  data,
}: {
  moreInfoList: MoreInfoList[];
  formik: FormikProps<filterFormType>;
  setData: (a: any) => void;
  isData: any;
  data: any;
}) => {
  const [isFilter, setFilter] = useState("");

  const getDepartmentOption: any = useMemo(() => {
    const result = moreInfoList.filter(
      (list) => list.organization === formik.values.organisation?.organization
    );
    return result ? result[0] : { department: [], labtype: [] };
  }, [formik.values.organisation]);

  const sortByNameAscending = () => {
    setFilter("Ascending");
    const sortedData = [...isData].sort((a, b) => a.name.localeCompare(b.name));
    setData(sortedData);
  };

  const sortByNameDescending = () => {
    setFilter("Descending");
    const sortedData = [...isData].sort((a, b) => b.name.localeCompare(a.name));
    setData(sortedData);
  };

  return (
    <Flex flex={1}>
      <LableWithIcon
        type="bodyBold"
        color="shade-3"
        label="User details"
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
        containerClassName={styles.sortTitleFlexSettings}
      />

      <Flex row center flex={1}>
        <div style={{ flex: 1 }}>
          <SelectTag
            isClearable
            isSearchable
            inputHeight={35}
            placeholder="Select organisation"
            value={formik.values.organisation}
            onChange={(event) => {
              formik.setFieldValue("department", []);
              formik.setFieldValue("lab", []);
              if (event) {
                formik.setFieldValue("organisation", {
                  organization: event.organization,
                  _id: event._id,
                });
              } else {
                formik.setFieldValue("organisation", "");
              }
            }}
            options={moreInfoList}
            getOptionLabel={(option) => option.organization}
            getOptionValue={(option) => option._id}
          />
        </div>

        <Flex flex={1} marginRight={8} marginLeft={8}>
          <MultiSelect
            disabled={isEmpty(formik.values.organisation)}
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
        </Flex>

        <Flex flex={1}>
          <MultiSelect
            disabled={isEmpty(formik.values.organisation)}
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
        </Flex>
      </Flex>
    </Flex>
  );
};

export const AddOnHeader = ({
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
      moment(a.createdAt)
        .format("DD/MM/YYYY hh:mm A")
        .localeCompare(moment(b.createdAt).format("DD/MM/YYYY hh:mm A"))
    );
    setData(sortedData);
  };

  const sortByNameDescending = () => {
    setFilter("Descending");
    const sortedData = [...isData].sort((a, b) =>
      moment(b.createdAt)
        .format("DD/MM/YYYY hh:mm A")
        .localeCompare(moment(a.createdAt).format("DD/MM/YYYY hh:mm A"))
    );
    setData(sortedData);
  };

  return (
    <Flex className={styles.createdFlex} flex={1}>
      <LableWithIcon
        containerClassName={styles.sortTitleFlexSettings}
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
          value={formik.values.addOn}
          onChange={formik.handleChange("addOn")}
          white
          size="small"
          placeholder="DD/MM/YYYY"
        />
      </Flex>
    </Flex>
  );
};

export const RoleHeader = ({
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
    const sortedData = [...isData].sort((a, b) => a.role.localeCompare(b.role));
    setData(sortedData);
  };

  const sortByNameDescending = () => {
    setFilter("Descending");
    const sortedData = [...isData].sort((a, b) => b.role.localeCompare(a.role));
    setData(sortedData);
  };
  return (
    <Flex flex={1} className={styles.inputMarginSettings}>
      <LableWithIcon
        containerClassName={styles.sortTitleFlexSettings}
        label="Role"
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
          value={formik.values.role}
          onChange={(event) => {
            if (event) {
              formik.setFieldValue("role", event);
            } else {
              formik.setFieldValue("role", "");
            }
          }}
          options={designationOptions}
          inputHeight={35}
          placeholder="Select Role"
        />
      </Flex>
    </Flex>
  );
};

export const StatusHeader = ({
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
    const sortedData = [...isData].sort((a, b) => {
      if (a.activeStatus && !b.activeStatus) return -1;
      if (!a.activeStatus && b.activeStatus) return 1;
      return 0;
    });
    setData(sortedData);
  };

  const sortByNameDescending = () => {
    setFilter("Descending");
    const sortedData = [...isData].sort((a, b) => {
      if (a.activeStatus && !b.activeStatus) return 1;
      if (!a.activeStatus && b.activeStatus) return -1;
      return 0;
    });
    setData(sortedData);
  };

  return (
    <Flex flex={1} className={styles.inputMarginSettings}>
      <LableWithIcon
        containerClassName={styles.sortTitleFlexSettings}
        label="Status"
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
          value={formik.values.status}
          onChange={(event) => {
            if (event) {
              formik.setFieldValue("status", event);
            } else {
              formik.setFieldValue("status", "");
            }
          }}
          options={STATUS_OPTIONS}
          inputHeight={35}
          placeholder="Select status"
        />
      </Flex>
    </Flex>
  );
};
