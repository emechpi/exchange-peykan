"use client";
import RegisterForm from "./register-form";

export default function RegisterPage() {
  return (
    <>
      <section className="bg-sky min-h-full grid place-items-center py-32">
        <div className="w-full">
          <h1 className="text-4xl lg:text-6xl text-center font-[600] text-gray-600 mb-3">
            Welcome to your Exchange!
          </h1>
          <h2 className="text-md text-center mb-10 text-gray-400">
            Sign Up To Get Started!
          </h2>
          <RegisterForm />
        </div>
      </section>
    </>
  );
}
