import TextField from "./TextField";
import { NumericFormat } from "react-number-format";

const MaskField = ({ label, error, ...props }: any) => {
    return (
        <NumericFormat
            customInput={TextField}
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