import React, { useState, useEffect, useRef } from 'react';
import Header from './components/Header';
import QuizCard from './components/QuizCard';
import DomainResults from './components/DomainResults';
import { GameState, ScoreState, Question, Attempt } from './types';
import { MOCK_DATA } from './constants';
import { generateSingleQuestion } from './utils/gemini';
import { BookOpen, RefreshCw, School, GraduationCap, Star, AlertTriangle, CheckCircle, Repeat, Loader2 } from 'lucide-react';

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>('start');
  const [selectedLevel, setSelectedLevel] = useState<string>('General');
  
  // Queue Management
  const [questionQueue, setQuestionQueue] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  
  // ANTI-REPETITION SYSTEM
  const [seenQuestions] = useState<Set<string>>(new Set());
  
  // UI States
  const [isLoading, setIsLoading] = useState(false);
  
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

  // Helper para verificar unicidad
  const isQuestionSeen = (q: Question) => {
    return seenQuestions.has(q.pregunta);
  };

  const markQuestionAsSeen = (q: Question) => {
    seenQuestions.add(q.pregunta);
  };

  // --- LOGICA DE PRECARGA INTELIGENTE ---
  // Esta función añade preguntas a la cola sin bloquear la UI
  const triggerBackgroundFetch = async (level: string) => {
    try {
      console.log("Iniciando precarga en segundo plano...");
      const newQ = await generateSingleQuestion(level);
      
      // Usamos functional update para acceder al estado más reciente de la cola y seenQuestions
      setQuestionQueue(prevQueue => {
        // Verificar duplicados contra la cola actual Y el historial
        const isDuplicateInQueue = prevQueue.some(q => q.pregunta === newQ.pregunta);
        const isDuplicateInHistory = seenQuestions.has(newQ.pregunta);

        if (!isDuplicateInQueue && !isDuplicateInHistory) {
          console.log("Pregunta precargada exitosamente.");
          return [...prevQueue, newQ];
        } else {
          console.warn("Pregunta duplicada descartada en precarga.");
          return prevQueue;
        }
      });
    } catch (e) {
      console.log("Precarga falló silenciosamente (puede ser red o API ocupada)");
    }
  };

  const startQuiz = (mode: 'primaria' | 'secundaria') => {
    let filteredQuestions: Question[] = [];
    const levelName = mode === 'primaria' ? 'Primaria' : 'Secundaria';
    setSelectedLevel(levelName);

    // Initial Seed from MOCK_DATA
    if (mode === 'primaria') {
      filteredQuestions = MOCK_DATA.filter(q => 
        q.nivel === 'Primaria' || q.nivel === 'General'
      );
    } else if (mode === 'secundaria') {
      filteredQuestions = MOCK_DATA.filter(q => 
        q.nivel === 'Secundaria' || q.nivel === 'Telesecundaria' || q.nivel === 'General'
      );
    }

    const shuffled = [...filteredQuestions].sort(() => Math.random() - 0.5);
    
    // Tomamos un lote inicial más grande para dar margen
    const initialBatch = shuffled.slice(0, 5);
    initialBatch.forEach(q => markQuestionAsSeen(q));

    setQuestionQueue(initialBatch);
    
    if (initialBatch.length > 0) {
        setCurrentQuestion(initialBatch[0]);
        setQuestionsAnsweredCount(0); 
        setGameState('playing');
        
        // ESTRATEGIA DE VELOCIDAD:
        // Lanzamos DOS peticiones paralelas inmediatas para llenar el buffer
        triggerBackgroundFetch(levelName);
        setTimeout(() => triggerBackgroundFetch(levelName), 1500);
    } else {
        setGameState('playing');
        setQuestionsAnsweredCount(0); 
        nextQuestion(true, true); // Forzar carga inicial si no hay mocks
    }
  };

  const handleAnswer = (isCorrect: boolean, selectedOptionId: string) => {
    if (!currentQuestion) return;

    // ESTRATEGIA DE VELOCIDAD CRÍTICA:
    // Mientras el usuario lee la retroalimentación, cargamos la siguiente pregunta.
    // Esto elimina la espera percibida al dar clic en "Siguiente".
    if (questionQueue.length < 5) {
       triggerBackgroundFetch(selectedLevel);
    }

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

  const nextQuestion = async (wasLastAnswerCorrect: boolean, forceLoad = false) => {
    // Solo mostramos Loading si la cola está VACÍA. 
    // Gracias a la precarga, esto casi nunca debería pasar.
    if (!forceLoad && questionQueue.length > 1) {
        setIsLoading(false); 
    } else {
        setIsLoading(true);
    }

    try {
        let newQueue = forceLoad ? [...questionQueue] : questionQueue.slice(1);

        // Repetición espaciada para errores
        if (!wasLastAnswerCorrect && currentQuestion && !forceLoad) {
            const offset = Math.min(newQueue.length, 4);
            newQueue.splice(offset, 0, currentQuestion);
        }

        // Si la cola está vacía, debemos esperar forzosamente a la API
        if (newQueue.length === 0) {
            try {
                const newQ = await generateSingleQuestion(selectedLevel);
                if (!isQuestionSeen(newQ)) {
                    newQueue.push(newQ);
                } else {
                     // Reintento de emergencia
                     const retryQ = await generateSingleQuestion(selectedLevel);
                     newQueue.push(retryQ);
                }
            } catch (error) {
                 // Fallback final a Mocks reciclados si la API falla totalmente
                 const randomRecycled = MOCK_DATA[Math.floor(Math.random() * MOCK_DATA.length)];
                 newQueue.push(randomRecycled);
            }
        }

        setQuestionQueue(newQueue);
        
        if (newQueue[0]) {
            setCurrentQuestion(newQueue[0]);
            markQuestionAsSeen(newQueue[0]);
            if (!forceLoad) setQuestionsAnsweredCount(prev => prev + 1);
        } else {
             finishQuiz();
        }

    } catch (e) {
        console.error("Error navegación", e);
    } finally {
        setIsLoading(false);
    }
  };

  const finishQuiz = () => {
    setGameState('summary');
  };

  const resetApp = () => {
    setGameState('start');
    setQuestionQueue([]);
    setCurrentQuestion(null);
    seenQuestions.clear();
  };

  const clearScore = (e: React.MouseEvent) => {
    e.stopPropagation();
    setScore({ correct: 0, incorrect: 0, history: [] });
  };

  const getUniqueErrors = () => {
    const errors = score.history.filter(h => !h.isCorrect);
    return errors.reverse(); 
  };

  const totalEvaluated = score.correct + score.incorrect;
  const finalGrade = totalEvaluated > 0 
    ? ((score.correct / totalEvaluated) * 10).toFixed(1) 
    : "0.0";

  return (
    <div className="min-h-screen bg-slate-100 font-sans text-slate-800">
      <Header score={score} resetApp={resetApp} />

      {isLoading && (
          <div className="fixed inset-0 bg-black/60 z-[60] flex flex-col items-center justify-center backdrop-blur-sm text-white">
              <Loader2 className="animate-spin mb-4 text-brand-gold" size={48} />
              <p className="text-xl font-bold">Generando...</p>
          </div>
      )}

      <main className="container mx-auto px-4 py-8">
        
        {/* START SCREEN */}
        {gameState === 'start' && (
          <div className="max-w-lg mx-auto bg-white p-8 rounded-xl shadow-lg border border-slate-200 text-center mt-10">
            <div className="w-20 h-20 bg-brand-guinda rounded-full flex items-center justify-center mx-auto mb-6 shadow-md text-white">
              <BookOpen size={40} />
            </div>
            <h2 className="text-3xl font-bold text-brand-dark mb-2">Simulador USICAMM IA</h2>
            <div className="flex justify-center gap-2 mb-6">
                <span className="bg-yellow-100 text-yellow-800 text-xs font-bold px-2 py-1 rounded border border-yellow-200">Nivel Experto</span>
                <span className="bg-blue-100 text-blue-800 text-xs font-bold px-2 py-1 rounded border border-blue-200">Preguntas Infinitas</span>
            </div>
            <p className="text-slate-600 mb-8 leading-relaxed">
              Sistema de entrenamiento avanzado. Las preguntas se generan en tiempo real basándose en tus respuestas y en la <strong>normativa 2025</strong>. 
              <br/><br/>
              <span className="text-xs text-slate-400">Nota: Las preguntas no se repiten en la misma sesión.</span>
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
                  <span className="text-lg">Educación Básica (Primaria)</span>
                </div>
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
                    <span className="text-lg block">Educación Media (Secundaria)</span>
                   </div>
                </div>
              </button>
              
              <div className="pt-6 border-t border-slate-100 mt-6">
                <button 
                  onClick={clearScore}
                  className="w-full py-2 text-slate-400 hover:text-red-500 text-sm font-medium transition-colors flex items-center justify-center gap-2"
                >
                  <RefreshCw size={14} />
                  Reiniciar Historial
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
            onNext={(correct) => nextQuestion(correct)}
            onFinish={finishQuiz}
            questionNumber={questionsAnsweredCount + 1}
            queueLength={questionQueue.length - 1} 
          />
        )}

        {/* SUMMARY (Sin cambios) */}
        {gameState === 'summary' && (
           <div className="max-w-2xl mx-auto space-y-6 fade-in pb-12">
             <div className="bg-white p-8 rounded-xl shadow-lg border border-slate-200 text-center">
                <div className="w-16 h-16 bg-brand-gold rounded-full flex items-center justify-center mx-auto mb-4 shadow-md text-white">
                    <Star size={32} />
                </div>
                <h2 className="text-3xl font-bold text-brand-dark mb-1">Resultados</h2>
                
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
                     <div className="text-xs text-slate-400 uppercase">Total</div>
                   </div>
                   <div>
                     <div className="text-xl font-bold text-red-600">{score.incorrect}</div>
                     <div className="text-xs text-slate-400 uppercase">Errores</div>
                   </div>
                </div>
             </div>

             <DomainResults history={score.history} />

             <div className="bg-white p-6 rounded-xl shadow-md border border-slate-200">
                <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                    <AlertTriangle className="text-red-500" size={20} />
                    Repaso de Errores
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
                            </div>
                        );
                    })}
                     {getUniqueErrors().length === 0 && (
                         <div className="flex flex-col items-center justify-center py-8 text-slate-400">
                             <CheckCircle size={40} className="mb-2 text-green-200" />
                             <p>Sin errores. ¡Excelente dominio!</p>
                         </div>
                     )}
                </div>
             </div>

             <button 
                onClick={resetApp}
                className="w-full py-4 bg-brand-dark hover:bg-slate-800 text-white font-bold rounded-lg transition-colors shadow-md flex items-center justify-center gap-2"
              >
                <Repeat size={20} />
                Nueva Sesión
              </button>
           </div>
        )}
      </main>
    </div>
  );
};

export default App;