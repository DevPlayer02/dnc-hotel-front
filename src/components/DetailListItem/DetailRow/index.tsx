type DetailRowProps = {
  title: string;
  description: string;
  className?: string | null;
};

const DetailRow = ({ title, description, className }: DetailRowProps) => {
  return (
    <div
      className={`flex flex-col justify-between font-bold lg:flex-row lg:gap-4 ${className}`}
    >
      <span>{title}</span>
      <span>{description}</span>
    </div>
  );
};

export default DetailRow;
