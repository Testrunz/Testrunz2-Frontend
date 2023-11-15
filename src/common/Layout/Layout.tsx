import { ReactChild, useEffect, useMemo, useState } from "react";
import { Layout as LayoutAntd, Menu } from "antd";
import styles from "./layout.module.css";
import SvgMenu from "../../icons/SvgMenu";
import Button from "../../packages/Button/Button";
import classNames from "classnames/bind";
import SvgMypage from "../../icons/SvgMypage";
import SvgRunz from "../../icons/SvgRunz";
import SvgProcedures from "../../icons/SvgProcedures";
import SvgProjects from "../../icons/SvgProjects";
import SvgAssets from "../../icons/SvgAssets";
import SvgSettings from "../../icons/SvgSettings";
import SvgDoller from "../../icons/SvgDoller";
import { routes } from "../../routes/routesPath";
import { gray3, textShade1 } from "../../theme/colors";
import { useNavigate } from "react-router-dom";
import SvgTestRunz from "../../icons/SvgTestRunz";
import Flex from "../../packages/Flex/Flex";
import InputText from "../../packages/InputText/InputText";
import SvgQuestionRound from "../../icons/SvgQuestionRound";
import SvgBell from "../../icons/SvgBell";
import Text from "../../packages/Text/Text";
import SvgUserProfile from "../../icons/SvgUserProfile";
import SvgSearch from "../../icons/SvgSearch";
import SvgSeePlans from "../../icons/SvgSeePlans";
import ProfileDrawer from "./ProfileDrawer";
import NotificationDrawer from "./NotificationDrawer";
import { AUTH_TOKEN } from "../../utils/localStoreConst";
import InsideClickHandler from "./InsideClickHandler";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { isEmpty } from "../../utils/validators";
import {
  authMeMiddleWare,
  authMeUpdateMiddleWare,
  uploadMiddleWare,
} from "../../modules/LoginModule/store/loginMiddleware";
import {
  moreInfoListMiddleWare,
  moreInfoMiddleWare,
  moreInfoUserMiddleWare,
} from "../../modules/MyPageModule/store/mypageMiddleware";
import { useFormik } from "formik";
import Loader from "../../packages/Loader/Loader";
import { useAuth } from "../../utils/ProtectedRoutes";
import { ROLE_REQUESTER, ROLE_TESTER } from "../../utils/constants";

const cx = classNames.bind(styles);

const { Header, Sider, Content } = LayoutAntd;

export type formType = {
  firstName: string;
  lastName: string;
  email: string;
  organization: any;
  department: any;
  lab: any;
  profile: any;
};

const initialValues: formType = {
  firstName: "",
  lastName: "",
  email: "",
  organization: "",
  department: "",
  lab: "",
  profile: "",
};

const validate = (values: formType) => {
  const errors: Partial<formType> = {};
  if (isEmpty(values.firstName)) {
    errors.firstName = "First Name field is required";
  }
  if (isEmpty(values.lastName)) {
    errors.lastName = "Last Name field is required";
  }
  if (isEmpty(values.email)) {
    errors.email = "Email field is required";
  }

  if (isEmpty(values.organization)) {
    errors.organization = "organization field is required";
  }
  if (isEmpty(values.department) || values.department?.length === 0) {
    errors.department = "Department field is required";
  }
  if (isEmpty(values.lab) || values.lab?.length === 0) {
    errors.lab = "Lab type field is required";
  }
  return errors;
};

type Props = {
  children: ReactChild;
};

const svgFill = (value: boolean) => {
  return value ? textShade1 : gray3;
};

const Layout = ({ children }: Props) => {
  const dispatch: AppDispatch = useDispatch();
  const [collapsed, setCollapsed] = useState(true);
  const navigate = useNavigate();
  const [isDrawer, setDrawer] = useState(false);
  const [isNoti, setNoti] = useState(false);
  const [isEdit, setEdit] = useState(true);
  const auth = useAuth();
  const hideLayout =
    window.location.pathname === routes.LOGIN ||
    window.location.pathname === routes.FORGOT_PASSWORD ||
    window.location.pathname === routes.SIGNUP;

  useEffect(() => {
    dispatch(moreInfoListMiddleWare());
    if (auth) {
      // dispatch(authMeMiddleWare());
      dispatch(moreInfoUserMiddleWare());
    }
  }, [auth]);

  const { moreInfoData, moreInfoList, uploadLoader, updateLoader, data } =
    useSelector(
      ({
        authMeReducers,
        moreInfoUserReducers,
        moreInfoListReducers,
        uploadReducers,
        moreInfoUserUpdateReducers,
      }: RootState) => {
        return {
          moreInfoData: moreInfoUserReducers.data,
          moreInfoList: moreInfoListReducers.data,
          uploadLoader: uploadReducers.isLoading,
          updateLoader: moreInfoUserUpdateReducers.isLoading,
          authMeLoader: authMeReducers.isLoading,
          moreInfoUserLoader: moreInfoUserReducers.isLoading,
          data: authMeReducers.data,
        };
      }
    );

  const roleTester = data?.role === ROLE_TESTER;
  const roleRequester = data?.role === ROLE_REQUESTER;

  const handleSubmit = (values: formType) => {
    const getDepartment = values.department.map((list: any) => list.value);
    const getLab = values.lab.map((list: any) => list.value);

    if (values.profile?.name) {
      let formData = new FormData();
      formData.append("image", values.profile);
      dispatch(uploadMiddleWare({ formData })).then((res) => {
        if (res.payload?.imageUrl) {
          const beforeQuestionMark = res.payload.imageUrl.split("?")[0];
          dispatch(
            moreInfoMiddleWare({
              activeStatus: false,
              imageUrl: beforeQuestionMark,
              firstname: values.firstName,
              lastname: values.lastName,
              email: values.email,
              organization: values.organization._id,
              department: getDepartment,
              labtype: getLab,
            })
          ).then(() => {
            setEdit(true);
            dispatch(moreInfoUserMiddleWare());
          });
          dispatch(
            authMeUpdateMiddleWare({
              activeStatus: false,
              imageUrl: beforeQuestionMark,
              firstname: values.firstName,
              lastname: values.lastName,
              email: values.email,
              organization: values.organization._id,
              department: getDepartment,
              labtype: getLab,
            })
          ).then(() => {
            dispatch(authMeMiddleWare());
          });
        }
      });
    } else {
      dispatch(
        moreInfoMiddleWare({
          activeStatus: false,
          imageUrl: formik.values.profile,
          firstname: values.firstName,
          lastname: values.lastName,
          email: values.email,
          organization: values.organization._id,
          department: getDepartment,
          labtype: getLab,
        })
      ).then(() => {
        setEdit(true);
        // setDrawer(false);
        dispatch(moreInfoUserMiddleWare());
      });
      dispatch(
        authMeUpdateMiddleWare({
          activeStatus: false,
          imageUrl: formik.values.profile,
          firstname: values.firstName,
          lastname: values.lastName,
          email: values.email,
          organization: values.organization._id,
          department: getDepartment,
          labtype: getLab,
        })
      ).then(() => {
        dispatch(authMeMiddleWare());
      });
    }
  };

  const formik = useFormik({
    initialValues,
    onSubmit: handleSubmit,
    validate,
  });

  const getDepartmentOption: any = useMemo(() => {
    const result = moreInfoList.filter(
      (list) => list.organization === formik.values.organization?.organization
    );
    return result ? result[0] : { department: [], labtype: [] };
  }, [formik.values.organization]);

  useEffect(() => {
    if (isEmpty(moreInfoData?.firstname) && !isEmpty(moreInfoData?.name)) {
      const nameArray = moreInfoData?.name?.split(" ");
      const firstName = nameArray[0];
      const lastName = nameArray[nameArray.length - 1];
      formik.setFieldValue("firstName", firstName);
      formik.setFieldValue("lastName", lastName);
    } else if (!isEmpty(moreInfoData?.firstname)) {
      formik.setFieldValue("firstName", moreInfoData?.firstname);
      formik.setFieldValue("lastName", moreInfoData?.lastname);
    }
    if (!isEmpty(moreInfoData?.organization)) {
      const getOrganization = moreInfoList.filter(
        (list) => list._id === moreInfoData?.organization
      );
      if (getOrganization.length > 0) {
        formik.setFieldValue("organization", {
          organization: getOrganization[0].organization,
          _id: getOrganization[0]._id,
        });
      }

      const getDepartment = moreInfoData?.department.map((list: any) => {
        return { label: list, value: list };
      });

      formik.setFieldValue("department", getDepartment);
      const getLab = moreInfoData?.labtype.map((list: any) => {
        return { label: list, value: list };
      });
      formik.setFieldValue("lab", getLab);
    }
    formik.setFieldValue("email", moreInfoData?.email);
    formik.setFieldValue("profile", moreInfoData?.imageUrl);
  }, [moreInfoData, isDrawer]);

  const myPage = window.location.pathname === routes.MY_PAGE;
  const runz = window.location.pathname === routes.RUNZ;
  const procedures = window.location.pathname === routes.PROCEDURES;
  const projects = window.location.pathname === routes.PROJECTS;
  const assets = window.location.pathname === routes.ASSETS;
  const settings = window.location.pathname === routes.SETTINGS;
  const billing = window.location.pathname === routes.BILLING;

  const menuNavigate = (value: string) => {
    switch (value) {
      case "1":
        return navigate(routes.MY_PAGE);
      case "2":
        return navigate(routes.RUNZ);
      case "3":
        return navigate(routes.PROCEDURES);
      case "4":
        return navigate(routes.PROJECTS);
      case "5":
        return navigate(routes.ASSETS);
      case "6":
        return navigate(routes.SETTINGS);
      case "7":
        return navigate(routes.BILLING);
    }
  };

  const handleLogout = () => {
    navigate(routes.LOGIN);
    localStorage.removeItem(AUTH_TOKEN);
    setDrawer(false);
  };

  let items: any = [];

  if (roleTester) {
    items = [
      {
        key: "1",
        icon: <SvgMypage fill={svgFill(myPage)} />,
        label: collapsed ? "" : "My page",
        disabled: false,
      },
      {
        key: "2",
        icon: <SvgRunz fill={svgFill(runz)} />,
        label: collapsed ? "" : "Runs",
        disabled: false,
      },
      {
        key: "3",
        icon: <SvgProcedures fill={svgFill(procedures)} />,
        label: collapsed ? "" : "Procedures",
        disabled: false,
      },
      {
        key: "4",
        icon: <SvgProjects fill={svgFill(projects)} />,
        label: collapsed ? "" : "Projects",
        disabled: true,
      },
      {
        key: "5",
        icon: <SvgAssets fill={svgFill(assets)} />,
        label: collapsed ? "" : "Assets",
        disabled: true,
      },
      {
        key: "6",
        icon: <SvgSettings fill={svgFill(settings)} />,
        label: collapsed ? "" : "Settings",
        disabled: true,
      },
      {
        key: "7",
        icon: <SvgDoller fill={svgFill(billing)} />,
        label: collapsed ? "" : "Billing and subscriptions",
        disabled: true,
      },
    ];
  } else if (roleRequester) {
    items = [
      {
        key: "1",
        icon: <SvgMypage fill={svgFill(myPage)} />,
        label: collapsed ? "" : "My page",
        disabled: false,
      },
      {
        key: "2",
        icon: <SvgRunz fill={svgFill(runz)} />,
        label: collapsed ? "" : "Runs",
        disabled: false,
      },
      {
        key: "3",
        icon: <SvgProcedures fill={svgFill(procedures)} />,
        label: collapsed ? "" : "Procedures",
        disabled: false,
      },
      {
        key: "4",
        icon: <SvgProjects fill={svgFill(projects)} />,
        label: collapsed ? "" : "Projects",
        disabled: true,
      },
      {
        key: "5",
        icon: <SvgAssets fill={svgFill(assets)} />,
        label: collapsed ? "" : "Assets",
        disabled: true,
      },
      {
        key: "6",
        icon: <SvgSettings fill={svgFill(settings)} />,
        label: collapsed ? "" : "Settings",
        disabled: true,
      },
      {
        key: "7",
        icon: <SvgDoller fill={svgFill(billing)} />,
        label: collapsed ? "" : "Billing and subscriptions",
        disabled: true,
      },
    ];
  } else {
    items = [
      {
        key: "1",
        icon: <SvgMypage fill={svgFill(myPage)} />,
        label: collapsed ? "" : "My page",
        disabled: false,
      },
      {
        key: "2",
        icon: <SvgRunz fill={svgFill(runz)} />,
        label: collapsed ? "" : "Runs",
        disabled: false,
      },
      {
        key: "3",
        icon: <SvgProcedures fill={svgFill(procedures)} />,
        label: collapsed ? "" : "Procedures",
        disabled: false,
      },
      {
        key: "4",
        icon: <SvgProjects fill={svgFill(projects)} />,
        label: collapsed ? "" : "Projects",
        disabled: false,
      },
      {
        key: "5",
        icon: <SvgAssets fill={svgFill(assets)} />,
        label: collapsed ? "" : "Assets",
        disabled: false,
      },
      {
        key: "6",
        icon: <SvgSettings fill={svgFill(settings)} />,
        label: collapsed ? "" : "Settings",
        disabled: false,
      },
      {
        key: "7",
        icon: <SvgDoller fill={svgFill(billing)} />,
        label: collapsed ? "" : "Billing and subscriptions",
        disabled: false,
      },
    ];
  }

  if (hideLayout) {
    return <>{children}</>;
  }

  return (
    <>
      <ProfileDrawer
        isLoader={uploadLoader || updateLoader}
        formik={formik}
        onClose={() => {
          setDrawer(false);
          setEdit(true);
        }}
        open={isDrawer}
        handleLogout={handleLogout}
        setEdit={setEdit}
        isEdit={isEdit}
        moreInfoData={moreInfoData}
        moreInfoList={moreInfoList}
        getDepartmentOption={getDepartmentOption}
      />
      <NotificationDrawer onClose={() => setNoti(false)} open={isNoti} />

      <LayoutAntd>
        <Sider
          style={{ position: "absolute", zIndex: 11 }}
          className={cx("sideBarContainer", { sideWidth: !collapsed })}
          trigger={null}
          collapsible
          collapsed={collapsed}
        >
          <Menu
            onClick={(a) => {
              setCollapsed(true);
              menuNavigate(a.key);
            }}
            mode="inline"
            items={items}
          />
          {!collapsed && (
            <Flex center className={styles.seePlansDiv}>
              <SvgSeePlans />
            </Flex>
          )}
        </Sider>
        <LayoutAntd className={styles.backgroundColor}>
          <Header className={styles.headerContainer}>
            <Flex row center between>
              <Flex row center>
                <Button
                  className={styles.svgMenu}
                  types="link"
                  onClick={(e) => {
                    e.stopPropagation();
                    setCollapsed(!collapsed);
                  }}
                >
                  <SvgMenu />
                </Button>
                <InsideClickHandler onInsideClick={() => setCollapsed(true)}>
                  <SvgTestRunz />
                </InsideClickHandler>
              </Flex>
              <InsideClickHandler onInsideClick={() => setCollapsed(true)}>
                <Flex row center>
                  <InputText
                    placeholder="Search"
                    actionRight={() => <SvgSearch />}
                  />
                  <Button types="link" className={styles.svgQuestion}>
                    <SvgQuestionRound />
                  </Button>
                  <Button types="link" onClick={() => setNoti(true)}>
                    <SvgBell />
                  </Button>

                  <Text className={styles.svgQuestion}>{data?.name}</Text>
                  <Button
                    onClick={() => setDrawer(true)}
                    className={styles.svgProfile}
                    types="link"
                  >
                    {data?.imageUrl ? (
                      <img
                        src={data.imageUrl}
                        style={{
                          height: 24,
                          width: 24,
                          objectFit: "cover",
                          borderRadius: 100,
                        }}
                      />
                    ) : (
                      <SvgUserProfile />
                    )}
                  </Button>
                </Flex>
              </InsideClickHandler>
            </Flex>
          </Header>
          <InsideClickHandler onInsideClick={() => setCollapsed(true)}>
            <Content className={styles.content}>{children}</Content>
          </InsideClickHandler>
        </LayoutAntd>
      </LayoutAntd>
    </>
  );
};

export default Layout;
