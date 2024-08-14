import { useMutation, useQueryClient } from "@tanstack/react-query";
import useHttp from "../hooks/useHttp";

import clsx from "clsx";

import Spinner from "./Spinner";

import trashbox from "../assets/trashbox.svg";
import completed from "../assets/completed.svg";
import complete from "../assets/complete.svg";
import spinner from "../assets/spinner.svg";

interface IProps {
  title: string;
  isTaskDone: boolean;
  id: string;
}

export default function Todo({ title, isTaskDone, id }: IProps) {
  const queryClient = useQueryClient();

  const { toggleTaskStatus, deleteTodo } = useHttp();

  const updateMutation = useMutation({
    mutationKey: ["toggle-task-status"],
    mutationFn: toggleTaskStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get-todos"] });
    },
  });

  const deleteMutation = useMutation({
    mutationKey: ["delete-todo"],
    mutationFn: deleteTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get-todos"] });
    },
  });

  return (
    <div className="mb-10 flex justify-between gap-2 items-center ">
      <div className="flex items-center gap-4 ">
        <img
          onClick={() => updateMutation.mutate(id)}
          className="size-7 cursor-pointer hover:scale-125 transition"
          src={
            updateMutation.isPending
              ? spinner
              : isTaskDone
              ? completed
              : complete
          }
          alt="Complete task button icon"
        />
        <div
          className={clsx(
            "text-lg sm:text-2xl md:text-3xl",
            isTaskDone && "text-slate-500 line-through",
            !isTaskDone && "text-white"
          )}
        >
          {title}
        </div>
      </div>
      {deleteMutation.isPending ? (
        <Spinner size="7" />
      ) : (
        <img
          onClick={() => deleteMutation.mutate(id)}
          className="size-7 cursor-pointer hover:scale-125 transition"
          src={trashbox}
          alt="Trashbox button to delete todo"
        />
      )}
    </div>
  );
}
