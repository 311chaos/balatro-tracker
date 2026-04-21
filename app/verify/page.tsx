const VerifyPage = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-zinc-950">
      <div className="w-full max-w-sm space-y-4 rounded-xl border border-zinc-800 bg-zinc-900 p-8 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-zinc-800">
          <span className="text-2xl">📬</span>
        </div>
        <h1 className="text-xl font-bold text-white">Check your email</h1>
        <p className="text-sm text-zinc-400">
          A sign-in link has been sent to your email address. Click the link to
          continue.
        </p>
      </div>
    </main>
  );
};

export default VerifyPage;
