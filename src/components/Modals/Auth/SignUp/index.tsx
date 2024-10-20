"use client";

import Image from "next/image";
import Link from "next/link";
import { useLayoutEffect } from "react";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import FormInput from "@/components/HookForms/Input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SIGN_IN_MODAL } from "@/constants/modal";
import useModalStore from "@/hooks/useModal";
import { ISignUpInfo } from "@/types/auth";

const schema = Yup.object({
  name: Yup.string()
    .trim()
    .min(5, "Minimum of 5 characters required.")
    .required("Name is required."),
  email: Yup.string()
    .trim()
    .email("Email is invalid.")
    .required("Email is required."),
  password: Yup.string().trim().required("Password is required."),
});

function SignUpModal() {
  const {
    register,
    formState: { errors },
    setError,
    trigger,
    handleSubmit,
  } = useForm<ISignUpInfo>({
    defaultValues: {
      name: "nhan",
      email: "nphn2082thief@gmail.com",
      password: "123",
    },
    resolver: yupResolver(schema),
  });

  const { setId, setClose } = useModalStore((state) => state);

  useLayoutEffect(() => {
    if (Object.keys(errors).length) {
      if (errors.name?.message) {
        setError("email", { message: "" });
        setError("password", { message: "" });
      }
      if (errors.email?.message) {
        setError("password", { message: "" });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errors]);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const onSubmit = (data: ISignUpInfo) => {
    setClose(false);
    console.log(data);
  };

  return (
    <div className="flex flex-col gap-4 px-4 pt-8 pb-4">
      <div className="flex justify-center">
        <Image
          src="/logo.svg"
          alt="logo"
          style={{ width: "auto", height: "auto" }}
          width={152}
          height={56}
          priority
        />
      </div>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Hi there!</CardTitle>
          <CardDescription>
            By signing up, you agree to our{" "}
            <Link href={""}>
              <span className="text-blue-700">Privacy policy</span>
            </Link>{" "}
            and{" "}
            <Link href={""}>
              <span className="text-blue-700">Term of Service</span>
            </Link>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            className="flex flex-col gap-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            <FormInput
              htmlFor="name"
              placeholder="Enter your name"
              register={register("name")}
              errors={errors}
              isErrorValidate={!!errors.name?.message}
              onBlur={() => trigger("name")}
            />
            <FormInput
              htmlFor="email"
              placeholder="Enter email address"
              register={register("email")}
              errors={errors}
              isErrorValidate={!!errors.email?.message}
              onBlur={() => !errors.name?.message && trigger("email")}
            />
            <FormInput
              type="password"
              htmlFor="password"
              placeholder="Enter password"
              register={register("password")}
              errors={errors}
              isErrorValidate={!!errors.password?.message}
              onBlur={() =>
                !errors.name?.message &&
                !errors.email?.message &&
                trigger("password")
              }
            />
            <Button type="submit" size={"lg"} className="w-full">
              Submit
            </Button>
          </form>
        </CardContent>
        <Separator className="w-auto mx-16 -mt-2 mb-2 bg-black/20" />
        <CardContent className="text-center text-sm">
          <p>
            Already have an account?
            <span
              className="ml-1 text-blue-700 cursor-pointer"
              onClick={() => setId(SIGN_IN_MODAL)}
            >
              Sign In
            </span>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

export default SignUpModal;
