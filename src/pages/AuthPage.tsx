import AuthForm from "../components/AuthForm";

export default function AuthPage() {
  return (
    <div className="min-h-screen items-center flex pt-24 sm:pt-32  flex-col gap-8">
      <h1 className="text-3xl sm:text-5xl text-purple-400 font-bold">
        Plan your day 📑
      </h1>
      <AuthForm />
      <p className="italic text-slate-400 px-4 text-center">
        A goal without plan is just a wish (c) - Antoine de Saint-Exupery
      </p>
    </div>
  );
}
