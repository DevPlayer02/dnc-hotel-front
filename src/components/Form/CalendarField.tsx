type CalendarFieldProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string | null;
};

const CalendarField = ({
  id,
  label,
  name,
  min,
  className,
  error,
  ...props
}: CalendarFieldProps) => {
  const defaultStyle =
    "border border-light-grey-600 rounded-lg w-full px-4 py-2";
  const errorStyle = "border-red-500";

  return (
    <div className={className}>
      <label htmlFor={id}>{label}</label>
      <input
        type="date"
        id={id}
        name={name}
        aria-label={label}
        min={min}
        className={`${defaultStyle} ${error ? errorStyle : ""}`}
        {...props}
      />
    </div>
  );
};
export default CalendarField;
