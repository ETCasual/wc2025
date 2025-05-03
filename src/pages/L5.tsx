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

  const dbRef = doc(db, "registration/count");
  const { status, data } = useFirestoreDocData(dbRef);

  return status === "success" ? (
    <main
      className={`${bebas.className} relative min-h-[1000px] min-w-[4000px] overflow-hidden bg-[url(/BG.jpg)] [--stacks:3]`}
    >
      <Image
        src="/L5.jpg"
        className="absolute top-0 left-0 -z-10 h-full w-full object-cover"
        alt="bg"
        width={4000}
        height={1000}
      />
      <Image
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
      />
      <Image
        src="/WC25_Logo.png"
        className="absolute top-[30%] left-1/2 w-[600px] -translate-x-1/2 -translate-y-1/2 opacity-20"
        width={499}
        height={292}
        alt="logo"
      />
      <div
        className={`absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-[40%] flex-col items-center gap-6`}
      >
        <p className="text-secondary text-[150px] leading-[0] tracking-widest text-shadow-lg">
          Live Registration
        </p>
        <p className="text-secondary text-[500px] leading-[1.2] font-bold tracking-wider text-shadow-lg">
          {data.no}
        </p>
      </div>
    </main>
  ) : null;
}
