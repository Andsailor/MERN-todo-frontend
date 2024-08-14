import { useModalStore } from "../store/store";

import clsx from "clsx";

import errorIcon from "../assets/error.svg";
import successIcon from "../assets/success.svg";

export default function Modal() {
  const {
    successModalText,
    errorModalText,
    setErrorModalText,
    setSuccessModalText,
  } = useModalStore();

  if (successModalText || errorModalText) {
    return (
      <div className="animate-appear min-w-full min-h-full  flex items-center bg-slate-800 bg-opacity-70 justify-center absolute z-10 top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 text-white">
        <div className="border-2 border-purple-300 w-4/5  sm:w-3/5 md:w-2/5 xl:w-1/5 rounded-md py-10 px-2 bg-slate-600 flex justify-center items-center flex-col gap-5">
          <img
            className="size-16"
            src={errorModalText ? errorIcon : successIcon}
            alt="Modal main icon"
          />
          <h1
            className={clsx(
              "font-bold text-center",
              errorModalText && "text-red-400",
              !errorModalText && "text-green-300"
            )}
          >
            {errorModalText.length > 0 ? errorModalText : successModalText}
          </h1>
          <button
            onClick={() => {
              setErrorModalText("");
              setSuccessModalText("");
            }}
            className="w-1/2 h-10 font-bold text-purple-300 bg-slate-800 hover:bg-slate-700 transition rounded-md"
          >
            {errorModalText.length > 0 ? "Try again" : "Continue"}
          </button>
        </div>
      </div>
    );
  }
}
