import { Button } from "@/components/ui/button";
import Link from "next/link";

const Home = () => {
   return (
      <div>
         Home
         <Link href="/auth/login">
            <Button>Sign In</Button>
         </Link>
      </div>
   );
};

export default Home;
