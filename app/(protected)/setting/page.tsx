import { auth, signOut } from "@/auth";
import { Button } from "@/components/ui/button";

const Setting = async () => {
   const session = await auth();

   return (
      <div>
         {JSON.stringify(session)}

         <div>
            <form
               action={async () => {
                  "use server";
                  await signOut({
                     redirectTo: "/auth/login",
                  });
               }}
            >
               <Button type="submit">Sign Out</Button>
            </form>
         </div>
      </div>
   );
};

export default Setting;
