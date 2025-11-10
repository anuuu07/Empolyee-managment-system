// src/components/Header.jsx
export default function Header() {
  return (
    <div className="flex justify-between items-center p-6 bg-pastelBlue rounded-xl shadow">
      <div>
        <h1 className="text-2xl font-bold text-darkText">Hello Admin!</h1>
        <p className="text-sm text-gray-600">Measure How Fast You’re Growing Monthly Recurring performance management.</p>
      </div>
      <div className="flex items-center gap-4">
        <select className="border rounded px-2 py-1">
          <option>English</option>
        </select>
        <button className="bg-blue-500 text-white px-4 py-2 rounded">+ Create Notice</button>
      </div>
    </div>
  );
}