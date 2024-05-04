"use client";

import { login } from "@/actions/login.action";
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
import { loginSchema } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Authproviders from "./auth_providers";
export function Signin() {
   const [isPending, startTransition] = useTransition();
   const [error, setError] = useState<string | undefined>("");

   const form = useForm<z.infer<typeof loginSchema>>({
      resolver: zodResolver(loginSchema),
      defaultValues: {
         email: "",
         password: "",
      },
   });

   const onSubmit = (data: z.infer<typeof loginSchema>) => {
      setError("");
      startTransition(() => {
         login(data).then((res) => {
            setError(res?.error);
         });
      });
   };
   return (
      <>
         <Form {...form}>
            <form
               onSubmit={form.handleSubmit(onSubmit)}
               className="space-y-4 w-full"
            >
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
                     </FormItem>
                  )}
               />
               {error && (
                  <div className="text-red-500 text-center">{error}</div>
               )}

               <Button type="submit" className="w-full" disabled={isPending}>
                  Submit
               </Button>
            </form>
         </Form>
         <Authproviders />
      </>
   );
}
