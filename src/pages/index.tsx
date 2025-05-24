import Head from "next/head";
import Image from "next/image";
import { useFirestore } from "reactfire";
import { updateDoc, doc, increment } from "firebase/firestore";
import { useVote } from "@/store/useVote";

const display = {
  agree: "Yes",
  disagree: "No",
};

export default function Home() {
  const { selection, setSelection, hasPreviouslySelected } = useVote();

  const db = useFirestore();
  const dbRef = doc(db, "votes/vote");

  const uploadSelection = async (opt: "agree" | "disagree") => {
    if (selection === opt && hasPreviouslySelected) {
      // Do nothing
      return;
    }

    if (selection !== opt && hasPreviouslySelected) {
      await updateDoc(dbRef, {
        [opt]: increment(1),
        [selection]: increment(-1),
      }).then(() => {
        setSelection(opt);
      });
    } else if (selection === "" && !hasPreviouslySelected) {
      await updateDoc(dbRef, {
        [opt]: increment(1),
      }).then(() => {
        setSelection(opt);
      });
    }
  };
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
        <div className="flex w-full flex-col gap-4 px-5">
          <div className="w-full rounded-xl bg-white px-4 py-3 text-center text-xl">
            你的选项: {display[selection as keyof typeof display] || "未选择"}
          </div>

          <div className="flex w-full flex-col gap-4 rounded-xl bg-white px-3 py-3">
            <button
              className="rounded-lg bg-green-300 px-4 py-5"
              onClick={() => uploadSelection("agree")}
            >
              Yes
            </button>
            <button
              className="rounded-lg bg-red-300 px-4 py-5"
              onClick={() => uploadSelection("disagree")}
            >
              No
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
