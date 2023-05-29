"use client";

export default function SignOutButton() {
  const logout = async () => {
    await fetch("/api/logout", {
      method: "POST",
    });
    window.location.reload();
  };

  return (
    <button
      onClick={() => logout()}
      className="px-4 py-2  text-black hover:bg-black hover:text-white"
    >
      Sign Out
    </button>
  );
}
