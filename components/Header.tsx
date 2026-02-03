import React from 'react';
import { Award, AlertCircle } from 'lucide-react';
import { ScoreState } from '../types';

interface HeaderProps {
  score: ScoreState;
  resetApp: () => void;
}

const Header: React.FC<HeaderProps> = ({ score, resetApp }) => {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-4xl mx-auto px-4 py-3 flex justify-between items-center">
        <div 
          className="flex items-center gap-2 cursor-pointer" 
          onClick={resetApp}
        >
          <div className="w-8 h-8 bg-brand-guinda rounded-md flex items-center justify-center text-white font-bold">
            US
          </div>
          <div>
            <h1 className="text-sm font-bold text-slate-800 leading-tight">Simulador</h1>
            <p className="text-xs text-slate-500">Examen Docente</p>
          </div>
        </div>

        <div className="flex gap-4 text-sm font-medium">
          <div className="flex items-center gap-1 text-green-600 bg-green-50 px-3 py-1 rounded-full border border-green-100">
            <Award size={16} />
            <span>{score.correct}</span>
            <span className="hidden sm:inline">Aciertos</span>
          </div>
          <div className="flex items-center gap-1 text-red-600 bg-red-50 px-3 py-1 rounded-full border border-red-100">
            <AlertCircle size={16} />
            <span>{score.incorrect}</span>
            <span className="hidden sm:inline">Errores</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;