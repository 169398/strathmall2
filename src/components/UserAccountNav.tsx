import Link from "next/link";

const UserAccountNav = ({ user } ) => {
  return (
    <div className="flex items-center space-x-4">
      <span>{user.name}</span>
      <Link
        href="/api/auth/signout"
        className="rounded-full bg-white/10 px-4 py-2 font-semibold no-underline transition hover:bg-white/20"
      >
        Sign out
      </Link>
    </div>
  );
};

export default UserAccountNav;
