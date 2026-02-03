export interface Option {
  id: string;
  texto: string;
  es_correcta: boolean;
}

export interface Question {
  nivel: string;
  dominio: string;
  tema: string;
  pregunta: string;
  opciones: Option[];
  retroalimentacion: string;
  fundamento_legal: string;
}

export type GameState = 'start' | 'playing' | 'summary';

// New interface to track every interaction for analytics
export interface Attempt {
  question: Question;
  selectedOptionId: string;
  isCorrect: boolean;
  timestamp: number;
}

export interface ScoreState {
  correct: number;
  incorrect: number;
  history: Attempt[];
}