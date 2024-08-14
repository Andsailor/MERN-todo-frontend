import appLogo from "../assets/todo.svg";
import addTodoButton from "../assets/plus-circle.svg";
import closeTodoButton from "../assets/close-circle.svg";
import totalCountIcon from "../assets/total.svg";
import completeIcon from "../assets/complete.svg";
import completedIcon from "../assets/completed.svg";
import avatarIcon from "../assets/avatar.svg";

import UserInfoPanel from "./UserInfoPanel";

import type { ITasksCounter } from "../types/types";
import { useState } from "react";

interface IProps {
  toggleFormVisibility: React.Dispatch<React.SetStateAction<boolean>>;
  isFormVisible: true | false;
  tasksCounter: ITasksCounter;
}

export default function Header({
  toggleFormVisibility,
  isFormVisible,
  tasksCounter,
}: IProps) {
  const [isUserInfoVisible, setIsUserInfoVisible] = useState(false);

  return (
    <header className="h-20 relative">
      <div className="py-2 flex justify-between items-center">
        <div className="flex gap-4 sm:gap-6 md:gap-12 items-center text-2xl sm:text-4xl text-purple-400 font-bold">
          <img
            src={appLogo}
            className="hidden sm:block md:h-16"
            alt="Todo application logo"
          />
          <span className="flex items-center gap-3">
            <img
              className="size-6 md:size-8"
              src={totalCountIcon}
              alt="Total tasks counter icon"
            />{" "}
            {tasksCounter.totalTasksCount}
          </span>

          <span className="flex items-center gap-3">
            <img
              className="size-6  md:size-8"
              src={completedIcon}
              alt="Completed tasks counter icon"
            />{" "}
            {tasksCounter.completedTasksCount}
          </span>

          <span className="flex items-center gap-3">
            <img
              className="size-6  md:size-8"
              src={completeIcon}
              alt="Tasks to complete icon"
            />{" "}
            {tasksCounter.tasksInProgress}
          </span>
        </div>

        <div className="gap-2 flex sm:gap-6 items-center">
          <img
            onClick={() => toggleFormVisibility(!isFormVisible)}
            src={isFormVisible ? closeTodoButton : addTodoButton}
            className="size-10 sm:size-16 hover:scale-110 transition cursor-pointer"
            alt="Add todo button icon"
          />

          <img
            onClick={() => setIsUserInfoVisible((visibility) => !visibility)}
            src={avatarIcon}
            className="size-10 sm:size-14 hover:scale-110 transition cursor-pointer"
            alt="Avatar Icon"
          />
        </div>
      </div>
      {isUserInfoVisible && <UserInfoPanel />}
    </header>
  );
}
