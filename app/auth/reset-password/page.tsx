import VerifyPassToken from "@/components/shared/auth/verifyPassToken";
import { Suspense } from "react";

const VerifyToken = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VerifyPassToken />
    </Suspense>
  );
};

export default VerifyToken;
