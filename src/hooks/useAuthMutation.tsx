import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";
import { useModalStore } from "../store/store";

export const useAuthMutation = () => {
  const { login, createNewUser } = useAuth();
  const { setErrorModalText, setSuccessModalText } = useModalStore();
  const navigate = useNavigate();

  const loginMutation = useMutation({
    mutationKey: ["login"],
    mutationFn: login,
    onError: (error) => {
      setErrorModalText(error.message);
    },
    onSuccess: (data) => {
      sessionStorage.setItem("token", data.token);
      sessionStorage.setItem("username", data.username);
      navigate("/");
    },
  });

  const registrationMutation = useMutation({
    mutationKey: ["create-new-user"],
    mutationFn: createNewUser,
    onError: (error) => {
      setErrorModalText(error.message);
    },
    onSuccess: () => {
      setSuccessModalText("Account successfuly created!");
      navigate("/authorization/login");
    },
  });

  return {
    loginMutation,
    registrationMutation,
  };
};
