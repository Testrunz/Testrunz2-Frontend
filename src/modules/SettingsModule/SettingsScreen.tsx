import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import classNames from "classnames/bind";
import Flex from "../../packages/Flex/Flex";
import Text from "../../packages/Text/Text";
import styles from "./settingsscreen.module.css";
import SvgNotify from "../../icons/SvgNotify";
import SvgProfile from "../../icons/SvgProfile";
import SvgUser from "../../icons/SvgUser";
import SvgRole from "../../icons/SvgRole";
import NotificationTab from "./NotificationTab";
import ProfileTab from "./ProfileTab";
import UserTab from "./UserTab";
import RolesTab from "./RolesTab";
import { textShade1, textShade3 } from "../../theme/colors";
import Button from "../../packages/Button/Button";
import { HEADER_HEIGHT } from "../../utils/constants";
import { AppDispatch, RootState } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { getSettingMiddleWare } from "./store/settingsMiddleware";
import { isEmpty } from "../../utils/validators";
import Loader from "../../packages/Loader/Loader";

const cx = classNames.bind(styles);

const SettingsScreen = () => {
  const dispatch: AppDispatch = useDispatch();
  let [searchParams, setSearchParams] = useSearchParams({
    type: "notification",
  });

  let getType = searchParams.get("type");

  const { moreInfoData, isLoading, updateLoading, getUserListLoader } =
    useSelector(
      ({
        moreInfoUserReducers,
        getSettingsReducers,
        updateSettingsReducers,
        getUserListReducers,
      }: RootState) => {
        return {
          moreInfoData: moreInfoUserReducers.data,
          isLoading: getSettingsReducers.isLoading,
          updateLoading: updateSettingsReducers.isLoading,
          getUserListLoader: getUserListReducers.isLoading,
        };
      }
    );

  useEffect(() => {
    if (!isEmpty(moreInfoData?.organization)) {
      dispatch(getSettingMiddleWare({ id: moreInfoData?.organization }));
    }
  }, [moreInfoData?.organization]);

  const handleChangeSettings = (value: string) => {
    setSearchParams({ type: value });
  };

  const settingsModuleList = [
    {
      id: "notification",
      title: "Notification Settings",
      icon: (
        <SvgNotify
          fill={getType === "notification" ? textShade1 : textShade3}
        />
      ),
    },
    {
      id: "profile",
      title: "Profile Settings",
      icon: (
        <SvgProfile fill={getType === "profile" ? textShade1 : textShade3} />
      ),
    },
    {
      id: "user",
      title: "User Management",
      icon: <SvgUser fill={getType === "user" ? textShade1 : textShade3} />,
    },
    {
      id: "role",
      title: "Role Management",
      icon: <SvgRole fill={getType === "role" ? textShade1 : textShade3} />,
    },
  ];

  return (
    <Flex
      className={styles.overAll}
      height={window.innerHeight - HEADER_HEIGHT}
    >
      {(isLoading || updateLoading || getUserListLoader) && <Loader />}
      <Flex row flex={1}>
        <Flex width={300} className={styles.leftContainer}>
          <Text type="subTitle" color="shade-2" className={styles.settingText}>
            Settings
          </Text>

          {settingsModuleList.map((list: any) => {
            return (
              <Button
                types="link"
                onClick={() => handleChangeSettings(list.id)}
                className={cx("listText", {
                  activeModule: getType === list.id,
                })}
              >
                <Flex row>
                  {list.icon}
                  <Text
                    align="start"
                    color={getType === list.id ? "primary" : "shade-3"}
                    style={{ marginLeft: 8 }}
                    type="bodyBold"
                  >
                    {list.title}
                  </Text>
                </Flex>
              </Button>
            );
          })}
        </Flex>

        <Flex className={styles.rightOverall} height={window.innerHeight - 82}>
          {getType === "notification" && <NotificationTab />}
          {getType === "profile" && <ProfileTab />}
          {getType === "user" && <UserTab />}
          {getType === "role" && <RolesTab />}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default SettingsScreen;
