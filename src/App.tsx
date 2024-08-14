import { Routes } from "react-router-dom";

import Modal from "./components/Modal";

import { Route } from "react-router-dom";

import AppPage from "./pages/AppPage";
import AuthPage from "./pages/AuthPage";

export default function App() {
  return (
    <div className=" bg-slate-700 w-full min-h-screen flex justify-center relative">
      <Routes>
        <Route path="/" element={<AppPage />} />
        <Route path="/authorization/registration" element={<AuthPage />} />
        <Route path="/authorization/login" element={<AuthPage />} />
      </Routes>
      <Modal />
    </div>
  );
}
