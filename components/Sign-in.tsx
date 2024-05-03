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
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
export function Signin() {
   const [isPending, startTransition] = useTransition();

   const form = useForm<z.infer<typeof loginSchema>>({
      resolver: zodResolver(loginSchema),
      defaultValues: {
         email: "",
         password: "",
      },
   });

   const onSubmit = (data: z.infer<typeof loginSchema>) => {
      startTransition(async () => {
         const response = await login(data);
      });
   };
   return (
      <div className="grid place-items-center bg-white p-6 min-h-screen max-w-screen-sm mx-auto">
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
                        <FormMessage />
                     </FormItem>
                  )}
               />
               <Button type="submit" disabled={isPending}>
                  Submit
               </Button>
            </form>
         </Form>
      </div>
   );
}
