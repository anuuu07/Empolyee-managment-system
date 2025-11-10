// src/components/StatsCard.jsx
export default function StatsCard({ title, value }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow text-center">
      <h2 className="text-lg font-semibold text-gray-700">{title}</h2>
      <p className="text-2xl font-bold text-blue-600">{value}</p>
    </div>
  );
}