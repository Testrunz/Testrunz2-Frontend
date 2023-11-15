import Text from "../Text/Text";
type Props = {
  name: string;
  errors: any;
  touched: any;
};
const ErrorMessage = ({ name, errors, touched }: Props) => {
  if (errors && typeof errors[name] === "string" && touched[name]) {
    return (
      <Text color={"error"} size={14}>
        {errors[name]}
      </Text>
    );
  }

  return null;
};
export default ErrorMessage;
