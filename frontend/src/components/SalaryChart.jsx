// src/components/SalaryChart.jsx
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { year: 2012, salary: 1500 },
  { year: 2013, salary: 1800 },
  { year: 2014, salary: 2000 },
  { year: 2015, salary: 2200 },
  { year: 2021, salary: 3000 },
];

export default function SalaryChart() {
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-lg font-semibold mb-2">Salary Statistics</h2>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data}>
          <XAxis dataKey="year" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="salary" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}