import { useState, useEffect } from "react";
import Flex from "../../packages/Flex/Flex";
import Text from "../../packages/Text/Text";
import styles from "./notificationtab.module.css";
import Switch from "../../packages/Switch/Switch";
import SettingScreenHeader from "./SettingScreenHeader";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import {
  getSettingMiddleWare,
  updateSettingMiddleWare,
} from "./store/settingsMiddleware";
import { NOTIFICATION_LIST } from "./mock";

const NotificationTab = () => {
  const dispatch: AppDispatch = useDispatch();
  const [cardDetails, setCardDetails] = useState<any>(NOTIFICATION_LIST);

  const { data, moreInfoData } = useSelector(
    ({ getSettingsReducers, moreInfoUserReducers }: RootState) => {
      return {
        data: getSettingsReducers.data,
        moreInfoData: moreInfoUserReducers.data,
      };
    }
  );

  useEffect(() => {
    let result = cardDetails.map((list: any) => {
      if (list.id === 1 && data) {
        list.isEmailActive = data?.notification?.procdure.mail;
        list.isNotifyActive = data?.notification?.procdure.notification;
      }
      if (list.id === 2 && data) {
        list.isEmailActive = data?.notification?.tasksubmit.mail;
        list.isNotifyActive = data?.notification?.tasksubmit.notification;
      }
      if (list.id === 3 && data) {
        list.isEmailActive = data?.notification?.message.mail;
        list.isNotifyActive = data?.notification?.message.notification;
      }
      return list;
    });
    setCardDetails(result);
  }, [data]);

  const handleChange = (id: number, value: boolean, val: string) => {
    const updated = cardDetails.map((res: any) => {
      if (res.id === id) {
        if (val === "notify") {
          res.isNotifyActive = value;
        }
        if (val === "email") {
          res.isEmailActive = value;
        }

        return res;
      } else {
        return res;
      }
    });
    setCardDetails(updated);
    handleSave();
  };

  const handleSave = () => {
    dispatch(
      updateSettingMiddleWare({
        id: moreInfoData?.organization,
        notification: {
          procdure: {
            notification: cardDetails[0].isNotifyActive,
            mail: cardDetails[0].isEmailActive,
          },
          tasksubmit: {
            notification: cardDetails[1].isNotifyActive,
            mail: cardDetails[1].isEmailActive,
          },
          message: {
            notification: cardDetails[2].isNotifyActive,
            mail: cardDetails[2].isEmailActive,
          },
        },
      })
    ).then(() => {
      dispatch(getSettingMiddleWare({ id: moreInfoData?.organization }));
    });
  };

  return (
    <Flex between flex={1}>
      <Flex>
        <SettingScreenHeader
          title={"Notification Settings"}
          description={
            "Select the kinds of notifications you get about your activities and recommendations."
          }
        />

        <Flex className={styles.alertContainer}>
          <Text type="button-4" color="shade-2">
            Alerts
          </Text>
          <Text style={{ marginTop: 4 }} type="bodyMedium" color="shade-2">
            Select the options you want to get alerted via email and
            notification.
          </Text>
        </Flex>

        {cardDetails.map((list: any) => {
          return (
            <Flex row between className={styles.listContainer}>
              <Flex column>
                <Text type="button-3">{list.heading}</Text>
                <Text
                  type="bodyMedium"
                  color="shade-2"
                  style={{ marginTop: 8 }}
                >
                  {list.subHead}
                </Text>
              </Flex>

              <Flex between end>
                <Switch
                  left
                  label="Notification"
                  labelColor="gray"
                  checked={list.isNotifyActive}
                  onClick={() =>
                    handleChange(
                      list.id,
                      list.isNotifyActive ? false : true,
                      "notify"
                    )
                  }
                />
                <Switch
                  left
                  label="Email"
                  labelColor="gray"
                  checked={list.isEmailActive}
                  onClick={() =>
                    handleChange(
                      list.id,
                      list.isEmailActive ? false : true,
                      "email"
                    )
                  }
                />
              </Flex>
            </Flex>
          );
        })}
      </Flex>
    </Flex>
  );
};

export default NotificationTab;
