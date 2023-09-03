"use client";
import Header from "@/components/Header";
import LoginForm from "./login-form";

export default function LoginPage() {
  return (
    <>
      <Header />
      <section className="bg-sky h-full grid place-items-center py-32">
        <div className="w-full">
          <h1 className="text-4xl lg:text-6xl text-center font-[600] text-gray-600 mb-4">
            Welcome Back
          </h1>
          <h2 className="text-md text-center mb-10 text-gray-400">
            Login to have access
          </h2>
          <LoginForm />
        </div>
      </section>
    </>
  );
}
