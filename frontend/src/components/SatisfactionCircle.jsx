// src/components/SatisfactionCircle.jsx
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

export default function SatisfactionCircle() {
  return (
    <div className="bg-white p-4 rounded-lg shadow w-full">
      <h2 className="text-lg font-semibold mb-2">Employee Satisfaction</h2>
      <div className="w-24 mx-auto">
        <CircularProgressbar
          value={74}
          text={`74%`}
          styles={buildStyles({
            textColor: "#333",
            pathColor: "#4ade80",
            trailColor: "#d1d5db",
          })}
        />
      </div>
      <p className="text-center text-sm text-gray-500 mt-2">Out of 100%</p>
    </div>
  );
}