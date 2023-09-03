"use client";
import Link from "next/link";
import Header from "@/components/Header";
import useSession from "@/lib/hooks/useSession";
export default function Home() {
  const user = useSession();
  return (
    <>
      <Header />
      <section className="bg-sky h-full pt-10 overflow-hidden">
        <div className="max-w-4xl mx-auto bg-ct-dark-100 rounded-md h-[20rem] flex justify-center items-center">
          {!user && (
            <Link
              href="/register"
              className="inline-flex justify-center rounded-lg text-sm font-semibold py-3 px-4 bg-slate-900 text-white hover:bg-slate-700"
            >
              Register
            </Link>
          )}
          {user && (
            <Link
              href="/dashboard"
              className="inline-flex justify-center rounded-lg text-sm font-semibold py-3 px-4 bg-slate-900 text-white hover:bg-slate-700"
            >
              Dashboard
            </Link>
          )}
        </div>
      </section>
    </>
  );
}
