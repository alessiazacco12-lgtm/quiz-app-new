// Definisco la struttura del risultato di ogni domanda.
export type QuizResult = {
  question: string;
  selectedAnswer: string;
  correctAnswer: string;
  correct: boolean;
};
