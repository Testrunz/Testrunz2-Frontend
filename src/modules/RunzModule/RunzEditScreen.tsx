import { Dropdown, MenuProps, Button as ButtonAntd } from "antd";
import LableWithIcon from "../../common/LableWithIcon";
import SvgArrowDown from "../../icons/SvgArrowDown";
import SvgEdit from "../../icons/SvgEdit";
import SvgShare from "../../icons/SvgShare";
import SvgSubmit from "../../icons/SvgSubmit";
import Button from "../../packages/Button/Button";
import Flex from "../../packages/Flex/Flex";
import Text from "../../packages/Text/Text";
import {
  error,
  primaryShade4,
  success,
  textShade1,
  white,
  yellow,
} from "../../theme/colors";
import styles from "./raunzeditscreen.module.css";
import Badge from "../../packages/Badge/Badge";
import { useEffect, useRef, useState } from "react";
import ButtonGroup from "../../packages/ButtonGroup/ButtonGroup";
import RunzRichText from "./RunzRichText";
import CreateNewRunzModal from "./CreateNewRunzModal";
import Alert from "../../packages/Alert/Alert";
import store, { AppDispatch, RootState } from "../../redux/store";
import {
  getRunzListDetailsMiddleWare,
  getRunzUpdatesMiddleWare,
} from "./store/runzMiddleware";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../packages/Loader/Loader";
import moment from "moment";
import {
  procedureByIdMiddleWare,
  procedureMiddleWare,
} from "../ProceduresModule/store/proceduresMiddleware";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useFormik } from "formik";
import { isEmpty } from "../../utils/validators";
import { getUserListMiddleWare } from "../SettingsModule/store/settingsMiddleware";
import parse from "html-react-parser";
import * as html2json from "html2json";
import Toast from "../../packages/Toast/Toast";
import { isEmptyObject } from "../../utils/helpers";
import ChartTab from "./ChartTab";
import { routes } from "../../routes/routesPath";

const items: MenuProps["items"] = [
  {
    label: "Not started",
    key: "error",
    style: {
      backgroundColor: error,
      borderTopLeftRadius: 8,
      borderTopRightRadius: 8,
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,
      color: white,
      fontFamily: "Poppins-Regular",
      fontSize: 12,
      padding: "8px 16px",
    },
  },
  {
    label: "Completed",
    key: "success",
    style: {
      backgroundColor: success,
      borderRadius: 0,
      color: white,
      fontFamily: "Poppins-Regular",
      fontSize: 12,
      padding: "8px 16px",
    },
  },
  {
    label: "Working",
    key: "primary",
    style: {
      backgroundColor: yellow,
      borderTopLeftRadius: 0,
      borderTopRightRadius: 0,
      borderBottomLeftRadius: 8,
      borderBottomRightRadius: 8,
      color: white,
      fontFamily: "Poppins-Regular",
      fontSize: 12,
      padding: "8px 16px",
    },
  },
];

export type formType = {
  procedureName: any;
  testObjective: string;
  setDueDate: string;
  assignTo: any;
};

const initialValues: formType = {
  procedureName: "",
  testObjective: "",
  setDueDate: "",
  assignTo: "",
};

const validate = (values: formType) => {
  const errors: Partial<formType> = {};
  if (isEmpty(values.procedureName)) {
    errors.procedureName = "Procedure Name field is required";
  }
  if (isEmpty(values.testObjective)) {
    errors.testObjective = "Test Objective field is required";
  }
  if (isEmpty(values.setDueDate)) {
    errors.setDueDate = "Set Due Date is required";
  }
  if (isEmpty(values.assignTo)) {
    errors.assignTo = "AssignTo is required";
  }
  return errors;
};

const LabelWithColumn = ({
  title,
  value,
}: {
  title: string;
  value: string;
}) => {
  return (
    <Flex>
      <Text type="captionBold" color="shade-3">
        {title}
      </Text>
      <Text type="button-2" color="shade-2" style={{ marginTop: 4 }}>
        {value}
      </Text>
    </Flex>
  );
};

const RunzEditScreen = () => {
  const dispatch: AppDispatch = useDispatch();
  const [isStatus, setStatus] = useState<any>("error");
  const [isMore, setMore] = useState<boolean>(false);
  const [isTab, setTab] = useState("Procedure");
  const [editNewRunz, setEditNewRunz] = useState(false);
  let [searchParams, setSearchParams] = useSearchParams();
  const [htmlInput, setHtmlInput] = useState<any>({});
  const getRunzId: any = searchParams.get("id");
  const [expResult, setResult] = useState<any>("");
  const [expRemarks, setRemarks] = useState<any>("");
  const formRef: any = useRef(null);
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getRunzListDetailsMiddleWare({ id: getRunzId }));
    dispatch(procedureByIdMiddleWare({ id: searchParams.get("procedureId") }));
    dispatch(getUserListMiddleWare({}));
    dispatch(procedureMiddleWare({}));
  }, []);

  const {
    isLoading,
    runzData,
    procedureByIDLoader,
    procedureData,
    moreInfoList,
    getRunzUpdatesLoader,
    getUserListdata,
  } = useSelector(
    ({
      getRunzListDetailsReducers,
      procedureByIDReducers,
      moreInfoListReducers,
      getRunzUpdatesReducers,
      getUserListReducers,
    }: RootState) => {
      return {
        isLoading: getRunzListDetailsReducers.isLoading,
        runzData: getRunzListDetailsReducers.data,
        procedureByIDLoader: procedureByIDReducers.isLoading,
        procedureData: procedureByIDReducers.data,
        moreInfoList: moreInfoListReducers.data,
        getRunzUpdatesLoader: getRunzUpdatesReducers.isLoading,
        getUserListdata: getUserListReducers.data,
      };
    }
  );
  useEffect(() => {
    if (runzData?.experiment?.status === "not started") {
      setStatus("error");
    } else if (runzData?.experiment?.status === "success") {
      setStatus("success");
    } else if (runzData?.experiment?.status === "opened") {
      setStatus("primary");
    }
  }, [runzData?.experiment?.status]);

  const menuProps = {
    items,
    onClick: (event: any) => {
      setStatus(event.key);

      if (event.key === "error") {
        store
          .dispatch(
            getRunzUpdatesMiddleWare({
              id: getRunzId,
              status: "not started",
            })
          )
          .then(() => {
            setStatus(event.key);
            dispatch(getRunzListDetailsMiddleWare({ id: getRunzId }));
          });
      } else if (event.key === "success") {
        store
          .dispatch(
            getRunzUpdatesMiddleWare({
              id: getRunzId,
              status: "success",
            })
          )
          .then(() => {
            setStatus(event.key);
            dispatch(getRunzListDetailsMiddleWare({ id: getRunzId }));
          });
      } else if (event.key === "primary") {
        store
          .dispatch(
            getRunzUpdatesMiddleWare({
              id: getRunzId,
              status: "opened",
            })
          )
          .then(() => {
            setStatus(event.key);
            dispatch(getRunzListDetailsMiddleWare({ id: getRunzId }));
          });
      }
    },
  };

  let status = "Not started";
  if (isStatus === "error") {
    status = "Not started";
  } else if (isStatus === "success") {
    status = "Completed";
  } else if (isStatus === "primary") {
    status = "Working";
  }

  const getOrganization = moreInfoList?.filter(
    (list) => list._id === runzData?.experiment?.organization
  );

  const myDepartmentArray = procedureData?.user?.department;
  const resultDepartment = myDepartmentArray?.join(",");

  const myLabArray = procedureData?.user?.labtype;
  const resultLab = myLabArray?.join(",");

  const handleEdit = (values: formType) => {
    const assignList: any =
      Array.isArray(values.assignTo) &&
      values.assignTo?.map((list: any) => {
        return { userId: list.userId, date: list.createdAt };
      });

    store
      .dispatch(
        getRunzUpdatesMiddleWare({
          id: getRunzId,
          procedureId: values.procedureName?.id,
          procedurename: values.procedureName?.title,
          testobjective: values.testObjective,
          dueDate: moment(values.setDueDate).local().toISOString(),
          assignTo: assignList,
        })
      )
      .then(() => {
        setSearchParams({
          id: getRunzId,
          procedureId: values.procedureName?.id,
        });
        Alert("Runz saved successfully.");
        dispatch(getRunzListDetailsMiddleWare({ id: getRunzId }));
        dispatch(procedureByIdMiddleWare({ id: values.procedureName?.id }));
        setEditNewRunz(false);
      });
  };

  const formik = useFormik({
    initialValues,
    onSubmit: handleEdit,
    validate,
  });

  const handleOpenEdit = () => {
    formik.setFieldValue("procedureName", {
      title: runzData?.experiment?.procedurename,
      id: runzData?.experiment?.procedureId,
    });
    setEditNewRunz(true);
    formik.setFieldValue("testObjective", runzData?.experiment?.testobjective);
    formik.setFieldValue(
      "setDueDate",
      moment(runzData?.experiment.dueDate).format("YYYY-MM-DD")
    );
    const commonObjects = getUserListdata.filter((obj2) =>
      runzData?.experiment.assignTo?.some((obj1) => obj1.userId === obj2.userId)
    );
    formik.setFieldValue("assignTo", commonObjects);
  };

  const htmlData: any = procedureData.procedure?.html
    ? procedureData.procedure?.html
    : "";

  const htmlToJSON: any = html2json.html2json(htmlData);

  const uses = htmlToJSON?.child.map((ele: any) => ele);

  const handleHtmlInput = () => {
    let objects = {};
    // @ts-ignore
    let inputEl: any = document
      ?.getElementById("content")
      ?.querySelectorAll("input");

    inputEl?.forEach((ele: any) => {
      const { id, value } = ele;
      let temp = { [id]: value };
      objects = { ...objects, temp };
      setHtmlInput((prev: any) => ({ ...prev, [id]: value }));
      // @ts-ignore
      ele.onChange = (e) => {
        const { id, value } = e.target;
        setHtmlInput((prev: any) => ({ ...prev, [id]: value }));
      };
    });
  };

  useEffect(() => {
    handleHtmlInput();
  }, [isLoading, !isLoading, procedureData.procedure]);

  const handleSave = () => {
    handleHtmlInput();

    const tablesEles: any = document
      ?.getElementById("content")
      ?.querySelectorAll("table");
    let finalTableTitleResult: any;
    if (tablesEles) {
      const result = Array?.from(tablesEles)?.map((tablesInstance: any) => {
        const headerCells = tablesInstance?.querySelectorAll("[data-column]");
        const headerNames = Array.from(headerCells).map((header: any) => ({
          key: header.getAttribute("data-column"),
          value: header.textContent.trim(),
        }));
        const tableDataRows: any = tablesInstance.querySelectorAll("tbody tr");
        const rowData = Array.from(tableDataRows)?.map((tableDataRow: any) => {
          const tableCells = tableDataRow.querySelectorAll("td[data-column]");
          return Array.from(tableCells).map((cell: any) => {
            const inputCntext = cell.querySelector("input[type='text']");
            if (inputCntext) {
              return {
                key: cell.getAttribute("data-column"),
                value: htmlInput[inputCntext.id],
              };
            }
          });
        });
        return {
          headerNames: headerNames,
          rowData: rowData,
        };
      });

      const mergedDatasets = result.map((dataset) => {
        const mergedData: any = [];
        for (let i = 0; i < dataset.rowData.length; i++) {
          const rowData = dataset.rowData[i];
          const mergedRow: any = {};
          for (let j = 0; j < rowData?.length; j++) {
            const header = dataset.headerNames[j];
            const value: any = rowData[j];
            mergedRow[header?.value] = value?.value;
          }
          mergedData.push(mergedRow);
        }
        return mergedData;
      });
      let filteredData = mergedDatasets?.filter((sublist) =>
        sublist?.some((obj: any) => Object?.keys(obj).length > 0)
      );
      filteredData = filteredData?.map((sublist) =>
        sublist?.filter((obj: any) => Object?.keys(obj).length > 0)
      );

      const results = filteredData?.map((dataset, index) => {
        const subResult = [];
        const firstDataItem = dataset[index];
        for (const key in firstDataItem) {
          const label = key;
          const values: any = [];
          dataset?.forEach((item: any) => {
            if (item[key]) {
              values.push(parseInt(item[key]));
            }
          });
          subResult.push({ label, values });
        }
        return subResult;
      });

      const tablesin = document
        ?.getElementById("content")
        ?.querySelectorAll("[data-table]");
      const getTitle: any = [];

      tablesin?.forEach((element, index) => {
        getTitle.push(element.textContent);
      });

      finalTableTitleResult = getTitle?.map((list: any, index: any) => {
        return { label: list, value: list, data: results[index] };
      });
    }
    let vals = Object.values(htmlInput);
    const empty = vals.filter((item) => item === "");
    if (empty.length > 0) {
      Toast("Must fill all Required Readings", "LONG", "error");
    } else if (empty.length === 0) {
      handleHtmlInput();
      store
        .dispatch(
          getRunzUpdatesMiddleWare({
            id: getRunzId,
            datas: JSON.stringify(htmlInput),
            remark: expRemarks,
            expresult: expResult,
            table: finalTableTitleResult,
          })
        )
        .then(() => {
          navigate(routes.RUNZ);
          Alert("Your work has been saved");
          // dispatch(getRunzListDetailsMiddleWare({ id: getRunzId }));
          setEditNewRunz(false);
        })
        .catch(() => {
          Toast("Something went wrong! Try again", "LONG", "error");
        });
    }
  };

  useEffect(() => {
    if (!isEmpty(runzData.experiment?.expresult)) {
      setResult(runzData.experiment.expresult);
    }
    if (!isEmpty(runzData.experiment?.remark)) {
      setRemarks(runzData.experiment.remark);
    }
  }, [runzData.experiment?.remark, runzData.experiment?.expresult]);

  useEffect(() => {
    if (!isEmpty(runzData.experiment?.datas)) {
      const filtered =
        runzData.experiment?.datas &&
        Object.entries(JSON.parse(runzData.experiment?.datas)).filter(
          ([key]) => key !== ""
        );
      const obj = filtered && Object.fromEntries(filtered);
      if (!isEmptyObject(obj) && !procedureByIDLoader) {
        for (const [key, values] of Object.entries(obj)) {
          if (values && document.getElementById(key)) {
            // @ts-ignore
            document.getElementById(key).value = values;
          }
        }
      }
    }
  }, [runzData.experiment?.datas, procedureByIDLoader]);

  const handleTab = (value: string) => {
    if (value === "Procedure") {
      dispatch(getRunzListDetailsMiddleWare({ id: getRunzId }));
      dispatch(
        procedureByIdMiddleWare({ id: searchParams.get("procedureId") })
      );
    }
    setTab(value);
  };

  useEffect(() => {
    handleHtmlInput();
  }, [isLoading, !isLoading, procedureData.procedure]);

  return (
    <Flex className={styles.overAll}>
      {(isLoading || procedureByIDLoader || getRunzUpdatesLoader) && <Loader />}
      <CreateNewRunzModal
        title="Edit Runz"
        open={editNewRunz}
        cancelClick={() => {
          setEditNewRunz(false);
        }}
        submit={formik.handleSubmit}
        isLoader={false}
        formik={formik}
        btnTitle="Save"
        runzData={runzData}
      />

      <Flex className={styles.header}>
        <Flex row center between>
          <Flex>
            <Text color="shade-3" type="captionBold">
              {runzData?.experiment?.procedureId} / {resultDepartment} /{" "}
              {resultLab} /{" "}
              {getOrganization &&
                getOrganization.length === 1 &&
                getOrganization[0]?.organization}
            </Text>
            <Text className={styles.subTitle} type="subTitle">
              {runzData?.experiment?.procedurename}
            </Text>
          </Flex>
          <Flex row center>
            <Button types="link">
              <LableWithIcon
                actionLeft={() => <SvgSubmit fill={textShade1} />}
                label="Submit"
                type="button-2"
              />
            </Button>
            <Button types="link" className={styles.svgShare}>
              <LableWithIcon
                actionLeft={() => <SvgShare fill={textShade1} />}
                label="Share"
                type="button-2"
              />
            </Button>
            <Button types="link" onClick={handleOpenEdit}>
              <LableWithIcon
                actionLeft={() => <SvgEdit fill={textShade1} />}
                label="Edit"
                type="button-2"
              />
            </Button>
            <Button
              onClick={() => setMore(!isMore)}
              types="link"
              className={styles.svgMore}
            >
              <LableWithIcon
                actionRight={() => <SvgArrowDown fill={textShade1} />}
                label="More Info"
                type="button-2"
              />
            </Button>
          </Flex>
        </Flex>
        {isMore && (
          <Flex center row between className={styles.moreFlex}>
            <LabelWithColumn
              title="Test objective"
              value={runzData?.experiment?.testobjective}
            />
            <LabelWithColumn
              title="Assigned by"
              value={runzData?.experiment?.createdBy}
            />
            <LabelWithColumn
              title="Created on"
              value={moment(runzData?.experiment?.createdAt).format(
                "DD/MM/YYYY (ddd)"
              )}
            />
            <LabelWithColumn
              title="Due date"
              value={moment(runzData?.experiment?.dueDate).format(
                "DD/MM/YYYY (ddd)"
              )}
            />

            <Flex>
              <Dropdown menu={menuProps} overlayStyle={{ marginBottom: 8 }}>
                <ButtonAntd className={styles.statusBtn}>
                  <LableWithIcon
                    type="captionBold"
                    label="Status"
                    actionRight={() => (
                      <SvgArrowDown
                        height={20}
                        width={20}
                        fillOne={primaryShade4}
                      />
                    )}
                  />
                </ButtonAntd>
              </Dropdown>
              <Badge className={styles.badge} type={isStatus}>
                {status}
              </Badge>
            </Flex>
          </Flex>
        )}
      </Flex>

      <div className={styles.borderBottom} />
      <Flex height={window.innerHeight - 179}>
        <Flex>
          <ButtonGroup
            defaultSelected={"Procedure"}
            buttons={["Procedure", "Charts", "Results", "Remarks"]}
            onButtonChange={handleTab}
          />
          <Flex height={window.innerHeight - 267}>
            {isTab === "Procedure" && (
              <>
                {procedureData.procedure?.html && (
                  <div
                    id="content"
                    className={styles.actionFlex}
                    style={{ overflowY: "scroll" }}
                  >
                    <form ref={formRef} onChange={handleHtmlInput}>
                      {uses.map((el: any) =>
                        parse(htmlToJSON && html2json.json2html(el))
                      )}
                    </form>
                  </div>
                )}
              </>
            )}
            {isTab === "Results" && (
              <Flex className={styles.actionFlex}>
                <RunzRichText
                  onEditorChange={(event: any) => setResult(event)}
                  value={expResult}
                  height={"100%"}
                />
              </Flex>
            )}
            {isTab === "Charts" &&
              (Array.isArray(runzData.experiment?.table) &&
              runzData.experiment?.table?.length > 0 ? (
                <div
                  style={{
                    overflowY: "scroll",
                    padding: 30,
                    height: "100%",
                  }}
                >
                  <ChartTab getRunzId={getRunzId} />
                </div>
              ) : (
                <Flex center middle flex={1}>
                  <Text size={16} align="center" color="tertiary-shade-3">
                    No data found
                  </Text>
                </Flex>
              ))}
            {isTab === "Remarks" && (
              <Flex className={styles.actionFlex}>
                <RunzRichText
                  onEditorChange={(event: any) => setRemarks(event)}
                  value={expRemarks}
                  height={"100%"}
                />
              </Flex>
            )}
          </Flex>
          <Flex row center between className={styles.footer}>
            <Button types="tertiary-1" onClick={() => navigate(routes.RUNZ)}>
              Back
            </Button>
            {(isTab === "Remarks" ||
              isTab === "Results" ||
              isTab === "Procedure") && (
              <Button type="submit" onClick={handleSave}>
                Save
              </Button>
            )}
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default RunzEditScreen;
