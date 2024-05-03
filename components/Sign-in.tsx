"use client";

import { useState } from "react";

type s = "sign-in" | "sign-up";
type v = {
   email: string;
   password: string;
   name: string;
};

export default function Signin() {
   const [value, setValue] = useState<v>({
      email: "",
      password: "",
      name: "",
   });

   const [state, setState] = useState<s>("sign-in");

   const changeHandler = (e: any) => {
      setValue((prev) => ({ ...prev, [e.target.name]: e.target.value }));
   };

   return (
      <div className="flex min-h-screen flex-1 flex-col justify-center items-center px-6 py-12 lg:px-8">
         <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6">
               {state === "sign-up" && (
                  <div>
                     <label
                        htmlFor="name"
                        className="block text-sm font-medium leading-6 text-gray-900"
                     >
                        UserName
                     </label>
                     <div className="mt-2">
                        <input
                           id="name"
                           name="name"
                           type="text"
                           onChange={changeHandler}
                           value={value.name}
                           autoComplete="name"
                           required
                           className="block w-full rounded-md px-2 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                     </div>
                  </div>
               )}
               <div>
                  <label
                     htmlFor="email"
                     className="block text-sm font-medium leading-6 text-gray-900"
                  >
                     Email address
                  </label>
                  <div className="mt-2">
                     <input
                        id="email"
                        value={value.email}
                        name="email"
                        type="email"
                        onChange={changeHandler}
                        autoComplete="email"
                        required
                        className="block w-full rounded-md px-2 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                     />
                  </div>
               </div>

               <div>
                  <div className="flex items-center justify-between">
                     <label
                        htmlFor="password"
                        className="block text-sm font-medium leading-6 text-gray-900"
                     >
                        Password
                     </label>
                  </div>
                  <div className="mt-2">
                     <input
                        id="password"
                        name="password"
                        onChange={changeHandler}
                        value={value.password}
                        type="password"
                        autoComplete="current-password"
                        required
                        className="block w-full rounded-md px-2 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                     />
                  </div>
               </div>

               <div>
                  <button
                     type="submit"
                     className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                     {state === "sign-in" ? "Sign in" : "Sign up"}
                  </button>
               </div>
            </form>
            <p className="mt-10 text-center text-sm  text-gray-500">
               Sign up for a new account?
               <button
                  type="submit"
                  onClick={() => {
                     setState(state === "sign-in" ? "sign-up" : "sign-in");
                  }}
                  className="font-semibold  text-indigo-600 p-1 hover:text-indigo-500"
               >
                  {state === "sign-in" ? "Sign up" : "Sign in"}
               </button>
            </p>
         </div>
      </div>
   );
}
