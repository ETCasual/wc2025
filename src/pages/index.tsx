import Head from "next/head";
import Image from "next/image";
import { Formik, Form, Field } from "formik";
import { Input } from "@/components/Input";
import { Gender } from "@/components/Gender";
import { NumberInput } from "@/components/Number";
import { type Forms, schema } from "@/Errors";
import { PastoralStatus } from "@/components/Pastoral";
import { PastoralTeam } from "@/components/Team";
import { useState } from "react";
import { Select } from "@/components/Select";

export default function Home() {
  const [page, setPage] = useState(1);
  return (
    <>
      <Head>
        <title>Warrior Conference | 2025</title>
        <meta name="description" content="Warrior Conference | 2025" />
        <link rel="icon" href="/WC25_YW_Logo.png" />
      </Head>

      <div className="relative flex min-h-screen w-full flex-col items-center gap-10 overflow-hidden overscroll-none py-8">
        <Image
          src="/phone_bg.jpg"
          alt="Bg"
          priority
          className="absolute top-0 -z-10 h-screen object-cover"
          width={1080}
          height={1920}
        />
        <Image
          src="/WC25_Logo.png"
          priority
          alt="Warrior Conference Logo"
          width={499}
          height={292}
          className="z-10 w-[150px]"
        />

        <Formik<Forms>
          validateOnBlur={false}
          initialValues={{
            name: "",
            chi_name: "",
            gender: "",
            age: "",
            contact_number: "",
            pastoral_status: "",
            pastoral_team: "",
            small_team: "",
            sessions: [],
          }}
          onSubmit={async (values, action) => {
            action.setSubmitting(true);

            const res = await fetch("/api/submit", {
              method: "POST",
              body: JSON.stringify(values),
            });

            if (res.ok) {
              alert("Registered!");
              action.resetForm();
              setPage(1);
              action.setSubmitting(false);
            } else {
              alert("Failed to register! Please try again.");
              action.setSubmitting(false);
            }
          }}
          validationSchema={schema}
        >
          {({ values, errors, validateForm, isSubmitting }) => (
            <Form className="flex w-full flex-col items-center gap-3 overflow-y-auto px-6">
              {page === 1 && (
                <>
                  <Input
                    label="Full Name"
                    name="name"
                    placeholder="Tan Xiao Ming"
                    error={errors.name}
                    chiLabel="全名 (英)"
                  />
                  <Input
                    label="Chinese Name"
                    name="chi_name"
                    placeholder="陳小明"
                    chiLabel="全名 (中)"
                    error={errors.chi_name}
                  />
                  <Gender
                    name="gender"
                    value={values.gender}
                    error={errors.gender}
                  />
                  <NumberInput
                    label="Age"
                    name="age"
                    placeholder="18"
                    error={errors.age}
                    chiLabel="年龄"
                  />
                  <NumberInput
                    label="Contact Number"
                    name="contact_number"
                    placeholder="012-3456789"
                    error={errors.contact_number}
                    type="tel"
                    chiLabel="联络号码"
                  />
                  <PastoralStatus
                    name="pastoral_status"
                    value={values.pastoral_status}
                    error={errors.pastoral_status}
                  />
                  <PastoralTeam
                    name="pastoral_team"
                    error={errors.pastoral_team}
                  />
                  <button
                    disabled={isSubmitting}
                    type="button"
                    onClick={async () => {
                      const formErrors = await validateForm();

                      if (
                        !(
                          formErrors.name ||
                          formErrors.chi_name ||
                          formErrors.gender ||
                          formErrors.age ||
                          formErrors.contact_number ||
                          formErrors.pastoral_status ||
                          formErrors.pastoral_team
                        )
                      ) {
                        if (
                          values.pastoral_team === "KL Teens" ||
                          values.pastoral_team === "KL Youth" ||
                          values.pastoral_team === "USJ"
                        ) {
                          setPage(2);
                        } else {
                          setPage(3);
                        }
                      }
                    }}
                    className="bg-secondary text-primary w-full rounded-full px-4 py-2"
                  >
                    Next
                  </button>
                </>
              )}
              {page === 2 && (
                <>
                  {renderSmallTeam(values.pastoral_team)}
                  <div className="flex w-full flex-row items-center gap-3">
                    <button
                      disabled={isSubmitting}
                      type="button"
                      onClick={() => setPage(1)}
                      className="border-secondary text-secondary w-full rounded-full border bg-transparent px-4 py-2"
                    >
                      Back
                    </button>
                    <button
                      disabled={isSubmitting}
                      type="button"
                      onClick={async () => {
                        const formErrors = await validateForm();
                        console.log(formErrors);
                        if (formErrors.small_team) {
                          return;
                        }
                        setPage(3);
                      }}
                      className="bg-secondary text-primary w-full rounded-full px-4 py-2"
                    >
                      Next
                    </button>
                  </div>
                </>
              )}
              {page === 3 && (
                <>
                  <div className="flex w-full flex-col items-center gap-1">
                    <div className="border-secondary flex w-full flex-col items-center overflow-hidden rounded-3xl border-2">
                      <p className="bg-secondary text-primary font-merriweather w-full text-center text-lg">
                        Schedule 时间表
                      </p>
                      <div className="border-secondary text-secondary flex w-full flex-col gap-4 border-t-2 px-2 py-3">
                        <div className="flex flex-col items-start gap-2 px-3">
                          <p className="font-merriweather bg-secondary text-primary rounded-full px-5">
                            Friday
                          </p>
                          <label className="flex w-full flex-row items-center">
                            <Field
                              type="checkbox"
                              name="sessions"
                              value="Session 1"
                              className="mr-3"
                            />
                            <div className="flex w-[90px] flex-row items-center justify-between">
                              <p>08:00pm</p>
                              <p>|</p>
                            </div>
                            <p className="pl-5">Session 1</p>
                          </label>
                        </div>
                        <div className="flex flex-col items-start gap-2 px-3">
                          <p className="font-merriweather bg-secondary text-primary rounded-full px-5">
                            Saturday
                          </p>

                          <label className="flex flex-row items-center">
                            <Field
                              type="checkbox"
                              name="sessions"
                              value="Session 2"
                              className="mr-3"
                            />
                            <div className="flex w-[90px] flex-row items-center justify-between">
                              <p>10:00am</p>
                              <p>|</p>
                            </div>
                            <p className="pl-5">Session 2</p>
                          </label>

                          <label className="flex flex-row items-center">
                            <Field
                              type="checkbox"
                              name="sessions"
                              value="Talk Show"
                              className="mr-3"
                            />
                            <div className="flex w-[90px] flex-row items-center justify-between">
                              <p>01:00pm</p>
                              <p>|</p>
                            </div>
                            <p className="pl-5">Talk Show</p>
                          </label>

                          <label className="flex flex-row items-center">
                            <Field
                              type="checkbox"
                              name="sessions"
                              value="Session 3"
                              className="mr-3"
                            />
                            <div className="flex w-[90px] flex-row items-center justify-between">
                              <p>02:30pm</p>
                              <p>|</p>
                            </div>
                            <p className="pl-5">Session 3</p>
                          </label>

                          <label className="flex flex-row items-center">
                            <Field
                              type="checkbox"
                              name="sessions"
                              value="Youth Alive Concert"
                              className="mr-3"
                            />
                            <div className="flex w-[90px] flex-row items-center justify-between">
                              <p>08:00pm</p>
                              <p>|</p>
                            </div>
                            <p className="pl-5">Youth Alive Concert</p>
                          </label>
                        </div>
                      </div>
                    </div>
                    {errors.sessions && (
                      <p className="w-full pr-2 text-end text-[10px] text-white italic">
                        {errors.sessions}
                      </p>
                    )}
                  </div>
                  <div className="mt-2 flex w-full flex-row items-center gap-3">
                    <button
                      disabled={isSubmitting}
                      type="button"
                      onClick={() => setPage(2)}
                      className="border-secondary text-secondary w-full rounded-full border bg-transparent px-4 py-2"
                    >
                      Back
                    </button>
                    <button
                      disabled={isSubmitting}
                      type="submit"
                      className="bg-secondary disabled:bg-secondary/50 text-primary w-full rounded-full px-4 py-2"
                    >
                      {isSubmitting ? "Loading..." : "Submit"}
                    </button>
                  </div>
                </>
              )}
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
}

const renderSmallTeam = (pastoralTeam: string) => {
  const smallTeamOptions = {
    "KL Teens": [
      "Central (XK)",
      "Central (CS)",
      "North",
      "South",
      "East",
      "West",
    ],
    "KL Youth": ["Central", "North", "South", "Working Adult"],
    USJ: ["Knight Warrior", "Mighty Warrior"],
    Others: [""],
  };

  if (
    pastoralTeam === "KL Teens" ||
    pastoralTeam === "KL Youth" ||
    pastoralTeam === "USJ"
  ) {
    return (
      <Select
        name="small_team"
        options={smallTeamOptions[pastoralTeam]}
        chiLabel=""
      />
    );
  }
  return <></>;
};
