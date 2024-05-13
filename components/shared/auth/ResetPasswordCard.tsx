"use client";

import { reset } from "@/actions/auth/reset";
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
import { resetPasswordSchema } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import FormError from "./FormError";
import FormSuccess from "./FromSuccess";
export function ResetPasswordCard() {
   const [isPending, startTransition] = useTransition();
   const [error, setError] = useState<string | undefined>("");
   const [success, setSuccess] = useState<string | undefined>("");

   const form = useForm<z.infer<typeof resetPasswordSchema>>({
      resolver: zodResolver(resetPasswordSchema),
      defaultValues: {
         email: "",
      },
   });

   const onSubmit = (data: z.infer<typeof resetPasswordSchema>) => {
      setError("");
      setSuccess("");
      console.log(data);
      startTransition(() => {
         reset(data).then((res) => {
            setError(res?.error);
            setSuccess(res?.success);
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
               <FormError message={error} />
               <FormSuccess message={success} />

               <Button type="submit" className="w-full" disabled={isPending}>
                  sent Verification email
               </Button>
            </form>
         </Form>
         <Button className="self-start">
            <Link href="/auth/login">Back to login</Link>
         </Button>
      </>
   );
}
