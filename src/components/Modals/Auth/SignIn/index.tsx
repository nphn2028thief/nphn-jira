"use client";

import Image from "next/image";
import { useLayoutEffect } from "react";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import FormInput from "@/components/HookForms/Input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SIGN_UP_MODAL } from "@/constants/modal";
import useModalStore from "@/hooks/useModal";
import { ISignInInfo } from "@/types/auth";

const schema = Yup.object({
  email: Yup.string()
    .trim()
    .email("Email is invalid.")
    .required("Email is required."),
  password: Yup.string().trim().required("Password is required."),
});

function SignInModal() {
  const {
    register,
    formState: { errors },
    setError,
    trigger,
    handleSubmit,
  } = useForm<ISignInInfo>({
    defaultValues: {
      email: "nphn2082thief@gmail.com",
      password: "123",
    },
    resolver: yupResolver(schema),
  });

  const { setId, setClose } = useModalStore((state) => state);

  useLayoutEffect(() => {
    if (Object.keys(errors).length) {
      if (errors.email?.message) {
        setError("password", { message: "" });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errors]);

  const onSubmit = (data: ISignInInfo) => {
    setClose(true);
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
          <CardTitle className="text-2xl">Welcome back!</CardTitle>
        </CardHeader>
        <CardContent>
          <form
            className="flex flex-col gap-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            <FormInput
              htmlFor="email"
              placeholder="Enter email address"
              register={register("email")}
              errors={errors}
              isErrorValidate={!!errors.email?.message}
              onBlur={() => trigger("email")}
            />
            <FormInput
              type="password"
              htmlFor="password"
              placeholder="Enter password"
              register={register("password")}
              errors={errors}
              isErrorValidate={!!errors.password?.message}
              onBlur={() => !errors.email?.message && trigger("password")}
            />
            <Button type="submit" size={"lg"} className="w-full">
              Submit
            </Button>
            <Separator className="w-auto mx-16 bg-black/20" />
            <Button
              type="button"
              size={"lg"}
              variant={"secondary"}
              className="w-full"
            >
              <FcGoogle size={20} className="mr-2" />
              Login with Google
            </Button>
            <Button
              type="button"
              size={"lg"}
              variant={"secondary"}
              className="w-full"
            >
              <FaGithub size={20} className="mr-2" />
              Login with Github
            </Button>
          </form>
        </CardContent>
        <Separator className="w-auto mx-16 -mt-2 mb-2 bg-black/20" />
        <CardContent className="text-center text-sm">
          <p>
            Don&apos;t have an account?
            <span
              className="ml-1 text-blue-700 cursor-pointer"
              onClick={() => setId(SIGN_UP_MODAL)}
            >
              Sign Up
            </span>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

export default SignInModal;
