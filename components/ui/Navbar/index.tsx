import Link from "next/link";
import { auth } from "@/lib/auth";
import { signInWithEmail, signOutAction } from "@/lib/actions/auth";
import { SignInModal } from "./SignInModal";
import { UserMenu } from "./UserMenu";

export const Navbar = async () => {
  const session = await auth();

  return (
    <header className="flex items-center justify-between border-b border-zinc-800 bg-zinc-950 px-6 py-3">
      <Link
        href="/tracker/jokers"
        className="font-balatro text-2xl text-zinc-100 tracking-wide transition-colors hover:text-white"
      >
        Balatro Tracker
      </Link>
      {session?.user?.email ? (
        <UserMenu email={session.user.email} onSignOut={signOutAction} />
      ) : (
        <SignInModal action={signInWithEmail} />
      )}
    </header>
  );
};
