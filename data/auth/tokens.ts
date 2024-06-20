import prisma from "@/lib/prismaClient";

//We saparete the logic of getting the verification token by email and by token into two functions because they will be used most fell free to use them both  .

export const getVerificationTokenByEmail = async (email: string) => {
   try {
      const verificationToken = await prisma.verificationToken.findFirst({
         where: {
            email,
         },
      });

      return verificationToken;
   } catch (error) {
      return null;
   }
};
export const getVerificationTokenByToken = async (token: string) => {
   try {
      const verificationToken = await prisma.verificationToken.findUnique({
         where: {
            token: token,
         },
      });
      return verificationToken;
   } catch (error) {
      return null;
   }
};
