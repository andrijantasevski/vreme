export default function LoadingSkeleton() {
    return (
        <div className="grid gap-y-5 grid-cols-1 h-full">
            <div className="bg-[#1D1D48] animate-pulse h-full rounded-lg grid grid-cols-1 gap-y-4 p-6">
                <div className="bg-[#23214B] animate-pulse rounded-lg h-full"></div>
                <div className="bg-[#23214B] animate-pulse rounded-lg h-full"></div>
                <div className="bg-[#23214B] animate-pulse rounded-lg h-full"></div>
            </div>

            <div className="h-full rounded-lg grid grid-cols-3 gap-4">
                <div className="bg-[#1D1D48] animate-pulse rounded-lg h-full"></div>
                <div className="bg-[#1D1D48] animate-pulse rounded-lg h-full"></div>
                <div className="bg-[#1D1D48] animate-pulse rounded-lg h-full"></div>
            </div>

            <div className="h-full grid grid-cols-1 gap-4">
                <div className="bg-[#1D1D48] animate-pulse rounded-lg h-full"></div>
                <div className="bg-[#1D1D48] animate-pulse rounded-lg h-full"></div>
                <div className="bg-[#1D1D48] animate-pulse rounded-lg h-full"></div>
            </div>
        </div>
    )
}