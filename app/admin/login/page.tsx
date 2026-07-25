"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    setPending(true);
    setError(null);

    const response = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    if (response.ok) {
      router.replace("/admin");
      router.refresh();
      return;
    }

    const payload = await response.json().catch(() => ({}));
    setError(payload.error ?? "Something went wrong");
    setPending(false);
  }

  return (
    <div className="flex min-h-svh items-center justify-center px-6">
      <form onSubmit={submit} className="w-full max-w-sm">
        <h1 className="font-poppins text-3xl font-medium tracking-tight text-zinc-900">
          Admin
        </h1>
        <p className="mt-2 font-raleway text-base text-zinc-600">
          Enter the password to edit case studies and posts.
        </p>

        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          autoFocus
          className="mt-6 w-full rounded-xl border border-zinc-200 px-4 py-3 font-raleway text-base text-zinc-900 outline-none focus:border-zinc-900"
          placeholder="Password"
        />

        {error ? (
          <p className="mt-3 font-raleway text-sm text-red-700">{error}</p>
        ) : null}

        <button
          type="submit"
          disabled={pending || !password}
          className="mt-4 w-full rounded-xl bg-zinc-900 px-4 py-3 font-poppins text-base text-white transition-opacity disabled:opacity-50"
        >
          {pending ? "Checking…" : "Sign in"}
        </button>
      </form>
    </div>
  );
}
