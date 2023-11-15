import { Theme } from "react-select";
import {
  primaryShade1,
  primaryShade4,
  primaryShade3,
} from "../../theme/colors";

export const selectTagTheme = (theme: Theme, inputColor: string) => ({
  ...theme,
  borderRadius: 4,
  colors: {
    ...theme.colors,
    neutral0: inputColor,
    primary25: primaryShade4,
    primary50: primaryShade3,
    primary: primaryShade1,
  },
});
