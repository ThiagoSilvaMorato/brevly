import { Dispatch, SetStateAction, useState } from "react";
import { services } from "../../services";
import toastMessages from "@/components/ToastMessages";

interface INewLinkProps {
  setRefreshMyLinks: Dispatch<SetStateAction<boolean>>;
}

const NewLink = ({ setRefreshMyLinks }: INewLinkProps) => {
  const [fullUrl, setFullUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({
    fullUrl: "",
    shortUrl: "",
  });

  const validateFields = () => {
    let isValid = true;
    const newErrors = {
      fullUrl: "",
      shortUrl: "",
    };

    // Validação do fullUrl
    if (!fullUrl) {
      newErrors.fullUrl = "Informe uma url válida.";
      isValid = false;
    }

    // Validação do shortUrl
    if (!shortUrl) {
      newErrors.shortUrl = "Informe uma url minúscula e sem espaço/caracter especial.";
      isValid = false;
    } else if (!/^[a-z0-9-]+$/.test(shortUrl)) {
      newErrors.shortUrl = "Use apenas letras minúsculas, números e hífens.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = () => {
    if (!validateFields()) return;

    setIsLoading(true);
    services
      .postNewShortUrl({
        fullUrl,
        shortUrl,
      })
      .then(() => {
        setIsLoading(false);
        setRefreshMyLinks((prev) => !prev);
        setFullUrl("");
        setShortUrl("");
        setErrors({ fullUrl: "", shortUrl: "" });
      })
      .catch((error) => {
        toastMessages.error("Erro ao salvar o link", error.response.data.message);
        setIsLoading(false);
      });
  };

  return (
    <div className='flex flex-col gap-4 bg-white rounded-xl w-[40%] p-8 max-[850px]:w-full'>
      <h2 className='text-2xl font-semibold mb-4'>Novo Link</h2>

      <div>
        <label htmlFor='original-link' className='text-[#4d505c] text-xsm -mb-2'>
          LINK ORIGINAL
        </label>
        <input
          id='original-link'
          type='text'
          placeholder='https://www.exemplo.com.br'
          value={fullUrl}
          onChange={(e) => {
            setFullUrl(e.target.value);
            setErrors((prev) => ({ ...prev, fullUrl: "" }));
          }}
          className={`border ${
            errors.fullUrl ? "border-red-500" : "border-gray-300"
          } rounded-lg p-2 h-[60px] w-full`}
        />
        {errors.fullUrl && <p className='text-red-500 text-xs mt-1'>{errors.fullUrl}</p>}
      </div>

      <div>
        <label htmlFor='short-link' className='text-[#4d505c] text-xsm -mb-2 mt-2'>
          LINK ENCURTADO
        </label>
        <div className='relative'>
          <span className='absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none'>
            brev.ly/
          </span>
          <input
            id='short-link'
            type='text'
            value={shortUrl}
            onChange={(e) => {
              setShortUrl(e.target.value);
              setErrors((prev) => ({ ...prev, shortUrl: "" }));
            }}
            className={`border ${
              errors.shortUrl ? "border-red-500" : "border-gray-300"
            } rounded-lg p-2 pl-17 w-full h-[60px]`}
          />
        </div>
        {errors.shortUrl && <p className='text-red-500 text-xs mt-1'>{errors.shortUrl}</p>}
      </div>

      <button
        className='bg-[#2c46b1] text-white rounded-lg p-2 disabled:bg-[#939fd6] h-[60px] cursor-pointer disabled:cursor-not-allowed mt-4'
        type='button'
        disabled={isLoading}
        onClick={handleSubmit}
      >
        {isLoading ? "Salvando..." : "Salvar link"}
      </button>
    </div>
  );
};

export default NewLink;
