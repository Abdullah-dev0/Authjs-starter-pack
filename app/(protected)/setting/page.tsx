import { auth } from "@/auth";

const Setting = async () => {
   const session = await auth();

   return <div>{JSON.stringify(session)}</div>;
};

export default Setting;
