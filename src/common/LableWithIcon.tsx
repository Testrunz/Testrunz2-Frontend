import Flex from "../packages/Flex/Flex";
import Text from "../packages/Text/Text";
import { textColorsType, textType } from "../packages/Text/textTypes";

type Props = {
  label: string;
  actionLeft?: Function;
  actionRight?: Function;
  color?: textColorsType;
  type?: textType;
  containerClassName?: string;
  labelSize?: number;
};

const LableWithIcon = ({
  label,
  actionLeft,
  actionRight,
  color,
  type,
  containerClassName,
  labelSize,
}: Props) => {
  return (
    <Flex className={containerClassName} row center>
      {typeof actionLeft === "function" && (
        <div style={{ marginRight: 4, display: "flex" }}>{actionLeft()}</div>
      )}
      <Text size={labelSize} color={color} type={type}>
        {label}
      </Text>
      {typeof actionRight === "function" && (
        <div style={{ marginLeft: 4, display: "flex" }}>{actionRight()}</div>
      )}
    </Flex>
  );
};

export default LableWithIcon;
