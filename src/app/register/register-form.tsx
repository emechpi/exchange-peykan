"use client";
import {
  RegisterUserInput,
  RegisterUserSchema,
} from "@/lib/validations/user.schema";
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

export default function RegisterForm() {
  const store: any = useStore();
  const router = useRouter();
  const { auth } = useHttp();
  const methods = useForm<RegisterUserInput>({
    resolver: zodResolver(RegisterUserSchema),
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

  async function RegisterUserFunction(credentials: RegisterUserInput) {
    store.setRequestLoading(true);
    try {
      const user = await auth.apiRegisterUser(credentials);
      store.setAuthUser(user);
      toast.success("Sign up successfully");
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

  const onSubmitHandler: SubmitHandler<RegisterUserInput> = (values) => {
    RegisterUserFunction(values);
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmitHandler)}
        className="max-w-4xl w-full mx-auto overflow-hidden shadow-3xl shadow-shadow-500 bg-white rounded-xl p-8 grid grid-cols-1 gap-4 sm:grid-cols-2"
      >
        <FormInput label="Country" name="country" />
        <FormInput label="City" name="city" />
        <FormInput label="Username" name="username" />
        <FormInput label="Email" name="email" type="email" />
        <FormInput label="Password" name="password" type="password" />
        <FormInput
          label="Confirm Password"
          name="passwordConfirm"
          type="password"
        />
        <p className="nowrap mt-10 text-md">
          Already have an account?{" "}
          <Link href="/login" className="text-gray-500 hover:text-primary-500">
            Login Here
          </Link>
        </p>
        <LoadingButton
          disabled={false}
          loading={store.requestLoading}
          textColor="text-white"
          className="mt-1 md:mt-5 "
        >
          Submit
        </LoadingButton>
      </form>
    </FormProvider>
  );
}
