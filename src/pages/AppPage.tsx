import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useHttp from "../hooks/useHttp";
import { useNavigate } from "react-router-dom";
import { useModalStore } from "../store/store";

import Header from "../components/Header";
import Skeleton from "../components/Skeleton";
import AddTodoForm from "../components/AddTodoForm";
import Todo from "../components/Todo";
import Spinner from "../components/Spinner";

import type { ITasksCounter } from "../types/types";

export default function AppPage() {
  const [isFormVisible, toggleFormVisibility] = useState(false);

  const { getTodos } = useHttp();
  const navigate = useNavigate();

  const { setErrorModalText } = useModalStore();

  useEffect(() => {
    if (!sessionStorage.getItem("username")) {
      navigate("/authorization/login");
    }
  });

  const { data, isError, error, isPending } = useQuery({
    queryKey: ["get-todos"],
    queryFn: () => {
      return getTodos(sessionStorage.getItem("token")!);
    },
  });

  if (isError) {
    setErrorModalText(error.message);
  }

  const tasksCounter: ITasksCounter = {
    totalTasksCount: 0,
    completedTasksCount: 0,
    tasksInProgress: 0,
  };

  if (data && data.length > 0) {
    tasksCounter.totalTasksCount = data.length;
    tasksCounter.completedTasksCount = data.filter(
      (item) => item.isDone === true
    ).length;
    tasksCounter.tasksInProgress = data.filter(
      (item) => item.isDone === false
    ).length;
  }

  return (
    <div className="w-full md:w-4/5 xl:w-2/3 bg-slate-800 px-6 relative">
      <Header
        tasksCounter={tasksCounter}
        toggleFormVisibility={toggleFormVisibility}
        isFormVisible={isFormVisible}
      />
      {isFormVisible && <AddTodoForm />}
      {isPending ? (
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <Spinner size="20" />
        </div>
      ) : (
        <div className="sm:px-7  md:px-14 mt-10">
          {data && data.length > 0 ? (
            data.map((item) => (
              <Todo
                key={item._id}
                title={item.title}
                isTaskDone={item.isDone}
                id={item._id}
              />
            ))
          ) : (
            <Skeleton />
          )}
        </div>
      )}
    </div>
  );
}
