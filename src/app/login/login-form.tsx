"use client";

import { LoginUserInput, LoginUserSchema } from "@/lib/validations/user.schema";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import FormInput from "@/components/base/FormInput";
import Link from "next/link";
import LoadingButton from "@/components/base/LoadingButton";
import useStore from "@/store";
import { handleApiError } from "@/lib/helpers";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import useHttp from "@/lib/hooks/useHttp";
export default function LoginForm() {
  const store: any = useStore();
  const router = useRouter();
  const { auth } = useHttp();
  const methods = useForm<LoginUserInput>({
    resolver: zodResolver(LoginUserSchema),
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitSuccessful },
  } = methods;

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSubmitSuccessful]);

  useEffect(() => {
    store.reset();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function LoginUserFunction(credentials: LoginUserInput) {
    store.setRequestLoading(true);
    try {
      const user = await auth.apiLoginUser(credentials);
      store.setAuthUser(user);
      toast.success("Logged in successfully");
      router.push("/dashboard");
    } catch (error: any) {
      if (error instanceof Error) {
        handleApiError(error);
      } else {
        toast.error(error.message);
      }
    } finally {
      store.setRequestLoading(false);
    }
  }

  const onSubmitHandler: SubmitHandler<LoginUserInput> = (values) => {
    LoginUserFunction(values);
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmitHandler)}
        className="max-w-4xl w-full mx-auto overflow-hidden shadow-3xl shadow-shadow-500 bg-white rounded-xl p-8 grid grid-cols-1 sm:grid-cols-2 gap-4"
      >
        <FormInput label="Email" name="email" type="email" />
        <FormInput label="Password" name="password" type="password" />
        <span className="block mt-10 text-md">
          Need an account?{" "}
          <Link
            href="/register"
            className="text-gray-500 hover:text-primary-500"
          >
            Sign Up Here
          </Link>
        </span>
        <LoadingButton
          loading={store.requestLoading}
          disabled={false}
          textColor="text-white"
          className="mt-1 md:mt-5"
        >
          Login
        </LoadingButton>
      </form>
    </FormProvider>
  );
}
