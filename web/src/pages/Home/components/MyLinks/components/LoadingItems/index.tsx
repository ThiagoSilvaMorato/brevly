import { Loader } from "lucide-react";

export const LoadingItems = () => {
  return (
    <>
      <div id='divider' className='w-full bg-gray-200 h-[2px] rounded-full' />
      <div className='flex flex-col gap-4 w-full items-center justify-center h-[200px]'>
        <Loader size={"32px"} className='animate-spin' color='#74798b' />
        <span className='text-[#74798b]'>CARREGANDO LINKS...</span>
      </div>
    </>
  );
};
