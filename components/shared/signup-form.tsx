"use client";

import { signup } from "@/actions/signup.action";
import { Button } from "@/components/ui/button";
import {
   Form,
   FormControl,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { signupSchema } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import FormError from "./FormError";
import FormSuccess from "./FromSuccess";
import Authproviders from "./auth_providers";
export function Signup() {
   const [isPending, startTransition] = useTransition();
   const [error, setError] = useState<string | undefined>("");
   const [success, setSuccess] = useState<string | undefined>("");

   const form = useForm<z.infer<typeof signupSchema>>({
      resolver: zodResolver(signupSchema),
      defaultValues: {
         username: "",
         email: "",
         password: "",
      },
   });

   const onSubmit = (data: z.infer<typeof signupSchema>) => {
      setError("");
      setSuccess("");

      startTransition(async () => {
         setError("");
         setSuccess("");
         await signup(data).then((data) => {
            setSuccess(data.success);
            setError(data.error);
         });
      });
   };
   return (
      <div className="bg-white shadow-lg w-full p-5 space-y-6">
         <div
            className="text-center font-bold text-3xl
         max-sm:text-lg "
         >
            🔓 Welcome To Auth
         </div>
         <Form {...form}>
            <form
               onSubmit={form.handleSubmit(onSubmit)}
               className="space-y-4 w-full"
            >
               <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                     <FormItem>
                        <FormLabel>username</FormLabel>
                        <FormControl>
                           <Input
                              disabled={isPending}
                              placeholder="JhonDoe"
                              type="text"
                              {...field}
                           />
                        </FormControl>
                        <FormMessage />
                     </FormItem>
                  )}
               />
               <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                     <FormItem>
                        <FormLabel>email</FormLabel>
                        <FormControl>
                           <Input
                              disabled={isPending}
                              placeholder="email@gmail.com"
                              type="email"
                              {...field}
                           />
                        </FormControl>
                        <FormMessage />
                     </FormItem>
                  )}
               />
               <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                     <FormItem>
                        <FormLabel>password</FormLabel>
                        <FormControl>
                           <Input
                              disabled={isPending}
                              placeholder="*******"
                              type="password"
                              {...field}
                           />
                        </FormControl>
                        <FormMessage />
                     </FormItem>
                  )}
               />

               <FormError message={error} />
               <FormSuccess message={success} />

               <Button type="submit" className="w-full" disabled={isPending}>
                  Submit
               </Button>
            </form>
            <Authproviders />
         </Form>
         <div className="text-center">
            <Link href="/auth/login">
               <p className="text-blue-700 underline">
                  already have an account ?
               </p>
            </Link>
         </div>
      </div>
   );
}
