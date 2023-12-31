import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";

const GoogleButton = () => {

  return (
<button 
type='button' 
className='bg-black w-full h-[60px] my-5 rounded-sm text-white font-medium flex items-center justify-center gap-7' 
onClick={() => {signIn("google")}}>
<Image src="./assets/googleicon.svg" alt='Google Logo' width={30} height={30}/> Continue with Google
</button>
  );
};

export default GoogleButton;
