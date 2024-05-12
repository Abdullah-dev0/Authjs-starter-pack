import { getVerificationTokenByEmail } from "@/data/tokens";
import prisma from "@/lib/prismaClient";
import { v4 as uuidv4 } from "uuid";

export const generateVerificationToken = async (email: string) => {
   const token = uuidv4();
   const expires = new Date(new Date().getTime() + 3600 * 1000); // This token will expire in 1 hour
   try {
      const extistingToken = await getVerificationTokenByEmail(email);

      if (extistingToken) {
         await prisma.verificationToken.delete({
            where: {
               id: extistingToken.id,
            },
         });
      }

      const verificationToken = await prisma.verificationToken.create({
         data: {
            email,
            token,
            expires,
         },
      });

      return verificationToken;
   } catch (error) {
      console.log(error);
   }
};
