import { auth } from "@/lib/auth";
import { JokerList } from "@/components/tracker/JokerList";
import { Navbar } from "@/components/ui/Navbar";
import { getJokerProgress } from "@/lib/actions/jokerProgress";
import type { StickerLevel } from "@/config/types";

const JokersPage = async () => {
  const session = await auth();
  const initialProgress: Record<string, StickerLevel> = session?.user
    ? await getJokerProgress()
    : {};

  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <Navbar />
      <div className="mx-auto w-full max-w-5xl">
        <JokerList
          initialProgress={initialProgress}
          isAuthenticated={Boolean(session?.user)}
        />
      </div>
    </main>
  );
};

export default JokersPage;
