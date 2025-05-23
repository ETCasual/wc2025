import { doc, updateDoc } from "firebase/firestore";
import { useFirestore, useFirestoreDocData } from "reactfire";

export default function Control() {
  const db = useFirestore();

  const dbRef = doc(db, "votes/vote");
  const { status, data } = useFirestoreDocData(dbRef);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-4">
      <h1 className="mb-4 text-xl font-bold sm:text-2xl">Control Panel</h1>
      {status === "success" ? (
        <button
          className="rounded-lg bg-blue-500 px-4 py-2 text-white shadow-md transition hover:bg-blue-600 sm:px-6 sm:py-3"
          onClick={() => updateDoc(dbRef, { hide: !data.hide })}
        >
          {data.hide ? "Show" : "Hide"}
        </button>
      ) : (
        <div className="flex items-center justify-center">
          <svg
            className="mr-3 h-5 w-5 animate-spin text-blue-500"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8z"
            ></path>
          </svg>
          <span>Loading...</span>
        </div>
      )}
    </div>
  );
}
