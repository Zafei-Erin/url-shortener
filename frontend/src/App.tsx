import { useRef, useState } from "react";
import { Loader } from "./assets/Loader";

type Status = "EMPTY" | "LOADING" | "ERROR" | "SUCCESSFUL";

const SERVER = import.meta.env.VITE_SERVER || "http://localhost:4000/";

function App() {
  const [status, setStatus] = useState<Status>("EMPTY");
  const [error, setError] = useState<string>("");
  const [shortenedURL, setShortenedURL] = useState<string>("");
  const [copy, setCopy] = useState<string>("Copy");
  const inpurRef = useRef<HTMLInputElement | null>(null);

  const submit = async () => {
    setStatus("LOADING");
    try {
      const input = inpurRef.current?.value;
      if (!input) {
        throw new Error("Please provice a URL.");
      }

      const url = new URL(SERVER);
      const param = { url: input };
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(param),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      } else {
        setStatus("SUCCESSFUL");
        setShortenedURL(data.shortened);
      }
    } catch (error) {
      setStatus("ERROR");
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Something went wrong.");
      }
    }
  };

  const handleCopy = () => {
    setCopy("Copied!");
    navigator.clipboard.writeText(shortenedURL);
    setTimeout(() => {
      setCopy("Copy");
    }, 2000);
  };

  return (
    <div className="w-full h-screen flex items-center justify-center p-3">
      <div className="border w-[30rem] h-60 border-slate-400 flex flex-col items-start justify-start gap-3 rounded-lg py-6 px-8 bg-slate-300">
        {/* Title */}
        <h1 className="text-xl font-semibold text-slate-700">URL Shortener</h1>

        {/* Input */}
        <div className="mt-6 w-full">
          <div className="flex gap-3 w-full h-10 items-center justify-between">
            <input
              type="text"
              ref={inpurRef}
              className="rounded-lg flex-1 appearance-none h-full focus:outline-none px-3"
            />
            <button
              onClick={submit}
              className="bg-slate-400 h-full py-2 px-4 rounded-lg hover:bg-slate-500 hover:text-white transition-all"
            >
              Submit
            </button>
          </div>
          {status == "ERROR" && (
            <p className=" text-red-600 text-sm mt-2">{error}</p>
          )}

          {/* Result */}
          <div className="flex mt-2 h-full items-center justify-center">
            {status == "LOADING" && <Loader className="w-10 h-10 " />}
            {status == "SUCCESSFUL" && (
              <div className="gap-3 flex items-center justify-center max-sm:flex-col">
                <a
                  href={shortenedURL}
                  className="underline text-sm sm:text-md text-slate-700 transition-all hover:text-slate-500"
                >
                  {shortenedURL}
                </a>
                <button
                  onClick={handleCopy}
                  className="bg-slate-100 h-full w-full sm:w-fit text-xs py-1 px-2 rounded-lg hover:bg-slate-200 text-slate-600 transition-all"
                >
                  {copy}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
