import TextField from "./TextField";
import { NumericFormat, NumericFormatProps } from "react-number-format";


type MaskFieldProps = Omit<NumericFormatProps<TextFieldProps>, "customInput"> & {
  label: string;
  error?: string;
};

type TextFieldProps = React.ComponentProps<typeof TextField>;

const MaskField: React.FC<MaskFieldProps> = ({ label, error, ...props }: MaskFieldProps) => {
    return (
        <NumericFormat<TextFieldProps>
            customInput={TextField}
            prefix="U$"
            decimalScale={2}
            decimalSeparator="."
            label={label}
            error={error}
            {...props}
        />
    )
}

export default MaskField;