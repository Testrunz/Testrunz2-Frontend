import { useEffect, useState } from "react";
import Flex from "../../packages/Flex/Flex";
import CheckBox from "../../packages/CheckBox/CheckBox";
import { isEmpty } from "../../utils/validators";
import { ACTIVE_ASSETS_BOARD } from "./mock";
import Table from "../../packages/Table/Table";
import {
  AssetsAssignedHeader,
  AssetsCreatedOnHeader,
  AssetsDetailsHeader,
  AssetsDueDateHeader,
  AssetsStatusHeader,
} from "./AssetsCustomHeader";
import Button from "../../packages/Button/Button";
import LableWithIcon from "../../common/LableWithIcon";
import SvgPlus from "../../icons/SvgPlus";
import SvgUnknown from "../../icons/SvgUnknown";
import Alert from "../../packages/Alert/Alert";
import CreateNewAssetModal from "./CreateNewAssetModal";
import styles from "./assetsscreen.module.css";
import Text from "../../packages/Text/Text";
import { useNavigate } from "react-router-dom";
import { routes } from "../../routes/routesPath";
import { HEADER_HEIGHT } from "../../utils/constants";
import { useFormik } from "formik";
import store, { RootState } from "../../redux/store";
import {
  inventoryMiddleWare,
  inventoryPostMiddleWare,
} from "./store/assetsMiddleware";
import moment from "moment";
import YesOrNo from "../../common/YesOrNo";
import SvgCancel from "../../icons/SvgCancel";
import { useSelector } from "react-redux";
import Loader from "../../packages/Loader/Loader";

export type formType = {
  name: string;
  imageUrl: any;
  purchasedate: string;
  guarantywaranty: string;
  organization: any;
  department: any;
  lab: any;
  status: any;
  availability: any;
};

const initialValues: formType = {
  name: "",
  imageUrl: "",
  purchasedate: "",
  guarantywaranty: "",
  organization: "",
  department: "",
  lab: "",
  status: "",
  availability: "",
};

const validate = (values: formType) => {
  const errors: Partial<formType> = {};
  if (isEmpty(values.name)) {
    errors.name = "Name field is required";
  }
  if (isEmpty(values.purchasedate)) {
    errors.purchasedate = "Purchase date field is required";
  }
  if (isEmpty(values.guarantywaranty)) {
    errors.guarantywaranty = "Guaranty waranty field is required";
  }
  if (isEmpty(values.availability) || values.availability?.length === 0) {
    errors.availability = "Availability field is required";
  }
  if (isEmpty(values.status) || values.status?.length === 0) {
    errors.status = "Status field is required";
  }

  if (isEmpty(values.organization)) {
    errors.organization = "Organization field is required";
  }
  if (isEmpty(values.department) || values.department?.length === 0) {
    errors.department = "Department field is required";
  }
  if (isEmpty(values.lab) || values.lab?.length === 0) {
    errors.lab = "Lab type field is required";
  }
  return errors;
};

const AssetsScreen = () => {
  const navigate = useNavigate();
  const [selectedRows, setSelectedRows] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [createNewRunz, setCreateNewRunz] = useState(false);
  const [isSelectAll, setSelectAll] = useState(false);
  const [isClose, setClose] = useState(false);

  useEffect(() => {
    store.dispatch(inventoryMiddleWare());
  }, []);

  const { data, isLoading } = useSelector(
    ({ inventoryReducers }: RootState) => {
      return {
        data: inventoryReducers.data,
        isLoading: inventoryReducers.isLoading,
      };
    }
  );

  const formik = useFormik({
    initialValues,
    validate,
    onSubmit: (values) => {
      const getDepartment = values.department?.map((list: any) => list.value);
      const getLab = values.lab?.map((list: any) => list.value);
      store
        .dispatch(
          inventoryPostMiddleWare({
            name: values.name,
            imageUrl: "",
            purchasedate: moment(values.purchasedate).format(
              "DD/MM/YYYY HH:mm"
            ),
            guarantywaranty: moment(values.guarantywaranty).format(
              "DD/MM/YYYY HH:mm"
            ),
            organisation: values.organization._id,
            department: getDepartment,
            laboratory: getLab,
            status: values.status.value,
            availability: values.availability.value,
          })
        )
        .then(() => {
          Alert("Runz created successfully.");
          setCreateNewRunz(false);
        });
    },
  });

  const columns = [
    {
      title: "",
      dataIndex: "details",
      key: "details",
      renderTitle: () => <AssetsDetailsHeader />,
      flex: 6,
      rowOnClick: (a: any) => {
        navigate(routes.RUNZ_EIDT);
      },
      render: (value: string, row: any) => {
        return (
          <Flex row>
            <Flex column className={styles.MarginRight10}>
              <SvgUnknown width={44} height={44} />
            </Flex>

            <Flex column>
              <Text color="shade-3" type="captionBold">
                {row.detailsDes} 1111
              </Text>
              <Text type="bodyBold">{value} vvvv</Text>
            </Flex>
          </Flex>
        );
      },
    },
    {
      title: "",
      dataIndex: "Createdon",
      key: "Createdon",
      flex: 1.5,
      renderTitle: () => <AssetsCreatedOnHeader />,
      align: "center",
      rowOnClick: (a: any) => {
        navigate(routes.RUNZ_EIDT);
      },
    },
    {
      title: "",
      dataIndex: "Duedate",
      key: "Duedate",
      flex: 1.5,
      renderTitle: () => <AssetsDueDateHeader />,
      align: "center",
      rowOnClick: (a: any) => {
        navigate(routes.RUNZ_EIDT);
      },
    },
    {
      title: "",
      dataIndex: "Status",
      key: "Status",
      flex: 1.5,
      renderTitle: () => <AssetsStatusHeader />,
      align: "center",
      rowOnClick: (a: any) => {
        navigate(routes.RUNZ_EIDT);
      },
    },
    {
      title: "",
      dataIndex: "Assignedby",
      key: "Assignedby",
      flex: 1.5,
      renderTitle: () => <AssetsAssignedHeader />,
      align: "center",
      rowOnClick: (a: any) => {
        navigate(routes.RUNZ_EIDT);
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
    id: any;
    filter: (arg0: (r: any) => boolean) => any[];
    length: number;
  }) => {
    if (!Array.isArray(row)) {
      if (selectedRows.includes(row.id)) {
        const updatedRow = selectedRows.filter((s) => s !== row.id);
        setSelectedRows(updatedRow);
      } else {
        setSelectedRows([...selectedRows, row.id]);
      }
    } else if (Array.isArray(row)) {
      const orderNumbers = row.filter((r) => !isEmpty(r.id)).map((r) => r.id);
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
      const orderNumbers = row.filter((r) => !isEmpty(r.id)).map((r) => r.id);
      setSelectedRows([...orderNumbers]);
      setSelectAll(true);
    }
  };

  const handleSelections = (row: any) => {
    const isChecked = !Array.isArray(row)
      ? selectedRows.includes(row.id)
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

  return (
    <Flex
      className={styles.overAll}
      height={window.innerHeight - HEADER_HEIGHT}
    >
      {isLoading && <Loader />}
      <CreateNewAssetModal
        formik={formik}
        open={createNewRunz}
        cancelClick={() => {
          setClose(true);
        }}
        suubmit={formik.handleSubmit}
      />

      <YesOrNo
        title="Confirmation"
        icon={<SvgCancel />}
        open={isClose}
        yesClick={() => {
          formik.resetForm();
          setCreateNewRunz(false);
          setClose(false);
        }}
        noClick={() => {
          setClose(false);
        }}
        description="Are you sure you want to close?"
      />
      {/* <YesOrNo
        title="Submit"
        icon={<SvgSubmitReport />}
        open={submitModal}
        yesClick={() => {
          Alert("Runs submitted successfully.");
          setSubmitModal(false);
        }}
        noClick={() => {
          setSubmitModal(false);
        }}
        description="Are you sure you want to submit the runs?"
      /> */}
      <Table
        rowPointer
        onPageChange={handlePage}
        currentPage={currentPage}
        hideActions={selectedRows.length === 0}
        actionTitle="Assets"
        actionTitleBtn={() => (
          <Button onClick={() => setCreateNewRunz(true)}>
            <LableWithIcon label="Add" actionLeft={() => <SvgPlus />} />
          </Button>
        )}
        rowSelection={handleSelections}
        rowSelectionAll={handleAllSelections}
        dataSource={ACTIVE_ASSETS_BOARD}
        columns={columns}
        rowUnSelectAll={handleAllUnSelections}
        pagination
        closeAction={() => {
          setSelectedRows([]);
        }}
      />
    </Flex>
  );
};

export default AssetsScreen;
