import { Modal } from "antd";
import styles from "./createnewusermodal.module.css";
import Flex from "../../packages/Flex/Flex";
import Button from "../../packages/Button/Button";
import Text from "../../packages/Text/Text";
import SvgClose from "../../icons/SvgClose";
import SelectTag from "../../packages/SelectTag/SelectTag";
import InputText from "../../packages/InputText/InputText";
import { FormikProps } from "formik";
import { MoreInfoList } from "../MyPageModule/store/mypage.types";
import ErrorMessage from "../../packages/ErrorMessage/ErrorMessage";
import { designationOptions } from "../LoginModule/mock";
import { STATUS_OPTIONS } from "./mock";
import Loader from "../../packages/Loader/Loader";

type Props = {
  open: boolean;
  cancel: () => void;
  submit: () => void;
  formik: FormikProps<any>;
  getDepartmentOption: any;
  moreInfoList: MoreInfoList[];
  isLoader: boolean;
  isEdit?: boolean;
};
const CreateNewUserModal = ({
  open,
  submit,
  cancel,
  formik,
  getDepartmentOption,
  moreInfoList,
  isLoader,
  isEdit,
}: Props) => {
  return (
    <Modal
      width={900}
      onCancel={cancel}
      title={<Text type="title">{isEdit ? "Edit" : "Create new"} user</Text>}
      closeIcon={<SvgClose />}
      centered
      open={open}
      footer={
        <Flex row end center className={styles.footer}>
          {isLoader && <Loader />}
          <Button
            onClick={cancel}
            className={styles.cancelBtn}
            types="secondary"
          >
            Cancel
          </Button>
          <Button onClick={submit} className={styles.yesBtn}>
            Save
          </Button>
        </Flex>
      }
    >
      <Flex marginTop={20}>
        <Flex row flex={1}>
          <Flex flex={1} marginRight={8}>
            <InputText
              value={formik.values.firstName}
              onChange={formik.handleChange("firstName")}
              label="First name"
              required
              placeholder="First name"
            />
            <ErrorMessage
              name="firstName"
              touched={formik.touched}
              errors={formik.errors}
            />
          </Flex>
          <Flex flex={1} marginLeft={8}>
            <InputText
              value={formik.values.lastName}
              onChange={formik.handleChange("lastName")}
              placeholder="Last name"
              label="Last name"
              required
            />
            <ErrorMessage
              name="lastName"
              touched={formik.touched}
              errors={formik.errors}
            />
          </Flex>
        </Flex>
        <Flex row marginTop={20} marginBottom={20}>
          <Flex flex={1} marginRight={8}>
            <InputText
              value={formik.values.email}
              onChange={formik.handleChange("email")}
              placeholder="username@gmail.com"
              label="Email"
              required
            />
            <ErrorMessage
              name="email"
              touched={formik.touched}
              errors={formik.errors}
            />
          </Flex>
          <Flex flex={1} marginLeft={8}>
            <SelectTag
              required
              value={formik.values.organization}
              onChange={(event) => {
                formik.setFieldValue("department", "");
                formik.setFieldValue("lab", "");
                formik.setFieldValue("organization", {
                  organization: event.organization,
                  _id: event._id,
                });
              }}
              options={moreInfoList}
              placeholder="Select"
              label="Organization"
              getOptionLabel={(option) => option.organization}
              getOptionValue={(option) => option._id}
            />
            <ErrorMessage
              name="organization"
              touched={formik.touched}
              errors={formik.errors}
            />
          </Flex>
        </Flex>
        <Flex row>
          <Flex flex={1} marginRight={8}>
            <SelectTag
              isMulti
              required
              value={formik.values.department}
              onChange={(event) => {
                formik.setFieldValue("department", event);
              }}
              options={
                getDepartmentOption?.department
                  ? getDepartmentOption?.department
                  : []
              }
              placeholder="Select"
              label="Department"
            />
            <ErrorMessage
              name="department"
              touched={formik.touched}
              errors={formik.errors}
            />
          </Flex>
          <Flex flex={1} marginLeft={8}>
            <SelectTag
              required
              isMulti
              value={formik.values.lab}
              onChange={(event) => {
                formik.setFieldValue("lab", event);
              }}
              options={
                getDepartmentOption?.labtype ? getDepartmentOption?.labtype : []
              }
              placeholder="Select"
              label="Lab Types"
            />
            <ErrorMessage
              name="department"
              touched={formik.touched}
              errors={formik.errors}
            />
          </Flex>
        </Flex>
        <Flex row marginTop={20} marginBottom={20}>
          <Flex flex={1} marginRight={8}>
            <SelectTag
              required
              options={designationOptions}
              label="Select role"
              onChange={(event) => {
                formik.setFieldValue("role", event);
              }}
              value={formik.values.role}
            />
            <ErrorMessage
              name="role"
              touched={formik.touched}
              errors={formik.errors}
            />
          </Flex>
          <Flex flex={1} marginLeft={8}>
            <SelectTag
              required
              label="Current status"
              options={STATUS_OPTIONS}
              onChange={(event) => {
                formik.setFieldValue("status", event);
              }}
              value={formik.values.status}
            />
            <ErrorMessage
              name="status"
              touched={formik.touched}
              errors={formik.errors}
            />
          </Flex>
        </Flex>
      </Flex>
    </Modal>
  );
};

export default CreateNewUserModal;
