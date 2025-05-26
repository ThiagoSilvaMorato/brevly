import toastMessages from "@/components/ToastMessages";
import { services } from "@/pages/Home/services";
import { Copy, Trash, Info } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

interface CardProps {
  shortUrl: string;
  fullUrl: string;
  accessCount: number;
  setRefreshMyLinks: Dispatch<SetStateAction<boolean>>;
}

export const Card = ({ shortUrl, fullUrl, accessCount, setRefreshMyLinks }: CardProps) => {
  const handleCopy = () => {
    const baseUrl = window.location.origin;
    const fullShortUrl = `${baseUrl}/${shortUrl}`;

    navigator.clipboard.writeText(fullShortUrl);
    toastMessages.info(
      "Link copiado com sucesso",
      `O link ${shortUrl} foi copiado para a área de transferência!`,
      { icon: <Info /> }
    );
  };

  const handleDelete = () => {
    const shouldProceed = window.confirm(`Você realmente quer apagar o link ${shortUrl}?`);

    if (shouldProceed) {
      services.deleteShortUrl(shortUrl).then(() => setRefreshMyLinks((prev) => !prev));
    }
  };

  const handleShortUrlClick = () => {
    window.open(`/${shortUrl}`, "_blank");
    // services.increaseShortUrlAccessCount(shortUrl).then(() => setRefreshMyLinks((prev) => !prev));
  };

  return (
    <>
      <div id='divider' className='w-full bg-gray-200 h-[2px] rounded-full' />
      <div className='flex flex-row sm:flex-row w-full items-center sm:items-center align-middle justify-between gap-2 sm:gap-4 p-3 sm:h-[72px] relative'>
        <div className='flex flex-col gap-1 min-w-0 w-full sm:w-auto'>
          <span
            className='cursor-pointer hover:underline text-blue-700 font-semibold text-lg sm:text-xl truncate'
            onClick={handleShortUrlClick}
          >
            brev.ly/{shortUrl}
          </span>
          <span className='text-[#4d505c] text-sm sm:text-base truncate'>{fullUrl}</span>
        </div>

        <div className='flex flex-row items-center align-middle justify-end w-full sm:w-auto gap-4 h-full'>
          <span className='text-[#4d505c] text-sm sm:text-base whitespace-nowrap'>
            {accessCount} acessos
          </span>
          <div className='flex flex-row gap-2'>
            <button
              className='bg-[#e4e6ec] p-2 sm:px-3 sm:py-2 rounded-lg cursor-pointer flex-shrink-0'
              onClick={handleCopy}
            >
              <Copy size={20} />
            </button>
            <button
              className='bg-[#e4e6ec] p-2 sm:px-3 sm:py-2 rounded-lg cursor-pointer flex-shrink-0'
              onClick={handleDelete}
            >
              <Trash size={20} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
