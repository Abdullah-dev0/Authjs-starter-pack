export default function authLayout({
   children,
}: Readonly<{
   children: React.ReactNode;
}>) {
   return (
      <main className="grid min-h-screen place-items-center max-w-screen-sm mx-auto w-full">
         {children}
      </main>
   );
}
