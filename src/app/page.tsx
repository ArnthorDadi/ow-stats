import Link from "next/link";

import { getServerAuthSession } from "@/server/auth";
import { api, HydrateClient } from "@/trpc/server";

export default async function Home() {
  const session = await getServerAuthSession();
  void api.post.getLatest.prefetch();

  return (
    <HydrateClient>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
          <h1 className="text-center text-5xl font-extrabold tracking-tight sm:text-[5rem]">
            Overwatch{" "}
            <span className="text-[hsl(280,100%,70%)]">Statistics</span>
          </h1>
          <div className="flex flex-col gap-2">
            <p className={"mx-auto text-center text-xl text-gray-200"}>
              ~ Dedicated to Eyrún, my love ~
            </p>
            <p className={"mx-auto text-center text-sm italic text-gray-200"}>
              Hopefully this helps you in your insane pursuit of documenting
              everything in the overwatch league
            </p>
          </div>
          <Link
            href={
              session
                ? "/dashboard"
                : `/api/auth/signin?callbackUrl=${encodeURIComponent("/dashboard")}`
            }
            className="mx-auto w-fit rounded-md bg-white/10 px-8 py-3 font-semibold no-underline transition hover:bg-white/20"
          >
            {session ? "Dashboard" : "Sign in"}
          </Link>
        </div>
      </main>
    </HydrateClient>
  );
}
