export default function UserInfoPanel() {
  const username = sessionStorage.getItem("username");

  const signOut = () => {
    sessionStorage.removeItem("username");
    sessionStorage.removeItem("token");
    window.location.reload();
  };

  return (
    <div className="absolute animate-appear right-0 flex flex-col items-center gap-3 text-lg sm:text-xl bg-slate-600 p-6 rounded-md">
      <span className="italic">
        User:{" "}
        <span className="font-bold not-italic text-purple-400">{username}</span>
      </span>
      <button
        onClick={signOut}
        className="bg-purple-400 transition hover:bg-purple-300 font-bold text-slate-800 p-2 rounded-lg"
      >
        Sign out
      </button>
    </div>
  );
}
