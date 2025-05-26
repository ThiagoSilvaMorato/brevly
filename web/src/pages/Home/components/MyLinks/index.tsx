import { Download, Loader } from "lucide-react";
import { Card } from "./components/Card";
import { NoShortUrlFound } from "./components/NoShortUrlFound";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { services } from "../../services";
import { LoadingItems } from "./components/LoadingItems";

interface IShortUrlModel {
  shortUrl: string;
  fullUrl: string;
  accessCount: number;
}

interface IMyLinksProps {
  setRefreshMyLinks: Dispatch<SetStateAction<boolean>>;
}

const MyLinks = ({ setRefreshMyLinks }: IMyLinksProps) => {
  const [isDownloadCsvButtonLoading, setIsDownloadCsvButtonLoading] = useState(false);
  const [shortUrlArr, setShortUrlArr] = useState<IShortUrlModel[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    services
      .getAllShortUrls()
      .then((response) => {
        setShortUrlArr(response.data.shortUrls);
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  }, []);

  const handleDownloadCsv = async () => {
    setIsDownloadCsvButtonLoading(true);
    try {
      const response = await services.getDownloadCsbUrl();
      if (response.data.url) {
        window.location.href = response.data.url;
      }
    } finally {
      setIsDownloadCsvButtonLoading(false);
    }
  };

  return (
    <div className='relative flex flex-col gap-4 bg-white rounded-xl w-[60%] p-6 max-h-[80vh] max-[850px]:w-full max-[500px]:p-4'>
      {isLoading && (
        <div className='absolute top-0 left-0 right-0 h-1 rounded-t-xl overflow-hidden'>
          <div className='h-full w-[10%] bg-blue-500 animate-loading'></div>
        </div>
      )}

      <div className='flex flex-row items-center justify-between sticky top-0 bg-white pb-4 z-10'>
        <h2 className='text-2xl font-semibold max-[500px]:text-xl'>Meus links</h2>
        <button
          className={`flex items-center bg-[#e4e6ec] px-3 py-2 rounded-lg hover:bg-[#d8dae0] transition-colors ${
            isDownloadCsvButtonLoading ? "opacity-70 cursor-not-allowed" : "cursor-pointer"
          }`}
          onClick={handleDownloadCsv}
          disabled={isDownloadCsvButtonLoading}
        >
          {isDownloadCsvButtonLoading ? (
            <Loader className='h-4 w-4 animate-spin text-[#4d505c]' />
          ) : (
            <Download color='#4d505c' size={18} />
          )}
          <span className='ml-2 font-semibold text-[#4d505c] max-[500px]:text-sm'>
            {isDownloadCsvButtonLoading ? "Baixando..." : "Baixar CSV"}
          </span>
        </button>
      </div>

      <div className='flex flex-col gap-4 overflow-y-auto scroll-custom'>
        {shortUrlArr.length > 0 ? (
          shortUrlArr.map((item) => (
            <div key={item.shortUrl} className='min-w-0'>
              {" "}
              <Card
                shortUrl={item.shortUrl}
                fullUrl={item.fullUrl}
                accessCount={item.accessCount}
                setRefreshMyLinks={setRefreshMyLinks}
              />
            </div>
          ))
        ) : isLoading ? (
          <LoadingItems />
        ) : (
          <NoShortUrlFound />
        )}
      </div>
    </div>
  );
};

export default MyLinks;
