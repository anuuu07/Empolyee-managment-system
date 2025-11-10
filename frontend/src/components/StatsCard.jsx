// src/pages/Dashboard.jsx
import StatsCard from "../components/StatsCard";
const stats = [
  { title: "Users", value: 348 },
  { title: "Events", value: 128 },
  { title: "Holidays", value: 10 },
  { title: "Payrolls", value: 3458 },
  { title: "Reports", value: 348 },
];

export default function Dashboard() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-6">
      {stats.map((s, i) => (
        <StatsCard key={i} title={s.title} value={s.value} />
      ))}
    </div>
  );
}