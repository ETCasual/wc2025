import type { Forms } from "@/Errors";
import { Field, useFormikContext } from "formik";

type SelectProps = {
  name: string;
  options: string[];
  chiLabel: string;
};

export const Select: React.FC<SelectProps> = ({ name, options, chiLabel }) => {
  const { setFieldValue, values, errors, isSubmitting } =
    useFormikContext<Forms>();
  const value = values.small_team;
  const error = errors.small_team;
  return (
    <div className="flex w-full flex-col items-center gap-1">
      <div className="border-secondary flex w-full flex-row items-center overflow-hidden rounded-full border-2">
        <div className="border-secondary bg-secondary min-w-[115px] border-r-2 px-2">
          <label
            htmlFor=""
            className="font-merriweather text-primary h-full text-xs capitalize"
          >
            {name.replaceAll("_", " ")}
          </label>
        </div>

        <select
          id={name}
          name={name}
          value={value}
          onChange={async (e) => {
            await setFieldValue(name, e.target.value);
          }}
          disabled={isSubmitting}
          className={`font-merriweather ${value ? "text-secondary" : "text-secondary/50"} placeholder:text-secondary/50 text-secondary w-full px-2 text-sm capitalize focus:outline-none`}
        >
          <option value="" disabled>
            Select {name.replaceAll("_", " ")}
          </option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
      <div className="flex w-full flex-row items-start justify-between gap-3">
        <p className="text-secondary pl-2 text-[10px]">{chiLabel}</p>
        <p className="pr-2 text-end text-[10px] text-white italic">{error}</p>
      </div>
    </div>
  );
};
