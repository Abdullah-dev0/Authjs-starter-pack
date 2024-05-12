"use client";

import { verifyResetPasswordToken } from "@/actions/auth/verifyResetToken";
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
import { passwordschema } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import FormError from "./FormError";
import Formsuccess from "./FromSuccess";

const VerifyTokenForm = () => {
   const [error, setError] = useState<string | undefined>("");
   const [success, setSuccess] = useState<string | undefined>("");
   const [isPending, startTransition] = useState();
   const token = useSearchParams().get("token");

   const form = useForm<z.infer<typeof passwordschema>>({
      resolver: zodResolver(passwordschema),
      defaultValues: {
         password: "",
      },
   });

   const onSubmit = (data: z.infer<typeof passwordschema>) => {
      setError("");
      setSuccess("");
      console.log(data, token);
      startTransition(() => {
         verifyResetPasswordToken(token, data).then((res) => {
            setError(res?.error);
            setSuccess(res?.success);
         });
      });
   };
   return (
      <div className="bg-slate-300  p-5 rounded-md">
         <div className="flex flex-col justify-center gap-5 items-center">
            <p>Auth 🔐</p>
            <h1>Reset your Password</h1>
            <Form {...form}>
               <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4 w-full"
               >
                  <FormField
                     control={form.control}
                     name="password"
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel>Enter New Password</FormLabel>
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
                  <Formsuccess message={success} />

                  <Button disabled={isPending} className="w-full">
                     Change Password
                  </Button>
               </form>
            </Form>
         </div>
         <Button
            disabled={isPending}
            variant="ghost"
            className="text-center mt-6 w-full"
         >
            <Link href="/auth/login">Back to Login</Link>
         </Button>
      </div>
   );
};

export default VerifyTokenForm;
