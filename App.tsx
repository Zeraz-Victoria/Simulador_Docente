import React, { useState, useEffect } from 'react';
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

    // Mezclar preguntas iniciales
    const shuffled = [...filteredQuestions].sort(() => Math.random() - 0.5);
    
    // Cargamos TODAS las preguntas disponibles en el banco local para empezar.
    const initialBatch = shuffled.length > 0 ? shuffled : MOCK_DATA.slice(0, 5); // Fallback por seguridad

    setQuestionQueue(initialBatch);
    setCurrentQuestion(initialBatch[0]); 
    setQuestionsAnsweredCount(0); 
    setGameState('playing');
  };

  const handleAnswer = (isCorrect: boolean, selectedOptionId: string) => {
    if (!currentQuestion) return;

    // NO hay lógica de "stop" aquí. Solo registramos el intento.
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

  const nextQuestion = async (wasLastAnswerCorrect: boolean) => {
    setIsLoading(true);

    try {
        // 1. Remover la pregunta actual de la cola
        let newQueue = questionQueue.slice(1);

        // 2. Lógica de Repetición Espaciada (Reinsertar errores)
        if (!wasLastAnswerCorrect && currentQuestion) {
            // Insertar 3 espacios después o al final
            const offset = Math.min(newQueue.length, 3);
            newQueue.splice(offset, 0, currentQuestion);
        }

        // 3. LÓGICA INFINITA ROBUSTA:
        // Si la cola está vacía, intentamos generar con IA.
        if (newQueue.length === 0) {
            try {
                // Intentar generar nueva pregunta fresca
                const newGeneratedQuestion = await generateSingleQuestion(selectedLevel);
                newQueue.push(newGeneratedQuestion);
            } catch (error) {
                console.error("Fallo en API, usando fallback local para mantener flujo infinito", error);
                
                // FALLBACK INFINITO ROBUSTO
                const backupQuestions = MOCK_DATA.filter(q => q.nivel === selectedLevel || q.nivel === 'General');
                
                // Aseguramos que siempre haya algo que agregar
                if (backupQuestions.length > 0) {
                   const randomBackup = backupQuestions[Math.floor(Math.random() * backupQuestions.length)];
                   newQueue.push(randomBackup);
                } else {
                   // Ultimate fallback si el filtro falla
                   newQueue.push(MOCK_DATA[Math.floor(Math.random() * MOCK_DATA.length)]);
                }
            }
        }

        // 4. Actualizar Estado
        setQuestionQueue(newQueue);
        // Validamos que exista un elemento 0
        if (newQueue[0]) {
            setCurrentQuestion(newQueue[0]);
            setQuestionsAnsweredCount(prev => prev + 1);
        } else {
             // Caso extremadamente raro: cola vacía y fallback falló
             finishQuiz();
        }

    } catch (e) {
        console.error("Error crítico en navegación", e);
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
  };

  const clearScore = (e: React.MouseEvent) => {
    e.stopPropagation();
    setScore({ correct: 0, incorrect: 0, history: [] });
  };

  // --- ANALYTICS HELPERS ---
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

      {/* Loading Overlay */}
      {isLoading && (
          <div className="fixed inset-0 bg-black/50 z-[60] flex flex-col items-center justify-center backdrop-blur-sm text-white">
              <Loader2 className="animate-spin mb-4 text-brand-gold" size={48} />
              <p className="text-lg font-medium">Generando siguiente pregunta...</p>
              <p className="text-sm text-slate-300">Consultando base de datos pedagógica</p>
          </div>
      )}

      <main className="container mx-auto px-4 py-8">
        
        {/* START SCREEN */}
        {gameState === 'start' && (
          <div className="max-w-lg mx-auto bg-white p-8 rounded-xl shadow-lg border border-slate-200 text-center mt-10">
            <div className="w-20 h-20 bg-brand-guinda rounded-full flex items-center justify-center mx-auto mb-6 shadow-md text-white">
              <BookOpen size={40} />
            </div>
            <h2 className="text-3xl font-bold text-brand-dark mb-2">Simulador Infinito IA</h2>
            <p className="text-slate-600 mb-8 leading-relaxed">
              Practica con preguntas ilimitadas. El examen <strong>no se detendrá</strong> hasta que tú decidas finalizar.
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
                <span className="text-xs font-normal text-slate-400 group-hover:text-brand-guinda/70">Modo Infinito</span>
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
                    <span className="text-xs font-normal text-slate-400 group-hover:text-blue-600/70">Modo Infinito</span>
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

        {/* SUMMARY */}
        {gameState === 'summary' && (
           <div className="max-w-2xl mx-auto space-y-6 fade-in pb-12">
             {/* Score Card */}
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

             {/* Domain Results */}
             <DomainResults history={score.history} />

             {/* Error Report */}
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