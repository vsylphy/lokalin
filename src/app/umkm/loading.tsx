export default function Loading() {
  return (
    <div className="max-w-7xl mx-auto p-10">
      <div className="animate-pulse">
        <div className="h-12 bg-gray-200 rounded w-80 mb-10" />

        <div className="grid md:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-80 bg-gray-200 rounded-3xl" />
          ))}
        </div>
      </div>
    </div>
  );
}
