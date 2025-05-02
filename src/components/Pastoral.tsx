import type { Forms } from "@/Errors";
import { Field, useFormikContext } from "formik";

type PastoralStatusProps = {
  name: string;
  value: string;
  error?: string;
};

export const PastoralStatus: React.FC<PastoralStatusProps> = ({
  name,
  value,
  error,
}) => {
  const { isSubmitting } = useFormikContext<Forms>();
  return (
    <div className="flex w-full flex-col items-center gap-1">
      <div className="border-secondary flex w-full flex-row items-center overflow-hidden rounded-full border-2">
        <div className="border-secondary bg-secondary min-w-[115px] border-r-2 px-2">
          <label
            htmlFor=""
            className="font-merriweather text-primary h-full text-xs"
          >
            Pastoral Status
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
            Select pastoral status
          </option>
          <option value="New Friend - First timer">
            New Friend - First timer
          </option>
          <option value="New Friend - Joined more than 2 times">
            New Friend - Joined more than 2 times
          </option>
          <option value="New Believer">New Believer</option>
          <option value="OM">OM</option>
          <option value="SGL">SGL</option>
          <option value="CGL">CGL</option>
          <option value="Coach / TL / Pastor">Coach / TL / Pastor</option>
        </Field>
      </div>
      <div className="flex w-full flex-row items-start justify-between gap-3">
        <p className="text-secondary pl-2 text-[10px]">身份</p>
        <p className="pr-2 text-end text-[10px] text-white italic">{error}</p>
      </div>
    </div>
  );
};
