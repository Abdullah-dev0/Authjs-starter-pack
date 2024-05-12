export default function authLayout({
   children,
}: Readonly<{
   children: React.ReactNode;
}>) {
   return (
      <main className=" flex flex-col gap-5 max-sm:px-6 items-center justify-center min-h-screen  max-w-screen-sm mx-auto w-full">
         {children}
      </main>
   );
}
