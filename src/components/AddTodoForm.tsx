import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useModalStore } from "../store/store";
import useHttp from "../hooks/useHttp";

import Spinner from "./Spinner";

export default function Form() {
  const [title, setTitle] = useState<string>("");

  const { setErrorModalText } = useModalStore();

  const queryClient = useQueryClient();

  const { addNewTodo } = useHttp();

  const { mutate, isPending } = useMutation({
    mutationKey: ["create-new-todo"],
    mutationFn: addNewTodo,
    onError: (err) => {
      setErrorModalText(err.message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get-todos"] });
    },
  });

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const username = sessionStorage.getItem("username");

    if (title.length > 0 && username) {
      mutate({ title: title, username: username });
      setTitle("");
    }
  };

  return (
    <>
      <form
        onSubmit={(e) => handleFormSubmit(e)}
        className="w-full mt-4 sm:px-6 md:px-10 lg:px-16 flex justify-center gap-4 animate-appear"
      >
        <input
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          className="w-5/6 h-12 rounded-md bg-slate-500 px-2 placeholder-slate-700  font-semibold text-sm md:text-base lg:text-lg"
          placeholder="Please add title"
          type="text"
        />
        <button
          type="submit"
          className="w-2/6 sm:w-1/6 bg-slate-600 rounded-md flex justify-center items-center text-purple-400 font-bold text-sm md:text-base lg:text-lg hover:bg-slate-500 transition"
        >
          {isPending ? <Spinner size="7" /> : "Add Task"}
        </button>
      </form>
    </>
  );
}
