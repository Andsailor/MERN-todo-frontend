import type { ICreateTodoRequest, IGetTodoResponse } from "../types/types";

export default function useHttp() {
  const API_URL = "https://mern-todo-backend-delta.vercel.app/todos/";

  const getTodos = async (token: string): Promise<IGetTodoResponse[] | undefined> => {
    const response = await fetch(API_URL, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Something went wrong!");
    }

    return await response.json();
  };

  const toggleTaskStatus = async (id: string): Promise<IGetTodoResponse> => {
    const response = await fetch(`${API_URL}${id}`, {
      method: "PUT",
    });

    if (!response.ok) {
      throw new Error("Something went wrong!");
    }

    return await response.json();
  };

  const addNewTodo = async (params: ICreateTodoRequest) => {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: params.title,
        username: params.username,
      }),
    });

    if (!response.ok) {
      const errorResponse = await response.json();
      throw new Error(errorResponse.errorMessage);
    }

    return await response.json();
  };

  const deleteTodo = async (id: string) => {
    const response = await fetch(`${API_URL}${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Something went wrong!");
    }

    return await response.json();
  };

  return {
    getTodos,
    addNewTodo,
    deleteTodo,
    toggleTaskStatus,
  };
}
