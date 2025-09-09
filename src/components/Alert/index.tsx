import { ReactElement } from "react";

type AlertProps = {
    type?: 'success' | 'danger';
    children: ReactElement | string;
};

const getStylesByAlertType = (alertType: 'success' | 'danger') => ({
    success: "bg-green-300 text-black",
    danger: "bg-red-400 text-black"    
})[alertType];

const defaultStyles = "w-full flex justify-center py-2 px-4 rounded-lg my-4 text-black font-medium"

const Alert = ({ type = "success", ...props }: AlertProps) => { 
    return (
        <span className={`${defaultStyles} ${getStylesByAlertType(type)}`} {...props} />
    )
}

export default Alert;