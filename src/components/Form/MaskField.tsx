import TextField from "./TextField";
import { NumericFormat, NumericFormatProps } from "react-number-format";


type MaskFieldProps = Omit<NumericFormatProps<HTMLInputElement>, "customInput"> & {
  label: string;
  error?: string;
    props: string;
};

const MaskField: React.FC<MaskFieldProps> = ({ label, error, ...props }: MaskFieldProps) => {
    return (
        <NumericFormat
            customInput={TextField as React.ComponentType<unknown>}
            label={label}
            error={error}
            prefix="U$"
            decimalScale={2}
            decimalSeparator="."
            {...props}
        />
    )
}

export default MaskField;