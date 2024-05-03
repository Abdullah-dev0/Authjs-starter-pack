import "next-auth";
declare module "next-auth" {
   interface User {
      _id?: string;
      username?: string;
   }

   interface Session {
      user: {
         _id?: string;
         username?: string;
      };
   }
}
