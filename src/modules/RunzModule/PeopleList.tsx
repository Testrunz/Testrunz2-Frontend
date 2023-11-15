import { FormikProps } from "formik";
import LableWithIcon from "../../common/LableWithIcon";
import SvgPlus from "../../icons/SvgPlus";
import Button from "../../packages/Button/Button";
import Flex from "../../packages/Flex/Flex";
import Text from "../../packages/Text/Text";
import AddPeopleModal from "./AddPeopleModal";
import styles from "./peoplelist.module.css";
import { formType } from "./RunzScreen";
import { useState } from "react";
import SvgUserProfile from "../../icons/SvgUserProfile";
import ErrorMessage from "../../packages/ErrorMessage/ErrorMessage";

type Props = {
  items: any;
  title: string;
  options: any[];
  formik: FormikProps<formType>;
};

const PeopleList = ({ items, title, options, formik }: Props) => {
  const [isAdd, setAdd] = useState(false);

  return (
    <>
      <AddPeopleModal
        cancel={() => setAdd(false)}
        open={isAdd}
        options={options}
        formik={formik}
        onClick={() => setAdd(false)}
      />
      <Flex className={styles.shareContainer}>
        <Text color="shade-2" type="captionBold">
          {title}
        </Text>
        <Flex row center marginTop={16}>
          {items?.length > 0 && (
            <Flex row center marginRight={16}>
              {items.slice(0, 4).map((item: any, index: any) => {
                return (
                  <Flex row center key={index.toString()}>
                    {item?.imageUrl ? (
                      <img
                        title={item?.name}
                        style={{ borderRadius: 100, height: 40, width: 40 }}
                        src={item?.imageUrl}
                      />
                    ) : (
                      <div title={item?.name}>
                        <SvgUserProfile height={48} width={48} />
                      </div>
                    )}
                  </Flex>
                );
              })}
              {items.length > 4 && (
                <Text style={{ marginLeft: 4 }} type="bodyMedium">
                  +{items.length - 4}more
                </Text>
              )}
            </Flex>
          )}

          <Button onClick={() => setAdd(true)} types="tertiary" height="small">
            <LableWithIcon
              type="bodyMedium"
              actionLeft={() => <SvgPlus />}
              label="Add"
            />
          </Button>
        </Flex>
        <ErrorMessage
          name="assignTo"
          touched={formik.touched}
          errors={formik.errors}
        />
      </Flex>
    </>
  );
};

export default PeopleList;
