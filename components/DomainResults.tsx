import React from 'react';
import { BarChart2 } from 'lucide-react';
import { Attempt } from '../types';

interface DomainResultsProps {
  history: Attempt[];
}

interface DomainStat {
  name: string;
  percentage: number;
  correct: number;
  total: number;
}

const DomainResults: React.FC<DomainResultsProps> = ({ history }) => {
  // 1. Lógica de Cálculo (JS)
  const calculateDomainStats = (): DomainStat[] => {
    const domains: Record<string, { total: number; correct: number }> = {};

    history.forEach(attempt => {
      // Normalizamos el nombre del dominio para evitar duplicados por espacios extra
      const dom = attempt.question.dominio.trim();
      
      if (!domains[dom]) {
        domains[dom] = { total: 0, correct: 0 };
      }
      
      domains[dom].total += 1;
      if (attempt.isCorrect) {
        domains[dom].correct += 1;
      }
    });

    return Object.entries(domains).map(([name, stats]) => ({
      name,
      percentage: Math.round((stats.correct / stats.total) * 100),
      correct: stats.correct,
      total: stats.total
    })).sort((a, b) => b.percentage - a.percentage); // Ordenamos de mayor a menor desempeño
  };

  const stats = calculateDomainStats();

  // 3. Sistema de Semáforo (Colores Dinámicos)
  const getProgressBarColor = (percentage: number): string => {
    if (percentage >= 80) return 'bg-green-500'; // 80% - 100% (Verde)
    if (percentage >= 60) return 'bg-yellow-500'; // 60% - 79% (Amarillo)
    return 'bg-red-500'; // 0% - 59% (Rojo)
  };

  if (stats.length === 0) {
    return (
      <div className="bg-white p-6 rounded-xl shadow-md border border-slate-200 text-center text-slate-400">
        <p>No hay datos suficientes para generar el reporte por dominios.</p>
      </div>
    );
  }

  // 2. Visualización (HTML/CSS)
  return (
    <div className="bg-white p-6 rounded-xl shadow-md border border-slate-200">
      <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2 border-b border-slate-100 pb-4">
        <BarChart2 className="text-brand-guinda" size={20} />
        Resultados por Dominio
      </h3>
      
      <div className="space-y-6">
        {stats.map((domain) => (
          <div key={domain.name} className="group">
            <div className="flex justify-between items-end mb-2">
              <span className="font-medium text-slate-700 text-sm w-3/4 leading-tight">
                {domain.name}
              </span>
              <div className="text-right">
                <span className={`text-lg font-bold ${
                  domain.percentage >= 80 ? 'text-green-700' : 
                  domain.percentage >= 60 ? 'text-yellow-600' : 'text-red-600'
                }`}>
                  {domain.percentage}%
                </span>
                <div className="text-[10px] text-slate-400 font-mono">
                  ({domain.correct}/{domain.total})
                </div>
              </div>
            </div>
            
            {/* Barra de Progreso Visual (Fondo Gris) */}
            <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
              {/* Barra de Color Dinámico */}
              <div 
                className={`h-full rounded-full transition-all duration-1000 ease-out ${getProgressBarColor(domain.percentage)}`} 
                style={{ width: `${domain.percentage}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DomainResults;