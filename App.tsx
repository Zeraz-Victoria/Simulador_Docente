import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import QuizCard from './components/QuizCard';
import DomainResults from './components/DomainResults';
import { GameState, ScoreState, Question, Attempt } from './types';
import { MOCK_DATA } from './constants';
import { BookOpen, RefreshCw, School, GraduationCap, Star, AlertTriangle, CheckCircle, Repeat } from 'lucide-react';

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>('start');
  
  // Queue Management for Spaced Repetition
  const [questionQueue, setQuestionQueue] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  
  // Counters
  const [questionsAnsweredCount, setQuestionsAnsweredCount] = useState(0);

  // Analytics State
  const [score, setScore] = useState<ScoreState>({
    correct: 0,
    incorrect: 0,
    history: []
  });

  // Load Score from LocalStorage
  useEffect(() => {
    const savedScore = localStorage.getItem('usicamm-score-v2');
    if (savedScore) {
      try {
        setScore(JSON.parse(savedScore));
      } catch (e) {
        console.error("Error reading storage", e);
      }
    }
  }, []);

  // Save Score
  useEffect(() => {
    localStorage.setItem('usicamm-score-v2', JSON.stringify(score));
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
      alert('No hay preguntas disponibles.');
      return;
    }

    // Shuffle initial deck
    const shuffled = [...filteredQuestions].sort(() => Math.random() - 0.5);

    setQuestionQueue(shuffled);
    setCurrentQuestion(shuffled[0]); // Set first question
    setQuestionsAnsweredCount(0); // Reset session counter
    setGameState('playing');
  };

  const handleAnswer = (isCorrect: boolean, selectedOptionId: string) => {
    if (!currentQuestion) return;

    // Log the attempt
    const newAttempt: Attempt = {
      question: currentQuestion,
      selectedOptionId,
      isCorrect,
      timestamp: Date.now()
    };

    setScore(prev => ({
      correct: isCorrect ? prev.correct + 1 : prev.correct,
      incorrect: !isCorrect ? prev.incorrect + 1 : prev.incorrect,
      history: [...prev.history, newAttempt]
    }));
  };

  const nextQuestion = (wasLastAnswerCorrect: boolean) => {
    // 1. Remove the current question from the front of the queue
    let newQueue = questionQueue.slice(1);

    // 2. SPACED REPETITION LOGIC
    // If incorrect, re-insert the current question into the queue
    if (!wasLastAnswerCorrect && currentQuestion) {
      // Determine re-insertion index: randomly between 3 and 5 spots later, 
      // or at the end if queue is short.
      const offset = Math.min(newQueue.length, Math.floor(Math.random() * 3) + 3);
      
      // We insert a copy to ensure it appears again
      newQueue.splice(offset, 0, currentQuestion);
    }

    // 3. Check if queue is empty (Mastery achieved)
    if (newQueue.length === 0) {
      finishQuiz();
      return;
    }

    // 4. Update State
    setQuestionQueue(newQueue);
    setCurrentQuestion(newQueue[0]);
    setQuestionsAnsweredCount(prev => prev + 1);
  };

  const finishQuiz = () => {
    setGameState('summary');
  };

  const resetApp = () => {
    setGameState('start');
    setQuestionQueue([]);
    setCurrentQuestion(null);
  };

  const clearScore = (e: React.MouseEvent) => {
    e.stopPropagation();
    setScore({ correct: 0, incorrect: 0, history: [] });
  };

  // --- ANALYTICS HELPERS ---

  const getUniqueErrors = () => {
    // Get distinct questions that were answered incorrectly at least once
    // We use a Map to keep the LAST failed attempt or just unique questions
    const errors = score.history.filter(h => !h.isCorrect);
    return errors.reverse(); // Show most recent errors first
  };

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
            <h2 className="text-3xl font-bold text-brand-dark mb-2">Modo Estudio Adaptativo</h2>
            <p className="text-slate-600 mb-8 leading-relaxed">
              El examen no termina hasta que tú decidas. Las preguntas que falles volverán a aparecer (Repetición Espaciada) para asegurar tu aprendizaje.
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
                  Reiniciar Historial de Aprendizaje
                </button>
              </div>
            </div>
          </div>
        )}

        {/* PLAYING */}
        {gameState === 'playing' && currentQuestion && (
          <QuizCard 
            question={currentQuestion}
            onAnswer={handleAnswer}
            onNext={nextQuestion}
            onFinish={finishQuiz}
            questionNumber={questionsAnsweredCount + 1}
            queueLength={questionQueue.length}
          />
        )}

        {/* SUMMARY & ANALYTICS */}
        {gameState === 'summary' && (
           <div className="max-w-2xl mx-auto space-y-6 fade-in pb-12">
             
             {/* Main Score Card */}
             <div className="bg-white p-8 rounded-xl shadow-lg border border-slate-200 text-center">
                <div className="w-16 h-16 bg-brand-gold rounded-full flex items-center justify-center mx-auto mb-4 shadow-md text-white">
                    <Star size={32} />
                </div>
                <h2 className="text-3xl font-bold text-brand-dark mb-1">Resultados de la Sesión</h2>
                <div className="text-sm text-slate-500 mb-6">Resumen de desempeño acumulado</div>
                
                <div className="flex items-end justify-center gap-2 mb-6">
                    <span className="text-6xl font-bold text-brand-guinda">{finalGrade}</span>
                    <span className="text-xl text-slate-400 font-medium mb-2">/ 10</span>
                </div>

                <div className="grid grid-cols-3 gap-4 border-t border-slate-100 pt-6">
                   <div>
                     <div className="text-xl font-bold text-green-600">{score.correct}</div>
                     <div className="text-xs text-slate-400 uppercase">Aciertos</div>
                   </div>
                   <div>
                     <div className="text-xl font-bold text-slate-600">{totalEvaluated}</div>
                     <div className="text-xs text-slate-400 uppercase">Intentos</div>
                   </div>
                   <div>
                     <div className="text-xl font-bold text-red-600">{score.incorrect}</div>
                     <div className="text-xs text-slate-400 uppercase">Errores</div>
                   </div>
                </div>
             </div>

             {/* Domain Breakdown (New Component) */}
             <DomainResults history={score.history} />

             {/* Detailed Error Report */}
             <div className="bg-white p-6 rounded-xl shadow-md border border-slate-200">
                <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                    <AlertTriangle className="text-red-500" size={20} />
                    Reporte de Errores (Áreas de Oportunidad)
                </h3>
                <div className="space-y-4">
                    {getUniqueErrors().map((attempt, idx) => {
                        const wrongOption = attempt.question.opciones.find(o => o.id === attempt.selectedOptionId);
                        const correctOption = attempt.question.opciones.find(o => o.es_correcta);
                        
                        return (
                            <div key={idx} className="border-l-4 border-red-400 bg-red-50 p-4 rounded-r-lg">
                                <p className="text-sm font-bold text-slate-800 mb-2">{attempt.question.pregunta}</p>
                                <div className="text-xs text-slate-600 mb-1">
                                    <span className="font-semibold text-red-700">Tu respuesta:</span> {wrongOption?.texto || 'Tiempo agotado'}
                                </div>
                                <div className="text-xs text-slate-600 mb-2">
                                    <span className="font-semibold text-green-700">Correcta:</span> {correctOption?.texto}
                                </div>
                                <p className="text-xs text-slate-500 italic border-t border-red-200 pt-2 mt-2">
                                    {attempt.question.retroalimentacion}
                                </p>
                            </div>
                        );
                    })}
                     {getUniqueErrors().length === 0 && (
                         <div className="flex flex-col items-center justify-center py-8 text-slate-400">
                             <CheckCircle size={40} className="mb-2 text-green-200" />
                             <p>¡Excelente! No tienes errores registrados en esta sesión.</p>
                         </div>
                     )}
                </div>
             </div>

             <button 
                onClick={resetApp}
                className="w-full py-4 bg-brand-dark hover:bg-slate-800 text-white font-bold rounded-lg transition-colors shadow-md flex items-center justify-center gap-2"
              >
                <Repeat size={20} />
                Iniciar Nueva Sesión
              </button>

           </div>
        )}
      </main>
    </div>
  );
};

export default App;