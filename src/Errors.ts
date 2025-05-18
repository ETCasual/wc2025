import * as Yup from "yup";

export type Forms = {
  name: string;
  chi_name: string;
  gender: string;
  age: string;
  contact_number: string;
  pastoral_status: string;
  pastoral_team: string;
  small_team: string;
  sessions: string[];
  cg: string;
};

export const schema = Yup.object<Forms>().shape({
  name: Yup.string().required("Name is required"),
  chi_name: Yup.string().required("Chinese name is required"),
  gender: Yup.string().required("Gender is required"),
  age: Yup.number()
    .required("Age is required")
    .min(1, "At least 1 year old")
    .max(99, "At most 99 years old"),
  contact_number: Yup.string()
    .required("Contact number is required")
    .matches(
      /^(\+?6?01)[0|1|2|3|4|6|7|8|9]-*[0-9]{7,8}$/,
      "Invalid contact number",
    ),
  pastoral_status: Yup.string()
    .required("Pastoral status is required")
    .min(1, "Pastoral status is required"),
  pastoral_team: Yup.string()
    .required("Pastoral team is required")
    .min(1, "Pastoral team is required"),
  small_team: Yup.string()
    .required("Small team is required")
    .min(1, "Small team is required"),
  cg: Yup.string().required("CG is required").min(1, "CG is required"),
  sessions: Yup.array()
    .of(Yup.string())
    .min(1, "You can only select Youth Alive after registration deadline.")
    .required("You can only select Youth Alive after registration deadline."),
});
