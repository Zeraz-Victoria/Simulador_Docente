import React, { useState, useEffect } from 'react';
import { Timer } from 'lucide-react';
import { Question } from '../types';
import ProgressBar from './ProgressBar';
import FeedbackCard from './FeedbackCard';
import { QUESTIONS_DURATION_SEC } from '../constants';

interface QuizCardProps {
  question: Question;
  onAnswer: (isCorrect: boolean) => void;
  onNext: () => void;
  onFinish: () => void;
  questionNumber: number;
  totalQuestions: number;
}

const QuizCard: React.FC<QuizCardProps> = ({ 
  question, 
  onAnswer, 
  onNext,
  onFinish,
  questionNumber, 
  totalQuestions 
}) => {
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [timeLeft, setTimeLeft] = useState(QUESTIONS_DURATION_SEC);

  // Timer Logic
  useEffect(() => {
    if (isAnswered) return;

    if (timeLeft <= 0) {
      handleTimeOut();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, isAnswered]);

  const handleTimeOut = () => {
    if (!isAnswered) {
      setIsAnswered(true);
      setSelectedOptionId('TIMEOUT'); // Special ID for timeout
      onAnswer(false);
    }
  };

  const handleOptionClick = (id: string, isCorrect: boolean) => {
    if (isAnswered) return;
    
    setSelectedOptionId(id);
    setIsAnswered(true);
    onAnswer(isCorrect);
  };

  // Reset state when question changes
  useEffect(() => {
    setSelectedOptionId(null);
    setIsAnswered(false);
    setTimeLeft(QUESTIONS_DURATION_SEC);
  }, [question]);

  const getOptionStyles = (optionId: string, isCorrect: boolean) => {
    const baseStyle = "w-full p-4 text-left border rounded-lg transition-all duration-200 flex items-start gap-3 group";
    
    if (!isAnswered) {
      return `${baseStyle} hover:bg-slate-50 border-slate-200 hover:border-blue-300`;
    }

    if (optionId === selectedOptionId) {
      return isCorrect 
        ? `${baseStyle} bg-green-50 border-green-500 ring-1 ring-green-500`
        : `${baseStyle} bg-red-50 border-red-500 ring-1 ring-red-500`;
    }

    // Show the correct answer if user picked wrong
    if (isCorrect && selectedOptionId !== optionId) {
      return `${baseStyle} bg-green-50 border-green-500 border-dashed opacity-80`;
    }

    return `${baseStyle} border-slate-100 opacity-50`;
  };

  return (
    <div className="max-w-3xl mx-auto pb-12">
      {/* Question Card */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-slate-200 relative">
        <ProgressBar timeLeft={timeLeft} isActive={!isAnswered} />
        
        <div className="p-6 sm:p-8">
          {/* Metadata Header */}
          <div className="flex justify-between items-start mb-6">
            <div>
              <span className="text-xs font-bold tracking-wider text-slate-400 uppercase">
                {question.nivel} &bull; {question.tema}
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-800 mt-2 leading-snug">
                {question.pregunta}
              </h2>
            </div>
            <div className="flex items-center gap-1 text-slate-400 font-mono text-sm shrink-0 ml-4">
              <Timer size={16} />
              <span className={`${timeLeft < 10 ? 'text-red-500 font-bold' : ''}`}>
                {timeLeft}s
              </span>
            </div>
          </div>

          {/* Options List */}
          <div className="space-y-3">
            {question.opciones.map((opcion) => (
              <button
                key={opcion.id}
                onClick={() => handleOptionClick(opcion.id, opcion.es_correcta)}
                disabled={isAnswered}
                className={getOptionStyles(opcion.id, opcion.es_correcta)}
              >
                <div className={`
                  w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 border
                  ${isAnswered && opcion.id === selectedOptionId 
                    ? (opcion.es_correcta ? 'bg-green-500 border-green-500 text-white' : 'bg-red-500 border-red-500 text-white')
                    : 'bg-white border-slate-300 text-slate-500 group-hover:border-blue-400 group-hover:text-blue-500'}
                `}>
                  {opcion.id}
                </div>
                <span className={`text-sm sm:text-base ${isAnswered ? 'text-slate-700' : 'text-slate-600'}`}>
                  {opcion.texto}
                </span>
              </button>
            ))}
          </div>
          
          <div className="mt-4 text-right text-xs text-slate-400 font-medium">
            Pregunta #{questionNumber}
          </div>
        </div>
      </div>

      {/* Feedback Section (appears after answer) */}
      {isAnswered && (
        <FeedbackCard 
          question={question}
          selectedOptionId={selectedOptionId}
          onNext={onNext}
          onFinish={onFinish}
          isLastQuestion={questionNumber === totalQuestions}
        />
      )}
    </div>
  );
};

export default QuizCard;