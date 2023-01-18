export default function LoadingSkeleton() {
  return (
    <div className="grid gap-y-5 grid-cols-1 h-full">
      <div className="bg-primary-light animate-pulse h-full rounded-lg grid grid-cols-1 gap-y-4 p-6">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="bg-[#23214B] animate-pulse rounded-lg h-full"
          ></div>
        ))}
      </div>

      <div className="h-full rounded-lg grid grid-cols-3 gap-4">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="bg-primary-light animate-pulse rounded-lg h-full"
          ></div>
        ))}
      </div>

      <div className="h-full grid grid-cols-1 gap-4">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="bg-primary-light animate-pulse rounded-lg h-full"
          ></div>
        ))}
      </div>
    </div>
  );
}
