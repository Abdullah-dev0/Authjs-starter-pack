import { Signin } from "@/components/shared/auth/Signin-form";
import { Suspense } from "react";

const login = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Signin />
    </Suspense>
  );
};

export default login;
