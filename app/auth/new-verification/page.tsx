import VerifyTokenForm from "@/components/shared/auth/VerifyTokenForm";
import { Suspense } from "react";

const VerifyToken = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VerifyTokenForm />
    </Suspense>
  );
};

export default VerifyToken;
