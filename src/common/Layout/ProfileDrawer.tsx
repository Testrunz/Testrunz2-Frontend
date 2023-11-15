import { useRef } from "react";
import SvgClose from "../../icons/SvgClose";
import SvgLogOut from "../../icons/SvgLogOut";
import SvgProfileEdit from "../../icons/SvgProfileEdit";
import SvgUserInput from "../../icons/SvgUserInput";
import Button from "../../packages/Button/Button";
import Drawer from "../../packages/Drawer/Drawer";
import Flex from "../../packages/Flex/Flex";
import InputText from "../../packages/InputText/InputText";
import Text from "../../packages/Text/Text";
import { textShade1 } from "../../theme/colors";
import LableWithIcon from "../LableWithIcon";
import styles from "./profiledrawer.module.scss";
import { FormikProps } from "formik";
import { formType } from "./Layout";
import SelectTag from "../../packages/SelectTag/SelectTag";
import ErrorMessage from "../../packages/ErrorMessage/ErrorMessage";
import {
  MoreInfoList,
  MoreInfoUser,
} from "../../modules/MyPageModule/store/mypage.types";
import { designationOptions } from "../../modules/LoginModule/mock";
import Loader from "../../packages/Loader/Loader";

const userFrame = require("../../images/userFrame.png");

type Props = {
  open: boolean;
  onClose: () => void;
  handleLogout: () => void;
  formik: FormikProps<formType>;
  setEdit: (a: boolean) => void;
  isEdit: boolean;
  moreInfoData: MoreInfoUser;
  moreInfoList: MoreInfoList[];
  getDepartmentOption: any;
  isLoader: boolean;
};

const ProfileDrawer = ({
  open,
  onClose,
  handleLogout,
  formik,
  setEdit,
  isEdit,
  moreInfoList,
  moreInfoData,
  getDepartmentOption,
  isLoader,
}: Props) => {
  const fileInputRef = useRef<any>(null);
  const handleProfileClick = () => {
    if (fileInputRef && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleEditOpen = () => setEdit(false);

  return (
    <Drawer open={open} onClose={onClose}>
      <Flex className={styles.overAll}>
        {isLoader && <Loader />}

        <img alt="bg" className={styles.image} src={userFrame} />
        <Flex row center between className={styles.titleFlex}>
          <Button types="link" onClick={onClose}>
            <SvgClose fill={textShade1} />
          </Button>
          <Button types="link" onClick={handleLogout}>
            <LableWithIcon
              label="Logout"
              type="bodyBold"
              actionRight={() => <SvgLogOut />}
            />
          </Button>
        </Flex>
        <Flex center>
          <input
            style={{ display: "none" }}
            ref={fileInputRef}
            accept="image/*"
            type="file"
            onChange={(event: any) => {
              formik.setFieldValue("profile", event.target.files[0]);
            }}
          />

          <Flex center middle>
            <SvgProfileEdit isEdit={isEdit} onClick={handleProfileClick} />

            {formik.values.profile?.name ? (
              <img
                style={{
                  position: "absolute",
                  borderRadius: 100,
                  objectFit: "cover",
                }}
                height={168}
                width={168}
                src={URL.createObjectURL(formik.values.profile)}
              />
            ) : (
              <img
                style={{
                  position: "absolute",
                  borderRadius: 100,
                  objectFit: "cover",
                }}
                height={168}
                width={168}
                src={formik.values.profile}
              />
            )}
          </Flex>
          <Button
            disabled={!isEdit}
            onClick={handleEditOpen}
            height="small"
            className={styles.editBtn}
          >
            <Text type="smallBold">Edit profile</Text>
          </Button>
        </Flex>
        <Flex row flex={1}>
          <Flex flex={1} className={styles.inputFlexMarginRight}>
            <InputText
              disabled={isEdit}
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
          <Flex flex={1} className={styles.inputFlexMarginLeft}>
            <InputText
              disabled={isEdit}
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
        <Flex flex={1} className={styles.marginVer}>
          <InputText
            disabled={isEdit}
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

        <div style={{ flex: 1 }}>
          <SelectTag
            isDisabled={isEdit}
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
        </div>

        <div style={{ flex: 1 }} className={styles.marginVer}>
          <SelectTag
            isMulti
            isDisabled={isEdit}
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
        </div>
        <div style={{ flex: 1 }}>
          <SelectTag
            isDisabled={isEdit}
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
            name="lab"
            touched={formik.touched}
            errors={formik.errors}
          />
        </div>
        <Flex row flex={1} marginTop={16}>
          <Flex flex={1} className={styles.inputFlexMarginRight}>
            <SelectTag
              value={designationOptions.filter(
                (option) => option.value === moreInfoData?.role
              )}
              required
              isDisabled
              options={designationOptions}
              label="Designation"
            />
          </Flex>
          <Flex flex={1} className={styles.inputFlexMarginLeft}>
            <InputText
              disabled
              value={moreInfoData?.userCounter}
              label="Requestor ID/Tester ID"
              required
              actionLeft={() => <SvgUserInput />}
            />
          </Flex>
        </Flex>
        {
          <Flex marginTop={30}>
            <Text type="captionBold" size={14}>
              Labs assigned
            </Text>
            {Array.isArray(formik.values?.lab) && (
              <Flex row>
                {formik.values?.lab?.map((list: any) => {
                  return (
                    <Text key={list.label} className={styles.labsAssign}>
                      {list.label}
                    </Text>
                  );
                })}
              </Flex>
            )}
          </Flex>
        }
        <Flex end marginTop={20}>
          <Button disabled={isEdit} onClick={formik.handleSubmit}>
            Save
          </Button>
        </Flex>
      </Flex>
    </Drawer>
  );
};

export default ProfileDrawer;
