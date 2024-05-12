import NextAuth from "next-auth";

import authConfig from "./auth.config";
import {
   authPrefix,
   DEFAULT_LOGIN_REDIRECT,
   privateRouts,
   publicRouts,
} from "./routes";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
   const { nextUrl } = req;
   const isLoggedIn = !!req.auth;

   const isApiAuthRoute = nextUrl.pathname.startsWith(authPrefix);
   const isPublicRoute = publicRouts.includes(nextUrl.pathname);
   const isAuthRoute = privateRouts.includes(nextUrl.pathname);

   if (isApiAuthRoute) {
      return null;
   }

   if (isAuthRoute) {
      if (isLoggedIn) {
         return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
      }
      return null;
   }

   if (!isLoggedIn && !isPublicRoute) {
      return Response.redirect(new URL("/auth/login", nextUrl));
   }

   return null ;
});

export const config = {
   matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
