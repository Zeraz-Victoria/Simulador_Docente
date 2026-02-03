import React from 'react';
import { BookOpen, CheckCircle, XCircle, Scale, ArrowRight, Flag, Sparkles } from 'lucide-react';
import { Question, Option } from '../types';

interface FeedbackCardProps {
  question: Question;
  selectedOptionId: string | null;
  onNext: () => void;
  onFinish: () => void;
  isLastQuestion: boolean; // Kept for interface compatibility but logic changed for infinite mode
}

const FeedbackCard: React.FC<FeedbackCardProps> = ({ 
  question, 
  selectedOptionId, 
  onNext, 
  onFinish
}) => {
  const isCorrect = question.opciones.find(o => o.id === selectedOptionId)?.es_correcta;
  const correctOption = question.opciones.find(o => o.es_correcta);

  return (
    <div className="mt-6 bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden fade-in">
      <div className={`p-4 flex items-center gap-3 border-b ${isCorrect ? 'bg-green-50 border-green-100' : 'bg-red-50 border-red-100'}`}>
        {isCorrect ? (
          <CheckCircle className="text-green-600" size={24} />
        ) : (
          <XCircle className="text-red-600" size={24} />
        )}
        <h3 className={`font-bold text-lg ${isCorrect ? 'text-green-800' : 'text-red-800'}`}>
          {isCorrect ? '¡Respuesta Correcta!' : 'Respuesta Incorrecta'}
        </h3>
      </div>

      <div className="p-6 space-y-6">
        {/* Feedback Section */}
        <div>
          <h4 className="text-sm uppercase tracking-wide text-slate-500 font-bold mb-2 flex items-center gap-2">
            <BookOpen size={16} />
            Retroalimentación
          </h4>
          <p className="text-slate-700 leading-relaxed text-base">
            {question.retroalimentacion}
          </p>
          {!isCorrect && (
             <p className="mt-2 text-sm text-slate-500">
               La respuesta correcta era la <strong>Opción {correctOption?.id}</strong>.
             </p>
          )}
        </div>

        {/* Legal Basis Section */}
        <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
          <h4 className="text-sm uppercase tracking-wide text-slate-500 font-bold mb-2 flex items-center gap-2">
            <Scale size={16} />
            Fundamento Legal
          </h4>
          <p className="text-slate-600 text-sm italic">
            "{question.fundamento_legal}"
          </p>
        </div>

        {/* Domain Tag */}
        <div className="flex justify-end">
           <span className="inline-block bg-brand-guinda/10 text-brand-guinda text-xs px-2 py-1 rounded font-medium">
             {question.dominio}
           </span>
        </div>

        {/* Action Buttons - Infinite Mode Design */}
        <div className="flex flex-col sm:flex-row gap-4 pt-2">
          {/* Always show Next Button to trigger AI generation if needed */}
          <button
            onClick={onNext}
            className="flex-1 py-3 bg-brand-dark hover:bg-slate-800 text-white font-bold rounded-lg transition-colors shadow-md flex items-center justify-center gap-2"
          >
            <span>Siguiente Pregunta</span>
            <ArrowRight size={18} />
            {/* Indicador sutil de que es infinito */}
            <Sparkles size={14} className="text-brand-gold animate-pulse ml-1" />
          </button>
          
          <button
            onClick={onFinish}
            className="flex-1 py-3 font-bold rounded-lg transition-colors shadow-md flex items-center justify-center gap-2 border bg-white hover:bg-slate-50 text-slate-600 border-slate-200 hover:border-slate-300"
          >
            <Flag size={18} />
            <span>Terminar y Evaluar</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeedbackCard;