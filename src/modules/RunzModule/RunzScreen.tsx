import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Flex from "../../packages/Flex/Flex";
import CheckBox from "../../packages/CheckBox/CheckBox";
import { isEmpty } from "../../utils/validators";
import Table from "../../packages/Table/Table";
import {
  RunzAssignedHeader,
  RunzCreatedOnHeader,
  RunzDetailsHeader,
  RunzDueDateHeader,
  RunzStatusHeader,
} from "./RunzCustomHeader";
import Button from "../../packages/Button/Button";
import LableWithIcon from "../../common/LableWithIcon";
import SvgPlus from "../../icons/SvgPlus";
import YesOrNo from "../../common/YesOrNo";
import SvgDelete1 from "../../icons/SvgDelete1";
import Alert from "../../packages/Alert/Alert";
import CreateNewRunzModal from "./CreateNewRunzModal";
import styles from "./runzscreen.module.css";
import Text from "../../packages/Text/Text";
import { routes } from "../../routes/routesPath";
import { HEADER_HEIGHT } from "../../utils/constants";
import store, { RootState } from "../../redux/store";
import {
  getRunzCreateMiddleWare,
  getRunzListMiddleWare,
  getRunzUpdatesMiddleWare,
} from "./store/runzMiddleware";
import { useSelector } from "react-redux";
import Loader from "../../packages/Loader/Loader";
import { FormikHelpers, useFormik } from "formik";
import { procedureMiddleWare } from "../ProceduresModule/store/proceduresMiddleware";
import { getUserListMiddleWare } from "../SettingsModule/store/settingsMiddleware";
import moment from "moment";
import AddPeopleModal from "./AddPeopleModal";
import SvgArrowDown from "../../icons/SvgArrowDown";
import {
  error,
  primaryShade1,
  primaryShade3,
  success,
  white,
} from "../../theme/colors";

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

export type formFilterType = {
  id: any;
  department: any;
  lab: any;
  createdOn: string;
  dueDate: string;
  status: any;
  assignedBy: any;
};

const initialValuesFilter: formFilterType = {
  id: "",
  department: [],
  lab: [],
  createdOn: "",
  dueDate: "",
  status: "",
  assignedBy: "",
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

const Status = ({ value, row }: any) => {
  const [isOpen, setOpen] = useState(false);
  const wrapperRef = useRef<any>(null);

  const useOutsideAlerter = (ref: any) => {
    useEffect(() => {
      const handleClickOutside = (event: any) => {
        if (ref.current && !ref.current.contains(event.target)) {
          setOpen(false);
        }
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  };
  useOutsideAlerter(wrapperRef);

  const handleUpdate = (value: string) => {
    if (row.activeStatus === value) {
      setOpen(false);
    } else {
      store
        .dispatch(getRunzUpdatesMiddleWare({ id: row._id, status: value }))
        .then(() => {
          setOpen(false);
          store.dispatch(getRunzListMiddleWare());
        });
    }
  };

  let status = "";
  let backgroundColor;
  if (value === "not started") {
    status = "Not started";
    backgroundColor = error;
  } else if (value === "success") {
    status = "Completed";
    backgroundColor = success;
  } else if (value === "opened") {
    status = "Working";
    backgroundColor = primaryShade1;
  }

  return (
    <div
      style={{
        position: "relative",
      }}
    >
      <Flex row center middle>
        <Text
          color="white"
          type="smallBold"
          align="center"
          size={12}
          style={{
            backgroundColor,
            borderRadius: 20,
            padding: "4px 10px",
            width: 100,
            marginRight: 8,
          }}
        >
          {status}
        </Text>
        <div
          style={{ cursor: "pointer" }}
          ref={wrapperRef}
          onClick={() => setOpen(true)}
        >
          <SvgArrowDown />
        </div>
      </Flex>
      {isOpen && (
        <div
          ref={wrapperRef}
          style={{
            position: "absolute",
            display: "flex",
            flexDirection: "column",
            background: white,
            zIndex: 99,
            border: "1px solid #dfdfdf",
            borderRadius: 4,
            cursor: "pointer",
            right: 20,
            width: 100,
            top: 30,
          }}
        >
          <Text
            size={12}
            onClick={() => {
              handleUpdate("not started");
              setOpen(false);
            }}
            style={{
              padding: 8,
              borderBottom: "1px solid #dfdfdf",
              backgroundColor:
                value === "not started" ? primaryShade3 : "transparent",
            }}
          >
            Not started
          </Text>
          <Text
            size={12}
            onClick={() => {
              handleUpdate("success");
              setOpen(false);
            }}
            style={{
              padding: 8,
              borderBottom: "1px solid #dfdfdf",
              backgroundColor:
                value === "success" ? primaryShade3 : "transparent",
            }}
          >
            Completed
          </Text>
          <Text
            size={12}
            onClick={() => {
              handleUpdate("opened");
              setOpen(false);
            }}
            style={{
              padding: 8,
              backgroundColor:
                value === "opened" ? primaryShade3 : "transparent",
            }}
          >
            Working
          </Text>
        </div>
      )}
    </div>
  );
};

const RunzScreen = () => {
  const navigate = useNavigate();
  const [selectedRows, setSelectedRows] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteModal, setDeleteModal] = useState(false);
  const [assign, setAssign] = useState(false);
  const [shareModal, setShareModal] = useState(false);
  const [createNewRunz, setCreateNewRunz] = useState(false);
  const [isLoader, setLoader] = useState(false);
  const [isSelectAll, setSelectAll] = useState(false);

  useEffect(() => {
    store.dispatch(getRunzListMiddleWare());
    store.dispatch(procedureMiddleWare({}));
    store.dispatch(getUserListMiddleWare({}));
  }, []);

  const {
    isLoading,
    runzListdata,
    getUserListdata,
    getUserListLoader,
    procedureList,
  } = useSelector(
    ({
      getRunzListReducers,
      getUserListReducers,
      procedureReducers,
    }: RootState) => {
      return {
        isLoading: getRunzListReducers.isLoading,
        runzListdata: getRunzListReducers.data,
        getUserListdata: getUserListReducers.data,
        getUserListLoader: getUserListReducers.isLoading,
        procedureList: procedureReducers.data,
      };
    }
  );

  const [isData, setData] = useState<any>(runzListdata);

  useEffect(() => {
    setData(runzListdata);
  }, [runzListdata]);

  const formikFilter = useFormik({
    initialValues: initialValuesFilter,
    onSubmit: () => {},
  });

  const columns = [
    {
      title: "",
      dataIndex: "testobjective",
      key: "testobjective",
      renderTitle: () => (
        <RunzDetailsHeader
          isData={isData}
          setData={setData}
          data={runzListdata}
          formikFilter={formikFilter}
        />
      ),
      flex: 5,
      rowOnClick: (row: any) => {
        navigate(
          `${routes.RUNZ_EIDT}?id=${row._id}&procedureId=${row.procedureId}`
        );
      },
      render: (value: string, row: any) => {
        return (
          <Flex>
            <Text color="shade-3" type="captionBold">
              {row._id} / {row.department} / {row.labType}
            </Text>
            <Text>{value}</Text>
          </Flex>
        );
      },
    },
    {
      title: "",
      dataIndex: "createdAt",
      key: "createdAt",
      flex: 2,
      renderTitle: () => (
        <RunzCreatedOnHeader
          isData={isData}
          setData={setData}
          data={runzListdata}
          formikFilter={formikFilter}
        />
      ),
      align: "center",
      rowOnClick: (row: any) => {
        navigate(
          `${routes.RUNZ_EIDT}?id=${row._id}&procedureId=${row.procedureId}`
        );
      },
      render: (value: string) => (
        <Text align="center" transform="capitalize">
          {moment(value).format("DD/MM/YYYY hh:mm A")}
        </Text>
      ),
    },
    {
      title: "",
      dataIndex: "dueDate",
      key: "dueDate",
      flex: 1.6,
      renderTitle: () => (
        <RunzDueDateHeader
          isData={isData}
          setData={setData}
          data={runzListdata}
          formikFilter={formikFilter}
        />
      ),
      align: "center",
      rowOnClick: (row: any) => {
        navigate(
          `${routes.RUNZ_EIDT}?id=${row._id}&procedureId=${row.procedureId}`
        );
      },
      render: (value: string) => (
        <Text align="center" transform="capitalize">
          {moment(value).format("DD/MM/YYYY")}
        </Text>
      ),
    },
    {
      title: "",
      dataIndex: "status",
      key: "status",
      flex: 1.6,
      renderTitle: () => (
        <RunzStatusHeader
          isData={isData}
          setData={setData}
          data={runzListdata}
          formikFilter={formikFilter}
        />
      ),
      align: "center",
      render: (value: string, row: any) => (
        <Status value={value} row={row} formikFilter={formikFilter} />
      ),
    },
    {
      title: "",
      dataIndex: "createdBy",
      key: "createdBy",
      flex: 1.6,
      renderTitle: () => (
        <RunzAssignedHeader
          isData={isData}
          setData={setData}
          data={runzListdata}
          formikFilter={formikFilter}
        />
      ),
      align: "center",
      rowOnClick: (row: any) => {
        navigate(
          `${routes.RUNZ_EIDT}?id=${row._id}&procedureId=${row.procedureId}`
        );
      },
    },
  ];

  const isAllRowChecked = (
    selected: any[],
    data: any,
    perPage: number
  ): boolean => {
    let count = 0;
    if (Array.isArray(data) && data.length > 0) {
      data.forEach((d) => {
        const isSelected = selected.some((r) => r.unique_key === d.unique_key);
        if (isSelected) {
          count += 1;
        }
      });
    }
    return count === perPage;
  };

  const handleChecked = (row: {
    _id: any;
    filter: (arg0: (r: any) => boolean) => any[];
    length: number;
  }) => {
    if (!Array.isArray(row)) {
      if (selectedRows.includes(row._id)) {
        const updatedRow = selectedRows.filter((s) => s !== row._id);
        setSelectedRows(updatedRow);
      } else {
        setSelectedRows([...selectedRows, row._id]);
      }
    } else if (Array.isArray(row)) {
      const orderNumbers = row.filter((r) => !isEmpty(r._id)).map((r) => r._id);
      if (isAllRowChecked(selectedRows, row, row.length)) {
        setSelectedRows([]);
      } else {
        setSelectedRows([...selectedRows, ...orderNumbers]);
      }
    }
  };

  const handleAllChecked = (row: {
    id: any;
    filter: (arg0: (r: any) => boolean) => any[];
    length: number;
  }) => {
    if (Array.isArray(row)) {
      const orderNumbers = row.filter((r) => !isEmpty(r._id)).map((r) => r._id);
      setSelectedRows([...orderNumbers]);
      setSelectAll(true);
    }
  };

  const handleSelections = (row: any) => {
    const isChecked = !Array.isArray(row)
      ? selectedRows.includes(row._id)
      : isAllRowChecked(selectedRows, row, row.length);
    return (
      <Flex>
        <CheckBox
          type="black"
          checked={isChecked}
          onClick={() => handleChecked(row)}
        />
      </Flex>
    );
  };

  const handleAllSelections = (row: any) => {
    return (
      <Flex>
        <CheckBox
          type="text-shade-2"
          label="Select all"
          labelColor="shade-2"
          checked={isSelectAll}
          onClick={() => handleAllChecked(row)}
        />
      </Flex>
    );
  };

  const handleAllUnSelections = () => {
    return (
      <Flex>
        <CheckBox
          type="text-shade-2"
          label="Deselect all"
          labelColor="shade-2"
          onClick={() => {
            setSelectedRows([]);
            setSelectAll(false);
          }}
        />
      </Flex>
    );
  };

  const handlePage = (page: number) => {
    setSelectedRows([]);
    setSelectAll(false);
    setCurrentPage(page);
  };

  const handleDeleteOpen = () => setDeleteModal(true);
  const handleAssignOpen = () => setAssign(true);
  const handleShareOpen = () => setShareModal(true);

  const handleCreate = (
    values: formType,
    formikHelpers: FormikHelpers<formType>
  ) => {
    setLoader(true);
    const assignList: any =
      Array.isArray(values.assignTo) &&
      values.assignTo?.map((list: any) => {
        return { userId: list.userId, date: list.createdAt };
      });

    store
      .dispatch(
        getRunzCreateMiddleWare({
          procedureId: values.procedureName?.id,
          procedurename: values.procedureName?.title,
          testobjective: values.testObjective,
          dueDate: moment(values.setDueDate).local().toISOString(),
          assignTo: assignList,
          department: procedureList?.department?.toString(),
          labType: procedureList?.labtype?.toString(),
          createdBy: procedureList?.name?.toString(),
          organization: procedureList?.organization,
          datas: "",
        })
      )
      .then(() => {
        setLoader(false);
        Alert("Runz created successfully.");
        setCreateNewRunz(false);
        formikHelpers.resetForm();
        store.dispatch(getRunzListMiddleWare());
      })
      .catch(() => {
        setLoader(false);
      });
  };

  const formik = useFormik({
    initialValues,
    onSubmit: handleCreate,
    validate,
  });

  const assignFormik = useFormik({
    initialValues: {
      assignTo: "",
    },
    onSubmit: (values, formikHelpers) => {
      setAssign(false);
      Alert("Runs assigned successfully.");
      formikHelpers.resetForm();
    },
    validate: (values) => {
      const errors: Partial<formType> = {};
      if (isEmpty(values.assignTo)) {
        errors.assignTo = "AssignTo is required";
      }
      return errors;
    },
  });

  const shareFormik = useFormik({
    initialValues: {
      assignTo: "",
    },
    onSubmit: (values, formikHelpers) => {
      setShareModal(false);
      formikHelpers.resetForm();
      Alert("Runs shared successfully.");
    },
    validate: (values) => {
      const errors: Partial<formType> = {};
      if (isEmpty(values.assignTo)) {
        errors.assignTo = "Share is required";
      }
      return errors;
    },
  });

  return (
    <Flex
      className={styles.overAll}
      height={window.innerHeight - HEADER_HEIGHT}
    >
      {(isLoading || getUserListLoader) && <Loader />}
      <AddPeopleModal
        open={assign}
        options={getUserListdata}
        cancel={() => {
          assignFormik.resetForm();
          setAssign(false);
        }}
        formik={assignFormik}
        btnTitle="Assign"
        description="You have selected following runz to assign."
        title="Assign runz"
        onClick={assignFormik.handleSubmit}
      />
      <AddPeopleModal
        open={shareModal}
        options={getUserListdata}
        cancel={() => {
          shareFormik.resetForm();
          setShareModal(false);
        }}
        formik={shareFormik}
        btnTitle="Assign"
        description="You have selected following runz to assign."
        title="Assign runz"
        onClick={shareFormik.handleSubmit}
      />
      <CreateNewRunzModal
        formik={formik}
        title="Create new Runz"
        open={createNewRunz}
        cancelClick={() => {
          setCreateNewRunz(false);
        }}
        submit={formik.handleSubmit}
        isLoader={isLoader}
      />
      {/* <ShareRunzModal
        open={shareModal}
        shareOnClick={() => {
          Alert("Runs shared successfully.");
          setShareModal(false);
        }}
        cancelClick={() => {
          setShareModal(false);
        }}
      /> */}

      <YesOrNo
        title="Confirmation"
        icon={<SvgDelete1 />}
        open={deleteModal}
        yesClick={() => {
          Alert("Runs deleted sucessfully.");
          setDeleteModal(false);
        }}
        noClick={() => {
          setDeleteModal(false);
        }}
        description="Are you sure you want to delete the runs?"
      />
      <Table
        rowPointer
        onPageChange={handlePage}
        currentPage={currentPage}
        hideActions={selectedRows.length === 0}
        actionTitle="Runz"
        actionTitleBtn={() => (
          <Button onClick={() => setCreateNewRunz(true)}>
            <LableWithIcon label="Create runz" actionLeft={() => <SvgPlus />} />
          </Button>
        )}
        rowSelection={handleSelections}
        rowSelectionAll={handleAllSelections}
        dataSource={isData}
        columns={columns}
        rowUnSelectAll={handleAllUnSelections}
        rowDeleteAction={handleDeleteOpen}
        rowSubmitAction={handleAssignOpen}
        rowShareAction={handleShareOpen}
        pagination
        closeAction={() => {
          setSelectedRows([]);
        }}
      />
    </Flex>
  );
};

export default RunzScreen;
