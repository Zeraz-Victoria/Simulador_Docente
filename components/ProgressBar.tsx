import React from 'react';
import { QUESTIONS_DURATION_SEC } from '../constants';

interface ProgressBarProps {
  timeLeft: number;
  isActive: boolean;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ timeLeft, isActive }) => {
  const percentage = (timeLeft / QUESTIONS_DURATION_SEC) * 100;
  
  let colorClass = 'bg-blue-500';
  if (percentage < 50) colorClass = 'bg-yellow-500';
  if (percentage < 20) colorClass = 'bg-red-500';

  return (
    <div className="w-full bg-slate-200 h-2 relative overflow-hidden">
      <div 
        className={`h-full transition-all duration-1000 ease-linear ${colorClass}`}
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
};

export default ProgressBar;