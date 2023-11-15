import Flex from "../../packages/Flex/Flex";
import Text from "../../packages/Text/Text";
import ScreenHeader from "./SettingScreenHeader";
import styles from "./rolestab.module.css";
import { useEffect, useState } from "react";
import InputRadio from "../../packages/InputRadio/InputRadio";
import Button from "../../packages/Button/Button";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import {
  getSettingMiddleWare,
  updateSettingMiddleWare,
} from "./store/settingsMiddleware";

type listInterface = {
  id: number;
  title: string;
  isAdmin: boolean;
  isRequest: boolean;
  isTest: boolean;
}[];

const RolesTab = () => {
  const dispatch: AppDispatch = useDispatch();

  const PROCEDURE_ACCESS_LIST = [
    {
      id: 1,
      title: "Can Create",
      isAdmin: true,
      isRequest: true,
      isTest: true,
    },
    {
      id: 2,
      title: "Can Delete",
      isAdmin: true,
      isRequest: true,
      isTest: true,
    },
    {
      id: 3,
      title: "Can Edit",
      isAdmin: true,
      isRequest: true,
      isTest: true,
    },
    {
      id: 4,
      title: "Can View",
      isAdmin: true,
      isRequest: true,
      isTest: true,
    },
    {
      id: 5,
      title: "Can Assign",
      isAdmin: true,
      isRequest: true,
      isTest: true,
    },
    {
      id: 6,
      title: "Can Share",
      isAdmin: true,
      isRequest: true,
      isTest: true,
    },
  ];

  const PROFILE_ACCESS_LIST = [
    {
      id: 1,
      title: "Can edit username",
      isAdmin: true,
      isRequest: true,
      isTest: true,
    },
    {
      id: 2,
      title: "Can change password",
      isAdmin: true,
      isRequest: true,
      isTest: true,
    },
    {
      id: 3,
      title: "Can edit organisation",
      isAdmin: true,
      isRequest: true,
      isTest: true,
    },
  ];
  const [procedureList, setProcedureList] = useState<listInterface>(
    PROCEDURE_ACCESS_LIST
  );
  const [profileList, setProfileList] =
    useState<listInterface>(PROFILE_ACCESS_LIST);

  const { data, moreInfoData } = useSelector(
    ({ getSettingsReducers, moreInfoUserReducers }: RootState) => {
      return {
        data: getSettingsReducers.data,
        moreInfoData: moreInfoUserReducers.data,
      };
    }
  );

  useEffect(() => {
    let resultProcedure = procedureList.map((list) => {
      if (list.id === 1 && data) {
        list.isAdmin = data?.roleSetting?.procedure.admin.create;
        list.isRequest = data?.roleSetting?.procedure.requester.create;
        list.isTest = data?.roleSetting?.procedure.tester.create;
      }
      if (list.id === 2 && data) {
        list.isAdmin = data?.roleSetting?.procedure.admin.delete;
        list.isRequest = data?.roleSetting?.procedure.requester.delete;
        list.isTest = data?.roleSetting?.procedure.tester.delete;
      }
      if (list.id === 3 && data) {
        list.isAdmin = data?.roleSetting?.procedure.admin.edit;
        list.isRequest = data?.roleSetting?.procedure.requester.edit;
        list.isTest = data?.roleSetting?.procedure.tester.edit;
      }
      if (list.id === 4 && data) {
        list.isAdmin = data?.roleSetting?.procedure.admin.view;
        list.isRequest = data?.roleSetting?.procedure.requester.view;
        list.isTest = data?.roleSetting?.procedure.tester.view;
      }
      if (list.id === 5 && data) {
        list.isAdmin = data?.roleSetting?.procedure.admin.assign;
        list.isRequest = data?.roleSetting?.procedure.requester.assign;
        list.isTest = data?.roleSetting?.procedure.tester.assign;
      }
      if (list.id === 6 && data) {
        list.isAdmin = data?.roleSetting?.procedure.admin.share;
        list.isRequest = data?.roleSetting?.procedure.requester.share;
        list.isTest = data?.roleSetting?.procedure.tester.share;
      }
      return list;
    });
    setProcedureList(resultProcedure);

    let resultProfile = profileList.map((list) => {
      if (list.id === 1 && data) {
        list.isAdmin = data?.roleSetting?.profile.admin.edituser;
        list.isRequest = data?.roleSetting?.profile.requester.edituser;
        list.isTest = data?.roleSetting?.profile.tester.edituser;
      }
      if (list.id === 2 && data) {
        list.isAdmin = data?.roleSetting?.profile.admin.changepass;
        list.isRequest = data?.roleSetting?.profile.requester.changepass;
        list.isTest = data?.roleSetting?.profile.tester.changepass;
      }
      if (list.id === 3 && data) {
        list.isAdmin = data?.roleSetting?.profile.admin.editorg;
        list.isRequest = data?.roleSetting?.profile.requester.editorg;
        list.isTest = data?.roleSetting?.profile.tester.editorg;
      }

      return list;
    });
    setProfileList(resultProfile);
  }, [data]);

  const handleUpdate = (
    data: any,
    value: "admin" | "test" | "request",
    booleanVal: boolean,
    head: "procedure" | "profile"
  ) => {
    const dataObj = data;
    const moduleHead = head;

    if (moduleHead === "procedure") {
      const updated = procedureList.map((list) => {
        if (list.id === dataObj.id) {
          if (value === "admin") {
            list.isAdmin = booleanVal;
          }
          if (value === "test") {
            list.isTest = booleanVal;
          }
          if (value === "request") {
            list.isRequest = booleanVal;
          }
          return list;
        } else {
          return list;
        }
      });
      setProcedureList(updated);
    } else if (moduleHead === "profile") {
      const updated = profileList.map((list) => {
        if (list.id === dataObj.id) {
          if (value === "admin") {
            list.isAdmin = booleanVal;
          }
          if (value === "test") {
            list.isTest = booleanVal;
          }
          if (value === "request") {
            list.isRequest = booleanVal;
          }
          return list;
        } else {
          return list;
        }
      });
      setProfileList(updated);
    }
  };

  const handleSave = () => {
    dispatch(
      updateSettingMiddleWare({
        id: moreInfoData?.organization,
        roleSetting: {
          procedure: {
            admin: {
              create: procedureList[0].isAdmin,
              delete: procedureList[1].isAdmin,
              edit: procedureList[2].isAdmin,
              view: procedureList[3].isAdmin,
              assign: procedureList[4].isAdmin,
              share: procedureList[5].isAdmin,
            },
            requester: {
              create: procedureList[0].isRequest,
              delete: procedureList[1].isRequest,
              edit: procedureList[2].isRequest,
              view: procedureList[3].isRequest,
              assign: procedureList[4].isRequest,
              share: procedureList[5].isRequest,
            },
            tester: {
              create: procedureList[0].isTest,
              delete: procedureList[1].isTest,
              edit: procedureList[2].isTest,
              view: procedureList[3].isTest,
              assign: procedureList[4].isTest,
              share: procedureList[5].isTest,
            },
          },
          profile: {
            admin: {
              edituser: profileList[0].isAdmin,
              changepass: profileList[1].isAdmin,
              editorg: profileList[2].isAdmin,
            },
            requester: {
              edituser: profileList[0].isRequest,
              changepass: profileList[1].isRequest,
              editorg: profileList[2].isRequest,
            },
            tester: {
              edituser: profileList[0].isTest,
              changepass: profileList[1].isTest,
              editorg: profileList[2].isTest,
            },
          },
        },
      })
    ).then(() => {
      dispatch(getSettingMiddleWare({ id: moreInfoData?.organization }));
    });
  };

  return (
    <Flex between>
      <Flex>
        <ScreenHeader
          title={"Role Management"}
          description={
            "Select the kinds of notifications you get about your activities and recommendations."
          }
        />
        <Text
          style={{ marginTop: 20, marginBottom: 20 }}
          type="button-3"
          color="shade-2"
          align="center"
        >
          Access control
        </Text>
        <Flex row center flex={1} className={styles.headerFlex}>
          <Flex flex={7.5}>
            <Text type="button-2">Action</Text>
          </Flex>
          <Flex flex={1.5} center>
            <Text type="button-2">Admin</Text>
          </Flex>
          <Flex flex={1.5} center>
            <Text type="button-2">Requester</Text>
          </Flex>

          <Flex flex={1.5} center>
            <Text type="button-2">Tester</Text>
          </Flex>
        </Flex>

        <Flex className={styles.overFlow} height={window.innerHeight - 345}>
          <Flex marginTop={20} marginBottom={20} row center flex={1}>
            <Flex flex={7.5}>
              <Text type="button-3">Procedure</Text>
              <Text style={{ marginTop: 4 }} type="bodyMedium" color="shade-2">
                Control the actions of users under procedure section.
              </Text>
            </Flex>
            <Flex flex={1.5}>
              <></>
            </Flex>
            <Flex flex={1.5}>
              <></>
            </Flex>
            <Flex flex={1.5}>
              <></>
            </Flex>
          </Flex>
          {procedureList.map((list) => {
            return (
              <Flex
                key={list.title}
                row
                center
                flex={1}
                className={styles.procedureListFlex}
              >
                <Flex flex={7.5}>
                  <Text type="bodyMedium" color="shade-2">
                    {list.title}
                  </Text>
                </Flex>
                <Flex flex={1.5} center>
                  <InputRadio
                    checked={list.isAdmin}
                    onClick={() =>
                      handleUpdate(
                        list,
                        "admin",
                        list.isAdmin ? false : true,
                        "procedure"
                      )
                    }
                  />
                </Flex>
                <Flex flex={1.5} center>
                  <InputRadio
                    checked={list.isRequest}
                    onClick={() =>
                      handleUpdate(
                        list,
                        "request",
                        list.isRequest ? false : true,
                        "procedure"
                      )
                    }
                  />
                </Flex>

                <Flex flex={1.5} center>
                  <InputRadio
                    checked={list.isTest}
                    onClick={() =>
                      handleUpdate(
                        list,
                        "test",
                        list.isTest ? false : true,
                        "procedure"
                      )
                    }
                  />
                </Flex>
              </Flex>
            );
          })}
          <Flex marginTop={20} marginBottom={20} row center flex={1}>
            <Flex flex={7.5}>
              <Text type="button-3">Profile</Text>
              <Text style={{ marginTop: 4 }} type="bodyMedium" color="shade-2">
                Control the actions of users under profile section.
              </Text>
            </Flex>
            <Flex flex={1.5}>
              <></>
            </Flex>
            <Flex flex={1.5}>
              <></>
            </Flex>
            <Flex flex={1.5}>
              <></>
            </Flex>
          </Flex>
          {profileList.map((list) => {
            return (
              <Flex
                key={list.title}
                row
                center
                flex={1}
                className={styles.procedureListFlex}
              >
                <Flex flex={7.5}>
                  <Text type="bodyMedium" color="shade-2">
                    {list.title}
                  </Text>
                </Flex>
                <Flex flex={1.5} center>
                  <InputRadio
                    checked={list.isAdmin}
                    onClick={() =>
                      handleUpdate(
                        list,
                        "admin",
                        list.isAdmin ? false : true,
                        "profile"
                      )
                    }
                  />
                </Flex>
                <Flex flex={1.5} center>
                  <InputRadio
                    checked={list.isRequest}
                    onClick={() =>
                      handleUpdate(
                        list,
                        "request",
                        list.isRequest ? false : true,
                        "profile"
                      )
                    }
                  />
                </Flex>

                <Flex flex={1.5} center>
                  <InputRadio
                    checked={list.isTest}
                    onClick={() =>
                      handleUpdate(
                        list,
                        "test",
                        list.isTest ? false : true,
                        "profile"
                      )
                    }
                  />
                </Flex>
              </Flex>
            );
          })}
        </Flex>
      </Flex>

      <Flex end className={styles.footer}>
        <Button types="primary" onClick={handleSave}>
          Save
        </Button>
      </Flex>
    </Flex>
  );
};

export default RolesTab;
