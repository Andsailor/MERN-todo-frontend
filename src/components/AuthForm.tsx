import { useAuthMutation } from "../hooks/useAuthMutation";
import { Link, useLocation } from "react-router-dom";
import { FormikValues, useFormik } from "formik";

import clsx from "clsx";
import * as yup from "yup";

import spinnerIcon from "../assets/spinner.svg";

interface IFormProps {
  formik: FormikValues;
  isLoading: boolean;
  formType: "registration" | "login";
}

export default function AuthForm() {
  const { loginMutation, registrationMutation } = useAuthMutation();

  const location = useLocation();

  const formType =
    location.pathname == "/authorization/registration"
      ? "registration"
      : "login";

  const AuthFormSchema = yup.object().shape({
    username: yup
      .string()
      .required("Login is required")
      .min(3, "Login is too short (minimum 3 characters)"),
    password: yup
      .string()
      .required("Password is required")
      .min(3, "Password is too short (minimum 3 characters)"),
  });

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: AuthFormSchema,
    onSubmit: (values) => {
      formType === "registration"
        ? registrationMutation.mutate({
            username: values.username,
            password: values.password,
          })
        : loginMutation.mutate({
            username: values.username,
            password: values.password,
          });
    },
    validateOnChange: false,
  });

  const isLoading = loginMutation.isPending || registrationMutation.isPending;

  return <Form formik={formik} formType={formType} isLoading={isLoading} />;
}

function Form({ formik, isLoading, formType }: IFormProps) {
  const submitButtonText = formType === "login" ? "Sign In" : "Create";

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="w-5/6 sm:w-3/4 flex flex-col items-center border py-10 px-4 sm:p-10 animate-appear rounded-md border-slate-500 bg-slate-600"
    >
      <h1 className="mb-4 text-2xl sm:text-3xl text-purple-400 ">
        {formType === "login" ? "Sign In" : "Create Account"}
      </h1>
      <label
        className="self-start mb-1 text-purple-400 font-bold italic"
        htmlFor="username"
      >
        Login
      </label>
      <input
        onChange={formik.handleChange}
        value={formik.values.username}
        placeholder="Enter your login"
        id="username"
        className={clsx(
          "hover:bg-slate-400 mb-4 w-full h-12 rounded-md bg-slate-300 px-2 text-lg font-bold text-slate-900 placeholder:text-slate-600 placeholder:font-medium",
          formik.errors.username && "border-2 border-red-400"
        )}
        type="text"
      />
      {formik.touched.username && formik.errors.username && (
        <div className="text-red-400 -mt-2 block w-full text-end text-sm">
          {formik.errors.username}
        </div>
      )}
      <label
        className="self-start mb-1 text-purple-400  font-bold italic"
        htmlFor="password"
      >
        Password
      </label>
      <input
        onChange={formik.handleChange}
        value={formik.values.password}
        placeholder="Enter your password"
        id="password"
        className={clsx(
          "hover:bg-slate-400 mb-4 w-full h-12 rounded-md bg-slate-300 px-2 text-lg font-bold text-slate-900 placeholder:text-slate-600 placeholder:font-medium",
          formik.errors.password && "border-2 border-red-400"
        )}
        type="password"
      />
      {formik.touched.password && formik.errors.password && (
        <div className="text-red-400 -mt-2 block w-full text-end text-sm">
          {formik.errors.password}
        </div>
      )}
      <p className="text-slate-200 mt-2">
        {formType === "login" ? (
          <>
            <span>Have no account? </span>
            <Link
              className="text-purple-400"
              to={"/authorization/registration"}
            >
              Create
            </Link>
          </>
        ) : (
          <>
            <span>Have an account? </span>
            <Link className="text-purple-400" to={"/authorization/login"}>
              Sign in
            </Link>
          </>
        )}
      </p>

      <button
        className="mt-2 w-1/2 h-10 rounded-md text-slate-700 font-bold flex justify-center items-center bg-purple-200  hover:bg-purple-400 transition"
        type="submit"
      >
        {isLoading ? (
          <img
            className="size-6"
            src={spinnerIcon}
            alt="Loading Spinner Icon"
          />
        ) : (
          <span>{submitButtonText}</span>
        )}
      </button>
    </form>
  );
}
