import { useState } from "react";
import Button from "../packages/Button/Button";
import SvgEye from "../icons/SvgEye";

export const useVisibilityIcon = () => {
  const [isVisible, setVisible] = useState(false);
  const [isVisibleOne, setVisibleOne] = useState(false);

  const hanldeToggle = () => {
    setVisible(!isVisible);
  };

  const hanldeToggleOne = () => {
    setVisibleOne(!isVisibleOne);
  };

  const visibleIcon = () => {
    return (
      <Button
        onClick={hanldeToggle}
        types="link"
        style={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <SvgEye fill={isVisible ? "#996A69" : "#A8A8A8"} />
      </Button>
    );
  };

  const visibleIconOne = () => {
    return (
      <Button
        onClick={hanldeToggleOne}
        types="link"
        style={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <SvgEye fill={isVisibleOne ? "#996A69" : "#A8A8A8"} />
      </Button>
    );
  };

  return { visibleIcon, isVisible, visibleIconOne, isVisibleOne };
};

export const getPasswordStrength = (password: string) => {
  if (
    password.length >= 8 &&
    /[a-z]/.test(password) &&
    /[A-Z]/.test(password) &&
    /\d/.test(password) &&
    /[!@#$%^&*]/.test(password)
  ) {
    return "Strong strength";
  } else if (
    password.length >= 6 &&
    /[a-zA-Z]/.test(password) &&
    (/\d/.test(password) || /[!@#$%^&*]/.test(password))
  ) {
    return "Medium strength";
  } else {
    return "Weak strength";
  }
};

export function isEmptyObject(obj: any) {
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      return false;
    }
  }
  return true;
}

export function areAllValuesEmpty(obj: any) {
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const value = obj[key];

      if (typeof value === "string" && value.trim() !== "") {
        return false;
      } else if (typeof value === "object") {
        if (!areAllValuesEmpty(value)) {
          return false;
        }
      }
    }
  }
  return true;
}

export function jsonStringToJSON(inputString: string) {
  const parts = inputString.match(
    /(.*?) (.*?) in '(.*?)' \((.*?)\): value=(.*?)$/
  );
  if (!parts || parts.length < 6) {
    return null;
  }
  const timestamp = parts[1];
  const location = parts[3];
  const source = parts[4];
  const value = parseFloat(parts[5]);

  const jsonObject = {
    timestamp,
    location,
    source,
    measurement: {
      type: parts[2],
      value,
    },
  };

  return jsonObject;
}
