import prisma from "@/lib/prismaClient";

export const getUserById = async (id: string) => {
   try {
      const user = await prisma.user.findUnique({
         where: {
            id,
         },
      });

      return user;
   } catch (error) {
      return null;
   }
};
export const getUserByEmail = async (email: string) => {
   try {
      const user = await prisma.user.findFirst({
         where: {
            email,
         },
      });

      return user;
   } catch (error) {
      return null;
   }
};

export const getAccountProviderById = async (userId: string) => {
   try {
      const accountProvider = await prisma.account.findFirst({
         where: {
            userId,
         },
      });

      return accountProvider;
   } catch (error) {
      console.log(error);
   }
};
