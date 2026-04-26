import Link from 'next/link';
import { auth } from '@/lib/auth';
import { signInWithEmail, signOutAction } from '@/lib/actions/auth';
import { Logo } from '@/components/ui/Logo';
import { SignInModal } from './SignInModal';
import { UserMenu } from './UserMenu';

export const Navbar = async () => {
  const session = await auth();

  return (
    <header className="flex items-center justify-between border-b border-zinc-800 bg-zinc-950 px-6 py-3">
      <Link
        href="/tracker/jokers"
        aria-label="Balatro Tracker — go to tracker"
        className="opacity-90 transition-opacity hover:opacity-100"
      >
        <Logo size={64} aria-hidden />
      </Link>
      {session?.user?.email ? (
        <UserMenu email={session.user.email} onSignOut={signOutAction} />
      ) : (
        <SignInModal action={signInWithEmail} />
      )}
    </header>
  );
};
