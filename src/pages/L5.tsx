import { doc } from "firebase/firestore";
import Image from "next/image";
import { useFirestore, useFirestoreDocData } from "reactfire";
import { Bebas_Neue } from "next/font/google";

const bebas = Bebas_Neue({
  subsets: ["latin"],
  weight: ["400"],
});

export default function HomePage() {
  const db = useFirestore();

  const dbRef = doc(db, "votes/vote");
  const { status, data } = useFirestoreDocData(dbRef);

  return status === "success" ? (
    <main
      className={`${bebas.className} relative min-h-[1000px] min-w-[4000px] overflow-hidden bg-[url(/BG.jpg)] [--stacks:3]`}
    >
      {/* <Image
        src="/Example_Question.png"
        className="absolute top-0 left-0 z-20 h-full w-full object-cover"
        alt="bg"
        width={4000}
        height={1000}
      /> */}
      <Image
        src="/L5.jpg"
        className="absolute top-0 left-0 -z-10 h-full w-full object-cover"
        alt="bg"
        width={4000}
        height={1000}
      />
      {/* <Image
        src="/qr.svg"
        className="absolute top-1/2 left-[5%] h-[500px] w-[500px] -translate-y-1/2"
        width={2000}
        height={2000}
        alt="qr"
      />
      <Image
        src="/qr.svg"
        className="absolute top-1/2 right-[5%] h-[500px] w-[500px] -translate-y-1/2"
        width={2000}
        height={2000}
        alt="qr"
      /> */}

      <div
        style={{
          opacity: data.hide ? "0" : "1",
        }}
        className="absolute top-[7.5%] left-[12%] z-50 flex flex-col items-center text-[90px] text-white transition-opacity duration-300"
      >
        Agree 同意
        <div className="w-full max-w-[300px] rounded-2xl border-[10] border-white bg-blue-500 pt-2.5 pb-1 text-center text-[150px] leading-[1.1]">
          {data?.agree}
        </div>
      </div>

      <div
        style={{
          opacity: data.hide ? "0" : "1",
        }}
        className="absolute top-[7.5%] right-[10%] z-50 flex flex-col items-center text-[90px] text-white transition-opacity duration-300"
      >
        Disagree 不同意
        <div className="w-full max-w-[300px] rounded-2xl border-[10] border-white bg-[magenta] pt-2.5 pb-1 text-center text-[150px] leading-[1.1]">
          {data?.disagree}
        </div>
      </div>
    </main>
  ) : null;
}
