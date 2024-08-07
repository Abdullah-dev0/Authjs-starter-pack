//so by default all the routes are private and only accessible to authenticated users you have to specify the routes that are public and can be accessed by all users

//public routes that are accessible to all users

export const publicRouts = ["/", "/auth/new-verification","/auth/reset-password"];

//private routes that are accessible only to authenticated users or are displayed if user is not authenticated

export const privateRouts = [
   "/auth/login",
   "/auth/register",
   "/auth/error",
   "/auth/reset",
];

// this is the prefix for all the routes that are related to the authentication and this is alwayds public routes

export const authPrefix = "/api/auth";

// This is the default route that the user will be redirected to after login

export const DEFAULT_LOGIN_REDIRECT = "/setting";
