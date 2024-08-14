import type { ILoginRequest, ILoginResponse } from "../types/types";

export default function useAuth() {
  const BASE_AUTH_URL = "https://mern-todo-backend-delta.vercel.app/auth/";

  const login = async ({ username, password }: ILoginRequest): Promise<ILoginResponse> => {
    const response = await fetch(`${BASE_AUTH_URL}login`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      const errorResponse = await response.json();
      throw new Error(errorResponse.errorMessage);
    }

    return await response.json();
  };

  const createNewUser = async ({ username, password }: ILoginRequest) => {
    const response = await fetch(`${BASE_AUTH_URL}registration`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    //* Custom Error Handling on client side
    if (!response.ok) {
      const errorResponse = await response.json();
      throw new Error(errorResponse.errorMessage);
    }

    return await response.json();
  };

  const getUser = async (username: string) => {
    const response = await fetch(`${BASE_AUTH_URL}users/${username}`);

    return await response.json();
  };

  return {
    login,
    createNewUser,
    getUser,
  };
}
