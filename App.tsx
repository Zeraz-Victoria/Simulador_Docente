import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import QuizCard from './components/QuizCard';
import { GameState, ScoreState, Question } from './types';
import { MOCK_DATA } from './constants';
import { BookOpen, RefreshCw, School, GraduationCap, Star } from 'lucide-react';

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>('start');
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [score, setScore] = useState<ScoreState>({
    correct: 0,
    incorrect: 0,
    history: []
  });

  // Persistence Logic
  useEffect(() => {
    const savedScore = localStorage.getItem('usicamm-score');
    if (savedScore) {
      try {
        setScore(JSON.parse(savedScore));
      } catch (e) {
        console.error("Error reading storage", e);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('usicamm-score', JSON.stringify(score));
  }, [score]);

  const startQuiz = (mode: 'primaria' | 'secundaria') => {
    let filteredQuestions: Question[] = [];

    if (mode === 'primaria') {
      filteredQuestions = MOCK_DATA.filter(q => 
        q.nivel === 'Primaria' || q.nivel === 'General'
      );
    } else if (mode === 'secundaria') {
      filteredQuestions = MOCK_DATA.filter(q => 
        q.nivel === 'Secundaria' || q.nivel === 'Telesecundaria' || q.nivel === 'General'
      );
    }

    if (filteredQuestions.length === 0) {
      alert('No hay preguntas disponibles para esta selección.');
      return;
    }

    // Shuffle for random order
    const shuffled = [...filteredQuestions].sort(() => Math.random() - 0.5);

    setQuestions(shuffled);
    setGameState('playing');
    setCurrentQuestionIdx(0);
  };

  const handleAnswer = (isCorrect: boolean) => {
    setScore(prev => ({
      correct: isCorrect ? prev.correct + 1 : prev.correct,
      incorrect: !isCorrect ? prev.incorrect + 1 : prev.incorrect,
      history: [...prev.history, { questionIndex: currentQuestionIdx, isCorrect }]
    }));
  };

  const nextQuestion = () => {
    if (currentQuestionIdx < questions.length - 1) {
      setCurrentQuestionIdx(prev => prev + 1);
    } else {
      finishQuiz();
    }
  };

  const finishQuiz = () => {
    setGameState('summary');
  };

  const resetApp = () => {
    setGameState('start');
    setCurrentQuestionIdx(0);
  };

  const clearScore = (e: React.MouseEvent) => {
    e.stopPropagation();
    setScore({ correct: 0, incorrect: 0, history: [] });
  };

  // Calculation for summary
  const totalEvaluated = score.correct + score.incorrect;
  const finalGrade = totalEvaluated > 0 
    ? ((score.correct / totalEvaluated) * 10).toFixed(1) 
    : "0.0";

  return (
    <div className="min-h-screen bg-slate-100 font-sans text-slate-800">
      <Header score={score} resetApp={resetApp} />

      <main className="container mx-auto px-4 py-8">
        
        {/* START SCREEN */}
        {gameState === 'start' && (
          <div className="max-w-lg mx-auto bg-white p-8 rounded-xl shadow-lg border border-slate-200 text-center mt-10">
            <div className="w-20 h-20 bg-brand-guinda rounded-full flex items-center justify-center mx-auto mb-6 shadow-md text-white">
              <BookOpen size={40} />
            </div>
            <h2 className="text-3xl font-bold text-brand-dark mb-2">Modo Estudio</h2>
            <p className="text-slate-600 mb-8 leading-relaxed">
              Responde sin límite de tiempo. Puedes detenerte y evaluar tu desempeño en cualquier momento.
            </p>
            
            <div className="space-y-4">
              <button 
                onClick={() => startQuiz('primaria')}
                className="w-full py-5 bg-white border-2 border-slate-200 hover:border-brand-guinda hover:bg-red-50 text-slate-700 hover:text-brand-guinda font-bold rounded-xl transition-all flex items-center justify-between px-6 group shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <div className="bg-slate-100 p-2 rounded-lg group-hover:bg-white transition-colors">
                     <School className="text-slate-500 group-hover:text-brand-guinda" size={24} />
                  </div>
                  <span className="text-lg">Primaria</span>
                </div>
                <span className="text-xs font-normal text-slate-400 group-hover:text-brand-guinda/70">NEM y Normatividad</span>
              </button>

              <button 
                onClick={() => startQuiz('secundaria')}
                className="w-full py-5 bg-white border-2 border-slate-200 hover:border-blue-600 hover:bg-blue-50 text-slate-700 hover:text-blue-700 font-bold rounded-xl transition-all flex items-center justify-between px-6 group shadow-sm"
              >
                <div className="flex items-center gap-3">
                   <div className="bg-slate-100 p-2 rounded-lg group-hover:bg-white transition-colors">
                     <GraduationCap className="text-slate-500 group-hover:text-blue-600" size={24} />
                   </div>
                   <div className="text-left">
                    <span className="text-lg block">Secundaria</span>
                    <span className="text-xs font-normal text-slate-400 group-hover:text-blue-600/70">Incluye Telesecundaria</span>
                   </div>
                </div>
              </button>
              
              <div className="pt-6 border-t border-slate-100 mt-6">
                <button 
                  onClick={clearScore}
                  className="w-full py-2 text-slate-400 hover:text-red-500 text-sm font-medium transition-colors flex items-center justify-center gap-2"
                >
                  <RefreshCw size={14} />
                  Reiniciar Puntaje Acumulado
                </button>
              </div>
            </div>
          </div>
        )}

        {/* PLAYING */}
        {gameState === 'playing' && questions.length > 0 && (
          <QuizCard 
            question={questions[currentQuestionIdx]}
            onAnswer={handleAnswer}
            onNext={nextQuestion}
            onFinish={finishQuiz}
            questionNumber={currentQuestionIdx + 1}
            totalQuestions={questions.length}
          />
        )}

        {/* SUMMARY */}
        {gameState === 'summary' && (
           <div className="max-w-lg mx-auto bg-white p-8 rounded-xl shadow-lg border border-slate-200 text-center mt-10 fade-in">
             <div className="w-20 h-20 bg-brand-gold rounded-full flex items-center justify-center mx-auto mb-6 shadow-md text-white">
                <Star size={40} />
             </div>
             <h2 className="text-3xl font-bold text-brand-dark mb-2">Evaluación Final</h2>
             <p className="text-slate-500 mb-8">Desempeño acumulado hasta el momento:</p>
             
             <div className="bg-slate-50 rounded-xl p-6 mb-8 border border-slate-100">
                <div className="text-6xl font-bold text-brand-guinda mb-2">{finalGrade}</div>
                <div className="text-sm font-medium text-slate-400 uppercase tracking-widest">Calificación Global</div>
             </div>

             <div className="flex justify-center gap-8 mb-8 border-t border-slate-100 pt-6">
               <div className="text-center">
                 <div className="text-2xl font-bold text-green-600">{score.correct}</div>
                 <div className="text-xs text-slate-400 uppercase tracking-wide">Aciertos</div>
               </div>
               <div className="text-center">
                 <div className="text-2xl font-bold text-slate-600">{totalEvaluated}</div>
                 <div className="text-xs text-slate-400 uppercase tracking-wide">Intentos</div>
               </div>
               <div className="text-center">
                 <div className="text-2xl font-bold text-red-600">{score.incorrect}</div>
                 <div className="text-xs text-slate-400 uppercase tracking-wide">Errores</div>
               </div>
             </div>

             <div className="space-y-3">
               <button 
                  onClick={resetApp}
                  className="w-full py-4 bg-brand-dark hover:bg-slate-800 text-white font-bold rounded-lg transition-colors shadow-md"
                >
                  Regresar al Inicio
                </button>
             </div>
           </div>
        )}
      </main>
    </div>
  );
};

export default App;