export interface IGetTodoRequest {
  token: string;
  username: string;
}

export interface IGetTodoResponse {
  title: string;
  _id: string;
  isDone: boolean;
}

export interface ITasksCounter {
  totalTasksCount: number | undefined;
  completedTasksCount: number | undefined;
  tasksInProgress: number | undefined;
}

export interface ICreateTodoRequest {
  title: string;
  username: string;
}

export interface ILoginRequest {
  username: string;
  password: string;
}

export interface ILoginResponse {
  token: string;
  username: string;
}

export interface IModalStore {
  errorModalText: string;
  successModalText: string;
  setErrorModalText: (text: string) => void;
  setSuccessModalText: (text: string) => void;
}
