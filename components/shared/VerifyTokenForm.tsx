"use client";

import { verifyToken } from "@/actions/verifyToken";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { BeatLoader } from "react-spinners";
import FormError from "./FormError";
import Formsuccess from "./FromSuccess";

const VerifyTokenForm = () => {
   const [error, setError] = useState<string | undefined>("");
   const [success, setSuccess] = useState<string | undefined>("");
   const token = useSearchParams().get("token");

   const onSubmit = useCallback(async () => {
      if (!token) {
         setError("Token not found");
         return;
      }
      try {
         const res = await verifyToken(token);
         setError(res.error);
         setSuccess(res.success);
      } catch (err) {
         setError(err.error);
      }
   }, [token]);

   useEffect(() => {
      onSubmit();
   }, [onSubmit]);

   return (
      <div className="bg-slate-300  p-5 rounded-md">
         <div className="flex flex-col justify-center gap-5 items-center">
            <p>Auth 🔐</p>
            <h1>Confriming Your Verification</h1>

            {!error && !success && <BeatLoader color="#fff" size={10} />}

            <FormError message={error} />
            <Formsuccess message={success} />
         </div>
         <div className="text-center mt-6">
            <Link href="/auth/login">Back to Login</Link>
         </div>
      </div>
   );
};

export default VerifyTokenForm;
