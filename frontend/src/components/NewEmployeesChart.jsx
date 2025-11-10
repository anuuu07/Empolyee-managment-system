// src/components/NewEmployeesChart.jsx
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { useState } from "react";

const data = [
  { year: 2012, employees: 80 },
  { year: 2013, employees: 100 },
  { year: 2014, employees: 120 },
  { year: 2015, employees: 140 },
  { year: 2021, employees: 160 },
];

export default function NewEmployeesChart() {
  const [sorted, setSorted] = useState(false);
  const sortedData = sorted ? [...data].sort((a, b) => b.year - a.year) : data;

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-semibold">New Employees</h2>
        <button
          onClick={() => setSorted(!sorted)}
          className="text-sm text-blue-500 underline"
        >
          Sort by Years
        </button>
      </div>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={sortedData}>
          <XAxis dataKey="year" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="employees" fill="#f472b6" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}