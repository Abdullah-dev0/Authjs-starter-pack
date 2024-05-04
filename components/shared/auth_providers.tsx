"use client";

import { Button } from "@/components/ui/button";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { signIn } from "next-auth/react";
import { useTransition } from "react";

import { FaGithub, FaGoogle } from "react-icons/fa";

type AuthProvider = "google" | "github";

const Authproviders = () => {
   const [isPending, startTransition] = useTransition();
   const handleClick = async (provider: AuthProvider) => {
      startTransition(() => {
         signIn(provider, {
            callbackUrl: DEFAULT_LOGIN_REDIRECT,
         });
      });
   };

   return (
      <div className="flex gap-5 flex-wrap w-full">
         <Button
            className="flex-1"
            disabled={isPending}
            variant={"outline"}
            onClick={() => handleClick("google")}
         >
            <FaGoogle size={20} />
         </Button>
         <Button
            disabled={isPending}
            className="flex-1"
            variant={"outline"}
            onClick={() => handleClick("github")}
         >
            <FaGithub size={20} />
         </Button>
      </div>
   );
};

export default Authproviders;
