"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export function AdminHeader() {
  const router = useRouter();

  return (
    <header className="flex items-center justify-between border-b border-zinc-200 py-6">
      <Link href="/admin" className="flex items-center gap-3">
        <Image
          src="/logos/d.svg"
          alt=""
          width={28}
          height={28}
          className="rounded-[6px]"
        />
        <span className="font-poppins text-lg text-zinc-900">Admin</span>
      </Link>

      <div className="flex items-center gap-5">
        <Link
          href="/"
          className="font-poppins text-sm text-zinc-500 transition-colors hover:text-zinc-900"
        >
          View site
        </Link>
        <button
          type="button"
          onClick={async () => {
            await fetch("/api/admin/logout", { method: "POST" });
            router.replace("/admin/login");
            router.refresh();
          }}
          className="font-poppins text-sm text-zinc-500 transition-colors hover:text-zinc-900"
        >
          Sign out
        </button>
      </div>
    </header>
  );
}
