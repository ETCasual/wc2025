import type { Forms } from "@/Errors";
import { Field, useFormikContext } from "formik";

type GenderProps = {
  name: string;
  value: string;
  error?: string;
};

export const Gender: React.FC<GenderProps> = ({ name, value, error }) => {
  const { isSubmitting } = useFormikContext<Forms>();
  return (
    <div className="flex w-full flex-col items-center gap-1">
      <div className="border-secondary flex w-full flex-row items-center overflow-hidden rounded-full border-2">
        <div className="border-secondary bg-secondary min-w-[115px] border-r-2 px-2">
          <label
            htmlFor=""
            className="font-merriweather text-primary h-full text-xs"
          >
            Gender
          </label>
        </div>

        <Field
          as="select"
          id={name}
          name={name}
          disabled={isSubmitting}
          className={`font-merriweather ${value ? "text-secondary" : "text-secondary/50"} placeholder:text-secondary/50 text-secondary w-full px-2 text-sm capitalize focus:outline-none`}
        >
          <option value="" disabled>
            Select Gender
          </option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </Field>
      </div>
      <div className="flex w-full flex-row items-start justify-between gap-3">
        <p className="text-secondary pl-2 text-[10px]">性別</p>
        <p className="pr-2 text-end text-[10px] text-white italic">{error}</p>
      </div>
    </div>
  );
};
