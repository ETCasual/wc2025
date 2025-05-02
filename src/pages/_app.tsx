import { type AppType } from "next/app";
import { Merriweather } from "next/font/google";

import "@/styles/globals.css";
import { FirebaseAppProvider } from "reactfire";
import { firebaseConfig } from "@/lib/firebase";
import { Firestore } from "@/components/Init";

const merriweather = Merriweather({
  subsets: ["latin"],
  weight: ["400", "700"],
});

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <FirebaseAppProvider firebaseConfig={firebaseConfig}>
      <Firestore>
        <div className={merriweather.className}>
          <Component {...pageProps} />
        </div>
      </Firestore>
    </FirebaseAppProvider>
  );
};

export default MyApp;
