import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { MapPinIcon } from "@heroicons/react/24/solid";
import { useForm, SubmitHandler } from "react-hook-form";
import getCoordinatesFromAPI from "../utils/getCoordinatesAPI";
import getCoordinatesFromBrowser from "../utils/getCoordinatesFromBrowser";

interface Props {
  fetchWeather: (
    getCoordinates: (
      cityQuery?: string
    ) => Promise<{ latitude: number; longitude: number }>,
    cityQuery?: string
  ) => void;
}

interface FormInputs {
  cityQuery: string;
}

const SearchBar: React.FC<Props> = ({ fetchWeather }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormInputs>();

  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    fetchWeather(getCoordinatesFromAPI, data.cityQuery);

    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4 relative"
    >
      <div className="flex justify-center items-center gap-x-4">
        <label
          className={`bg-gray-50 flex items-center px-3 py-2 rounded-lg w-full cursor-pointer focus-within:ring-1 ${
            errors.cityQuery
              ? "focus-within:ring-red-600 border border-red-600"
              : "focus-within:ring-contrast"
          }`}
        >
          <MagnifyingGlassIcon className="w-7 h-7 text-gray-500" />
          <input
            {...register("cityQuery", {
              required: true,
              pattern: /^[A-Za-z-\s]*$/,
            })}
            className="border-0 bg-transparent w-full text-gray-800 cursor-pointer text-xl focus:ring-0"
            type="search"
            placeholder="Внесете град"
          />
        </label>
        <button
          aria-label="Пребарајте град"
          title="Пребарајте град"
          className="bg-contrast px-3 rounded-lg h-full text-xl"
        >
          <MagnifyingGlassIcon className="w-7 h-7 text-primary" />
        </button>
      </div>

      {errors.cityQuery && (
        <div>
          <p className="text-lg text-red-600">Ве молиме внесете град.</p>
        </div>
      )}

      <div>
        <button
          type="button"
          onClick={() => fetchWeather(getCoordinatesFromBrowser)}
          className="text-gray-50 flex gap-x-2 items-center"
          aria-label="Пребарајте град според вашата локација"
        >
          <MapPinIcon className="w-7 h-7 text-contrast" />
          Mоментална локација
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
