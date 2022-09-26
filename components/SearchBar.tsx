import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { MapPinIcon } from "@heroicons/react/24/solid";
import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
    cityQuery: string,
}

export default function Searchbar({ fetchWeather, fetchLocationAndWeather }: any) {
    const { register, handleSubmit, formState: { errors }, reset } = useForm<Inputs>();


    const onSubmit: SubmitHandler<Inputs> = (data) => {
        fetchWeather(data.cityQuery);

        reset();
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 relative">
            <div className="flex justify-center items-center gap-x-4">
                <label className={`bg-gray-50 flex items-center px-3 py-2 rounded-lg w-full cursor-pointer focus-within:ring-1 ${errors.cityQuery ? "focus-within:ring-red-600 border border-red-600" : "focus-within:ring-[#ECA914]"}`}>
                    <MagnifyingGlassIcon className="w-7 h-7 text-gray-500" />
                    <input {...register("cityQuery", { required: true, pattern: /^[A-Za-z-\s]*$/, })} className="border-0 bg-transparent w-full text-gray-800 cursor-pointer text-xl focus:ring-0" type="search" placeholder="Внесете град" />
                </label>
                <button className="bg-[#ECA914] px-3 rounded-lg h-full text-xl hover:bg-"><MagnifyingGlassIcon className="w-7 h-7 text-[#101039]" /></button>
            </div>

            {
                errors.cityQuery && <div>
                    <p className="text-lg text-red-600">Ве молиме внесете град.</p>
                </div>
            }

            <div>
                <button type="button" onClick={fetchLocationAndWeather} className="text-gray-50 flex gap-x-2 items-center"><MapPinIcon className="w-7 h-7 text-[#ECA914]" />Mоментална локација</button>
            </div>

        </form>
    )
}

