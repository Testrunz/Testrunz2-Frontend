import { isEmpty } from "../../utils/validators";

type DurationTypes = "SHORT" | "LONG";
type colors = "error" | "success";

/* eslint-disable */
const handleSetDuration = (duration: DurationTypes) => {
  switch (duration) {
    case "LONG":
      return 4000;
    default:
      return 2500;
  }
};

const Alert = (
  message: string,
  duration: DurationTypes = "SHORT", // eslint-disable-line
  color: colors='success'
) => {
  const choosenDuration = handleSetDuration(duration);

  if (!isEmpty(message)) {
    const alertText = document.getElementById("alertbar-text");
    if (alertText && "innerText" in alertText) {
      alertText.style.display = "contents";
      alertText.innerText = message;
    }

    const alertoverlay = document.getElementById("alertoverlay");
    const alertbar = document.getElementById("alertbar");

    if (alertoverlay && alertbar && alertText) {
      alertoverlay.setAttribute("class", `show-alert-anim `);
      alertbar.setAttribute("class", `alert-${color}-box`);
      alertText.setAttribute("class", `alert-${color}-text`);
    }

    window.setTimeout(() => {
      if (alertoverlay && alertbar && alertText) {
        alertoverlay.removeAttribute("class");
        alertbar.removeAttribute("class");
        alertText.style.display = "none";
      }
    }, choosenDuration);
  }
};

export default Alert;
