import { useRef, useEffect, Dispatch, SetStateAction } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

interface Props {
  setIsSearchOpen: Dispatch<SetStateAction<boolean>>;
  isSearchOpen: boolean;
  fetchWeather: (cityQuery: string) => void;
  invalidateQueries: () => void;
}

interface FormInputs {
  cityQuery: string;
}

const SearchDropdown: React.FC<Props> = ({
  setIsSearchOpen,
  isSearchOpen,
  fetchWeather,
  invalidateQueries,
}) => {
  const formRef = useRef<HTMLFormElement | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormInputs>();

  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    fetchWeather(data.cityQuery);
    setIsSearchOpen(false);
    invalidateQueries();
    reset();
  };

  useEffect(() => {
    const escapeCloseHandler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsSearchOpen(false);
      }
    };

    window.addEventListener("keyup", escapeCloseHandler);

    return () => {
      window.removeEventListener("keyup", escapeCloseHandler);
    };
  }, []);

  useEffect(() => {
    if (isSearchOpen) {
      formRef.current?.querySelector("input")?.focus();
    }
  }, [isSearchOpen]);

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit(onSubmit)}
      className={`absolute w-full py-2 pr-2 right-0 border-2 mt-4 flex bg-gray-50 rounded-lg focus-within:ring-1 ${
        errors.cityQuery
          ? "focus-within:ring-red-500"
          : "focus-within:ring-contrast"
      }  transition-colors`}
    >
      <input
        {...register("cityQuery", {
          required: true,
          pattern: /^[A-Za-z-\s]*$/,
        })}
        className="w-full rounded-lg bg-transparent border-0 focus:ring-0"
        type="search"
        placeholder="Внесете град"
      />
      <button
        aria-label="Барајте град"
        className="bg-contrast text-primary px-3 py-2 rounded-lg"
      >
        Барајте
      </button>
    </form>
  );
};

export default SearchDropdown;
