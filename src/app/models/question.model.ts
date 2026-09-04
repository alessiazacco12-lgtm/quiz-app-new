// Definisco la struttura di una domanda del quiz.
export type Question = {
  question: string;
  answers: string[];
  correctAnswer: string;
};
