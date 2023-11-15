import LableWithIcon from "../../common/LableWithIcon";
import SvgEdit from "../../icons/SvgEdit";
import Flex from "../../packages/Flex/Flex";
import Text from "../../packages/Text/Text";
import styles from "./procedureseditscreen.module.css";
import Button from "../../packages/Button/Button";
import SvgPrint from "../../icons/SvgPrint";
import CreateOrEditProcedure from "./CreateOrEditProcedure";
import { useEffect, useRef, useState } from "react";
import Alert from "../../packages/Alert/Alert";
import ProceduresRichText from "./ProceduresRichText";
import { formType } from "./ProceduresScreen";
import { useFormik } from "formik";
import { isEmpty } from "../../utils/validators";
import { useSelector } from "react-redux";
import store, { RootState } from "../../redux/store";
import {
  procedureByIdMiddleWare,
  procedureUpdateMiddleWare,
} from "./store/proceduresMiddleware";
import Loader from "../../packages/Loader/Loader";
import moment from "moment";
import { useNavigate, useSearchParams } from "react-router-dom";
import { routes } from "../../routes/routesPath";
import InputText from "../../packages/InputText/InputText";
import ErrorMessage from "../../packages/ErrorMessage/ErrorMessage";

const initialValues: formType = {
  title: "",
  html: "",
};

const validate = (values: formType) => {
  const errors: Partial<formType> = {};
  if (isEmpty(values.title)) {
    errors.title = "This field is required";
  }
  return errors;
};

const ProceduresEditScreen = () => {
  const [editdProcedure, setEditdProcedure] = useState(false);
  const [isLoader, setLoader] = useState(false);
  const navigate = useNavigate();
  let [searchParams] = useSearchParams();
  const [isPrint, setPrint] = useState(false);

  useEffect(() => {
    store.dispatch(procedureByIdMiddleWare({ id: searchParams.get("id") }));
  }, []);

  const { procedureByIDData, procedureByIDisLoading, moreInfoList } =
    useSelector(
      ({ procedureByIDReducers, moreInfoListReducers }: RootState) => {
        return {
          procedureByIDData: procedureByIDReducers.data,
          procedureByIDisLoading: procedureByIDReducers.isLoading,
          moreInfoList: moreInfoListReducers.data,
        };
      }
    );

  const handleSubmit = (values: formType) => {
    setLoader(true);
    store
      .dispatch(
        procedureUpdateMiddleWare({
          id: procedureByIDData?.procedure?._id,
          title: values.title,
          html: values.html,
        })
      )
      .then(() => {
        navigate(routes.PROCEDURES);
        // store.dispatch(
        //   procedureByIdMiddleWare({ id: procedureByIDData?.procedure?._id })
        // );
        setEditdProcedure(false);
        Alert("Procedure saved successfully.");
        setLoader(false);
      });
  };

  const formik = useFormik({
    initialValues,
    onSubmit: handleSubmit,
    validate,
  });

  useEffect(() => {
    formik.setFieldValue("title", procedureByIDData?.procedure?.title);
    formik.setFieldValue("html", procedureByIDData?.procedure?.html);
  }, [procedureByIDData]);

  const getOrganization = moreInfoList?.filter(
    (list) => list._id === procedureByIDData?.user?.organization
  );
  const myDepartmentArray = procedureByIDData?.user?.department;
  const resultDepartment = myDepartmentArray?.join(",");

  const myLabArray = procedureByIDData?.user?.labtype;
  const resultLab = myLabArray?.join(",");

  return (
    <Flex id="idOfYourDiv">
      {(procedureByIDisLoading || isLoader) && <Loader />}
      <CreateOrEditProcedure
        formik={formik}
        title="Edit procedure"
        open={editdProcedure}
        submit={formik.handleSubmit}
        cancelClick={() => {
          setEditdProcedure(false);
        }}
        isLoader={isLoader}
        isEdit
        dataList={procedureByIDData}
      />
      <Flex className={styles.overAll}>
        <Flex row between center>
          <Flex>
            <Text type="captionBold" color="shade-3">
              {procedureByIDData?.procedure?._id} / {resultDepartment} /{" "}
              {resultLab} /{" "}
              {getOrganization &&
                getOrganization.length === 1 &&
                getOrganization[0]?.organization}
            </Text>
            <Text type="subTitle">{procedureByIDData?.procedure?.title}</Text>
          </Flex>
          <Button
            types="link"
            onClick={() => {
              setEditdProcedure(true);
            }}
          >
            <LableWithIcon
              labelSize={20}
              type="bodyLight"
              label="Edit"
              actionLeft={() => <SvgEdit />}
            />
          </Button>
        </Flex>
        <Flex
          height={!isPrint && window.innerHeight - 238}
          className={styles.scroll}
        >
          <Flex row className={styles.dateFlex}>
            <Flex className={styles.createFlex}>
              <Text
                className={styles.createText}
                type="captionBold"
                color="shade-3"
              >
                Created by
              </Text>
              <Text type="button-3" color="shade-3">
                {procedureByIDData?.procedure?.createdBy}
              </Text>
            </Flex>
            <Flex>
              <Text
                className={styles.createText}
                type="captionBold"
                color="shade-3"
              >
                Created on
              </Text>
              <Text type="button-3" color="shade-3">
                {moment(procedureByIDData?.procedure?.createdAt).format(
                  "DD/MM/YYYY (ddd)"
                )}
              </Text>
            </Flex>
          </Flex>
          <div style={{ marginTop: 20 }}>
            <InputText
              onChange={formik.handleChange("title")}
              label="Procedure name"
              value={formik.values.title}
            />
            <ErrorMessage
              name="title"
              errors={formik.errors}
              touched={formik.touched}
            />
          </div>
          <Text className={styles.fullText} type="captionBold">
            Full procedure
          </Text>
          <div>
            <ProceduresRichText
              value={formik.values.html}
              onEditorChange={(event: any) =>
                formik.setFieldValue("html", event)
              }
            />
          </div>
        </Flex>
      </Flex>

      <Flex row center between className={styles.footerContainer}>
        <Button onClick={() => navigate(routes.PROCEDURES)} types="tertiary-1">
          Back
        </Button>
        <Flex row center>
          <Button
            types="link"
            onClick={() => {
              setPrint(true);
              setTimeout(() => {
                window.print();
                setTimeout(() => {
                  setPrint(false);
                }, 100);
              }, 100);
            }}
          >
            <SvgPrint />
          </Button>
          <Button onClick={formik.handleSubmit} style={{ marginLeft: 20 }}>
            Save
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default ProceduresEditScreen;
