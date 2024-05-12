import { CircleCheckBig } from "lucide-react";
type Props = {
   message: string;
};

const FormSuccess = ({ message }: Props) => {
   if (!message) return null;
   return (
      <div className="flex gap-1 text-wrap justify-center items-center text-white bg-green-500/95 rounded-md p-2">
         <CircleCheckBig size={20} />
         <p className="font-bold">{message}</p>
      </div>
   );
};

export default FormSuccess;
