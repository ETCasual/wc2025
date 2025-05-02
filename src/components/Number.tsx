import type { Forms } from "@/Errors";
import { Field, useFormikContext } from "formik";

type InputProps = {
  label: string;
  name: string;
  placeholder?: string;
  error?: string;
  type?: string;
  chiLabel?: string;
};

export const NumberInput: React.FC<InputProps> = ({
  label,
  name,
  placeholder,
  error,
  type = "number",
  chiLabel,
}) => {
  const { isSubmitting } = useFormikContext<Forms>();
  return (
    <div className="flex w-full flex-col items-center gap-1">
      <div className="border-secondary flex w-full flex-row items-center overflow-hidden rounded-full border-2">
        <div className="border-secondary bg-secondary min-w-[115px] border-r-2 px-2">
          <label
            htmlFor={name}
            className="font-merriweather text-primary text-xs"
          >
            {label}
          </label>
        </div>
        <Field
          id={name}
          name={name}
          type={type}
          placeholder={placeholder}
          disabled={isSubmitting}
          className="font-merriweather placeholder:text-secondary/50 text-secondary w-full px-2 text-sm"
        />
      </div>
      <div className="flex w-full flex-row items-start justify-between gap-3">
        <p className="text-secondary pl-2 text-[10px]">{chiLabel}</p>
        <p className="pr-2 text-end text-[10px] text-white italic">{error}</p>
      </div>
    </div>
  );
};
