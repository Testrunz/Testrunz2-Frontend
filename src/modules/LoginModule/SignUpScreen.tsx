import { useNavigate } from "react-router-dom";
import { FormikHelpers, useFormik } from "formik";
import Button from "../../packages/Button/Button";
import CheckBox from "../../packages/CheckBox/CheckBox";
import Flex from "../../packages/Flex/Flex";
import Text from "../../packages/Text/Text";
import { routes } from "../../routes/routesPath";
import InputText from "../../packages/InputText/InputText";
import { getPasswordStrength, useVisibilityIcon } from "../../utils/helpers";
import { isEmpty, isValidEmail } from "../../utils/validators";
import { statusType } from "../../packages/InputText/inputTextTypes";
import GoogleSignIn from "../../packages/GoogleSignIn/GoogleSignIn";
import LoginFrame from "./LoginFrame";
import HelpAndTerms from "./HelpAndTerms";
import styles from "./loginscreen.module.css";
import MicrosoftSignIn from "../../packages/MicrosoftSignIn/MicrosoftSignIn";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import {
  authMeMiddleWare,
  googleLoginMiddleWare,
  microsoftLoginMiddleWare,
  signUpMiddleWare,
} from "./store/loginMiddleware";
import Toast from "../../packages/Toast/Toast";
import { useState } from "react";
import Loader from "../../packages/Loader/Loader";
import { auth, microProvider, provider } from "../../utils/firebase";
import { setAuthorization } from "../../utils/apiConfig";
import { AUTH_TOKEN } from "../../utils/localStoreConst";
import { getAuth, signInWithPopup } from "firebase/auth";
import axios from "axios";
import { moreInfoUserMiddleWare } from "../MyPageModule/store/mypageMiddleware";

type formType = {
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
  agree: string;
};

const initialValues: formType = {
  email: "",
  password: "",
  name: "",
  confirmPassword: "",
  agree: "",
};

const validate = (values: formType) => {
  const errors: Partial<formType> = {};

  if (isEmpty(values.name)) {
    errors.name = "Name field is required";
  }
  if (isEmpty(values.email)) {
    errors.email = "Email field is required";
  } else if (!isValidEmail(values.email)) {
    errors.email = "Invalid email entered";
  }
  if (isEmpty(values.password)) {
    errors.password = "Password field is required";
  } else if (getPasswordStrength(values.password) !== "Strong strength") {
    errors.password = getPasswordStrength(values.password);
  }

  if (isEmpty(values.confirmPassword)) {
    errors.confirmPassword = "Password field is required";
  } else if (
    values.password.length !== 0 &&
    values.confirmPassword.length !== 0 &&
    values.password !== values.confirmPassword
  ) {
    errors.confirmPassword = "Password not matched";
  }

  if (isEmpty(values.agree)) {
    errors.agree = "Please read privacy policy";
  }

  return errors;
};

const SignUpScreen = () => {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const { visibleIcon, isVisible, isVisibleOne, visibleIconOne } =
    useVisibilityIcon();
  const [isLoader, setLoader] = useState(false);
  const handleLogin = () => navigate(routes.LOGIN);

  const handleSubmit = (
    values: formType,
    formikHelpers: FormikHelpers<formType>
  ) => {
    setLoader(true);
    dispatch(
      signUpMiddleWare({
        email: values.email,
        password: values.password,
        name: values.name,
      })
    )
      .then((res: any) => {
        setLoader(false);
        if (
          res?.payload?.success ===
          "Account created successfully. Please sign in."
        ) {
          formikHelpers.resetForm();
          navigate(routes.LOGIN);
          Toast(res?.payload?.success);
        } else if (res?.payload?.response?.data?.error) {
          formikHelpers.setFieldError(
            "email",
            res?.payload?.response?.data?.error
          );
          Toast(res?.payload?.response?.data?.error, "LONG", "error");
        } else if (res?.error?.message === "Rejected") {
          Toast(res.payload.message, "LONG", "error");
        }
      })
      .catch(() => {
        setLoader(false);
      });
  };
  const formik = useFormik({
    initialValues,
    onSubmit: handleSubmit,
    validate,
  });

  let passwordMessage: statusType = "";
  if (
    getPasswordStrength(formik.values.password) === "Weak strength" &&
    formik.values.password.length > 0
  ) {
    passwordMessage = "error";
  } else if (
    getPasswordStrength(formik.values.password) === "Medium strength"
  ) {
    passwordMessage = "theme";
  } else if (
    getPasswordStrength(formik.values.password) === "Strong strength"
  ) {
    passwordMessage = "success";
  } else {
    passwordMessage = "";
  }

  let confirmPasswordStatus: statusType = "";
  let confirmPasswordMessage = "";
  if (
    formik.values.password.length !== 0 &&
    formik.values.password === formik.values.confirmPassword
  ) {
    confirmPasswordStatus = "success";
    confirmPasswordMessage = "Password matched";
  } else if (
    formik.values.password.length !== 0 &&
    formik.values.confirmPassword.length !== 0 &&
    formik.values.password !== formik.values.confirmPassword
  ) {
    confirmPasswordStatus = "error";
  } else {
    confirmPasswordStatus = "";
    confirmPasswordMessage = "";
  }

  const handlerGoogleSignIn = (e: any) => {
    e.preventDefault();
    auth
      .signInWithPopup(provider)
      .then((result: any) => {
        setLoader(true);
        dispatch(
          googleLoginMiddleWare({
            email: result.user?._delegate?.email,
            name: result.user?._delegate?.displayName,
            uid: result.user?._delegate?.uid,
            timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
          })
        )
          .then((res: any) => {
            if (res?.payload?.success) {
              axios.defaults.headers.common["Authorization"] =
                "Bearer " + result.user?._delegate?.accessToken;
              setAuthorization(result.user?._delegate?.accessToken);
              Toast("Google Account logged successfully.");
              localStorage.setItem(
                AUTH_TOKEN,
                result.user?._delegate?.accessToken
              );
              setTimeout(() => {
                dispatch(authMeMiddleWare())
                  .then(() => {
                    dispatch(moreInfoUserMiddleWare())
                      .then(() => {
                        setLoader(false);
                        navigate(routes.MY_PAGE);
                      })
                      .catch(() => setLoader(false));
                  })
                  .catch(() => setLoader(false));
              }, 1000);
            } else {
              Toast(res.payload.error, "LONG", "error");
              setLoader(false);
            }
          })
          .catch(() => setLoader(false));
      })
      .then((error: any) => {
        if (error?.code === "auth/popup-closed-by-user") {
          console.log("Authentication popup closed by user.");
          // Display a message to the user or handle the cancellation gracefully.
        } else {
          console?.error("Authentication failed:", error);
        }
      });
  };

  const handlerMicroSoftSignIn = (e: any) => {
    e.preventDefault();
    const auth = getAuth();
    signInWithPopup(auth, microProvider)
      .then((result: any) => {
        setLoader(true);
        dispatch(
          microsoftLoginMiddleWare({
            email: result.user.email,
            name: result.user.displayName,
            uid: result.user.uid,
            timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
          })
        )
          .then((res: any) => {
            if (res?.payload?.success) {
              axios.defaults.headers.common["Authorization"] =
                "Bearer " + result.user.accessToken;
              setAuthorization(result.user.accessToken);
              Toast(res.payload.success);
              localStorage.setItem(AUTH_TOKEN, result.user.accessToken);
              setTimeout(() => {
                dispatch(authMeMiddleWare())
                  .then(() => {
                    dispatch(moreInfoUserMiddleWare())
                      .then(() => {
                        setLoader(false);
                        navigate(routes.MY_PAGE);
                      })
                      .catch(() => setLoader(false));
                  })
                  .catch(() => setLoader(false));
              }, 1000);
            } else {
              Toast(res.payload.error, "LONG", "error");
              setLoader(false);
            }
          })
          .catch(() => setLoader(false));
      })
      .catch(() => {
        setLoader(false);
      });
  };

  return (
    <>
      {isLoader && <Loader />}
      <LoginFrame
        leftChild={
          <Flex between flex={1}>
            <Flex>
              <Text type={"h4"}>Welcome to</Text>
              <Text type={"h2"}>Test Runz</Text>
              <Flex className={styles.signUpVia}>
                <Text type="title" color={"tertiary-shade-2"}>
                  Sign up via
                </Text>
                <GoogleSignIn onClick={handlerGoogleSignIn} />
                <MicrosoftSignIn onClick={handlerMicroSoftSignIn} />
                {/* <LinkedinSignIn /> */}
              </Flex>
            </Flex>

            <HelpAndTerms />
          </Flex>
        }
        rightChild={
          <form autoComplete="off">
            <Flex>
              <Text type="title" className={styles.loginTitle}>
                Sign up for a free Test Runz account
              </Text>

              <InputText
                value={formik.values.name}
                onChange={formik.handleChange("name")}
                label={"Full name"}
                message={formik.errors.name}
                status={
                  formik.touched.name && formik.errors.name ? "error" : ""
                }
              />
              <div style={{ marginTop: 12, marginBottom: 12 }}>
                <InputText
                  autoComplete="off"
                  label={"E-mail"}
                  value={formik.values.email}
                  onChange={formik.handleChange("email")}
                  message={formik.errors.email}
                  status={
                    formik.touched.email && formik.errors.email ? "error" : ""
                  }
                />
              </div>
              <InputText
                autoComplete="new-password"
                value={formik.values.password}
                onChange={formik.handleChange("password")}
                label={"Password"}
                keyboardType={isVisible ? "text" : "password"}
                actionRight={visibleIcon}
                message={
                  formik.errors.password ||
                  getPasswordStrength(formik.values.password)
                }
                status={
                  formik.touched.password && formik.errors.password
                    ? "error"
                    : passwordMessage
                }
              />
              <div style={{ marginTop: 12, marginBottom: 8 }}>
                <InputText
                  value={formik.values.confirmPassword}
                  onChange={formik.handleChange("confirmPassword")}
                  label={"Confirm password"}
                  keyboardType={isVisibleOne ? "text" : "password"}
                  actionRight={visibleIconOne}
                  message={
                    formik.errors.confirmPassword || confirmPasswordMessage
                  }
                  status={
                    formik.touched.confirmPassword &&
                    formik.errors.confirmPassword
                      ? "error"
                      : confirmPasswordStatus
                  }
                />
              </div>

              <Flex className={styles.readTextContainer}>
                <Flex row>
                  <CheckBox
                    checked={!isEmpty(formik.values.agree)}
                    onClick={() => formik.setFieldValue("agree", "1")}
                  />
                  <Text type="captionRegular" className={styles.readText}>
                    I have read and understood and agree with terms of service
                    and Privacy policy of Test Runz
                  </Text>
                </Flex>
                {formik.touched.agree && formik.errors.agree && (
                  <Text type="captionRegular" color="error">
                    {formik.errors.agree}
                  </Text>
                )}
              </Flex>

              <Button className={styles.btnStyle} onClick={formik.handleSubmit}>
                Signup for free
              </Button>
              <Flex row center>
                <Text type="captionRegular">Already have an account? </Text>
                <Button onClick={handleLogin} types="link">
                  <Text type="captionBold" className={styles.signUpText}>
                    Click here to log in.
                  </Text>
                </Button>
              </Flex>
            </Flex>
          </form>
        }
      />
    </>
  );
};

export default SignUpScreen;
