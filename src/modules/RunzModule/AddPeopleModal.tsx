import { Modal } from "antd";
import Text from "../../packages/Text/Text";
import SvgClose from "../../icons/SvgClose";
import Flex from "../../packages/Flex/Flex";
import styles from "./addpeoplemodal.module.css";
import Button from "../../packages/Button/Button";
import SelectTag from "../../packages/SelectTag/SelectTag";
import { FormikProps } from "formik";
import { formType } from "./RunzScreen";
import ErrorMessage from "../../packages/ErrorMessage/ErrorMessage";

type Props = {
  options: any[];
  formik: FormikProps<any>;
  open: boolean;
  cancel: () => void;
  btnTitle?: string;
  description?: string;
  title?: string;
  onClick: () => void;
};

const AddPeopleModal = ({
  options,
  formik,
  open,
  cancel,
  btnTitle = "Save",
  description = "You have selected following people",
  title = "Add people",
  onClick,
}: Props) => {
  return (
    <Modal
      width={700}
      onCancel={cancel}
      title={<Text type="title">{title}</Text>}
      closeIcon={<SvgClose />}
      centered
      open={open}
      footer={
        <Flex row className={styles.footer}>
          <Button
            types="secondary"
            onClick={cancel}
            className={styles.cancelBtn}
          >
            Cancel
          </Button>
          <Button onClick={onClick} className={styles.yesBtn}>
            {btnTitle}
          </Button>
        </Flex>
      }
    >
      <Flex>
        <SelectTag
          value={formik.values.assignTo}
          label={description}
          options={options}
          isMulti
          isClearable
          isSearchable
          getOptionLabel={(option) => option.name}
          getOptionValue={(option) => option.userId}
          inputHeight={500}
          inputMaxHeight
          onChange={(event) => {
            if (event) {
              formik.setFieldValue("assignTo", event);
            } else {
              formik.setFieldValue("assignTo", "");
            }
          }}
        />
        <ErrorMessage
          name="assignTo"
          touched={formik.touched}
          errors={formik.errors}
        />
      </Flex>
    </Modal>
  );
};

export default AddPeopleModal;
