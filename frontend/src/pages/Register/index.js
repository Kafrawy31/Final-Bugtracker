"use client";
import React, { useContext, useState } from "react";
import { Label } from "../../components/ui/label";
import { Input } from "../../components/ui/input";
import AuthContext from "@/context/AuthContext";
import ProjectContext from "@/context/ProjectContext";
import Image from "next/image";
import next from "../../../public/next-login.svg";
import { useRouter } from "next/router";
import Link from "next/link";
import { cn } from "../../components/ui/lib/utils/cn";
import { StarsBackground } from "../../components/ui/stars-background";
import { ShootingStars } from "../../components/ui/shooting-stars";
import {
  IconBrandGithub,
  IconBrandGoogle,
  IconBrandOnlyfans,
} from "@tabler/icons-react";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  let { register } = useContext(ProjectContext);
  let { user } = useContext(AuthContext);
  const router = useRouter();

  if (user) {
    router.push("/");
  }

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    register(username, email, password);
    router.push("/Login");
  };

  return (
    <div className="relative h-screen bg-black">
      <StarsBackground className="absolute inset-0 z-0" />
      <ShootingStars className="absolute inset-0 z-0" />
      <div className="relative top-10 z-10 max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
        <h2 className="font-normal text-xl text-center text-neutral-800 dark:text-neutral-200">
          Welcome to my BugTracker
        </h2>
        <p className="font-light text-neutral-600 text-center text-sm max-w-sm mt-2 dark:text-neutral-300">
          Efficiently track bugs and enhance your workflow with our bug tracker.
        </p>
        <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-4 h-[1px] w-full" />
        <form className="" onSubmit={handleSubmit}>
          <LabelInputContainer>
            <Label className="ml-1" htmlFor="username">
              Username
            </Label>
            <Input
              type="text"
              placeholder="Username"
              value={username}
              onChange={handleUsernameChange}
            />
          </LabelInputContainer>
          <LabelInputContainer>
            <Label htmlFor="email" className="ml-1 mt-3">
              {" "}
              Email{" "}
            </Label>
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={handleEmailChange}
            />
          </LabelInputContainer>
          <LabelInputContainer>
            <Label htmlFor="password" className="ml-1 mt-3">
              {" "}
              Password
            </Label>
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
            />
          </LabelInputContainer>
          <div className="flex flex-col">
            <button
              className=" w-full flex mt-6 flex-row justify-center items-center bg-gradient-to-br  group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 dark:bg-zinc-800  text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
              type="submit"
            >
              Sign up <BottomGradient />
            </button>
            <div className="flex justify-center align-middle mt-4 font-light">
              <p>
                Already have an account? Login{" "}
                <span>
                  <Link href="login" className="underline font-light">
                    {" "}
                    Here{" "}
                  </Link>
                </span>
              </p>
            </div>
            <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-4 h-[1px] w-full" />
          </div>
          <div className="flex flex-col space-y-4">
            <button
              className=" relative group/btn flex mt-3 space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
              type="button"
            >
              <IconBrandGithub className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
              <span className="text-neutral-700 dark:text-neutral-300 text-sm">
                GitHub
              </span>
              <BottomGradient />
            </button>
            <button
              className=" relative group/btn flex flex-row space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
              type="button"
            >
              <IconBrandGoogle className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
              <span className="text-neutral-700 dark:text-neutral-300 text-sm">
                Google
              </span>
              <BottomGradient />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-black to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-black to-transparent" />
    </>
  );
};

const LabelInputContainer = ({ children, className }) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};
