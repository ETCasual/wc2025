import { type Forms } from "@/Errors";
import { useFormikContext } from "formik";

type PastoralTeamProps = {
  name: string;
  error?: string;
};

export const PastoralTeam: React.FC<PastoralTeamProps> = ({ name, error }) => {
  const { setFieldValue, values, isSubmitting } = useFormikContext<Forms>();
  const value = values.pastoral_team;
  return (
    <div className="flex w-full flex-col items-center gap-1">
      <div className="border-secondary flex w-full flex-row items-center overflow-hidden rounded-full border-2">
        <div className="border-secondary bg-secondary min-w-[115px] border-r-2 px-2">
          <label
            htmlFor=""
            className="font-merriweather text-primary h-full text-xs"
          >
            Pastoral Team
          </label>
        </div>

        <select
          id={name}
          name={name}
          value={value}
          onChange={async (e) => {
            await setFieldValue(name, e.target.value);

            const defaultSmallTeam = {
              "KL Teens": "Central (XK)",
              "KL Youth": "Central (XK)",
              USJ: "Knight Warrior",
              "Ps. Joshua Team": "Ps. Joshua Team",
              "Mei Jing Team": "Mei Jing Team",
              Serdang: "Serdang",
            };

            await setFieldValue(
              "small_team",
              defaultSmallTeam[e.target.value as keyof typeof defaultSmallTeam],
            );
          }}
          disabled={isSubmitting}
          className={`font-merriweather ${value ? "text-secondary" : "text-secondary/50"} placeholder:text-secondary/50 text-secondary w-full px-2 text-sm capitalize focus:outline-none`}
        >
          <option value="" disabled>
            Select pastoral team
          </option>

          <option value="KL Teens">KL Teens</option>
          <option value="KL Youth">KL Youth</option>
          <option value="Ps. Joshua Team">Ps. Joshua Team</option>
          <option value="Mei Jing Team">Mei Jing Team</option>
          <option value="USJ">USJ</option>
          <option value="Serdang">Serdang</option>
        </select>
      </div>
      <div className="flex w-full flex-row items-start justify-between gap-3">
        <p className="text-secondary pl-2 text-[10px]">团队</p>
        <p className="pr-2 text-end text-[10px] text-white italic">{error}</p>
      </div>
    </div>
  );
};
