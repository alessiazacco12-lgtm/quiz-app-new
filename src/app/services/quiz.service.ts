import { Injectable } from '@angular/core';
import { Question } from '../models/question.model';

@Injectable({
  providedIn: 'root',
})
export class QuizService {
  // Elenco originale delle domande. Le domande restano sempre nello stesso ordine.
  private originalQuestions: Question[] = [
    {
      question: 'What does HTML stand for?',
      answers: [
        'Hyper Text Markup Language',
        'High Text Machine Language',
        'Hyper Transfer Markup Language',
        'Home Tool Markup Language',
      ],
      correctAnswer: 'Hyper Text Markup Language',
    },
    {
      question: 'Which CSS property changes the text color?',
      answers: ['font-color', 'text-color', 'color', 'background-color'],
      correctAnswer: 'color',
    },
    {
      question: 'Which keyword creates a variable that cannot be reassigned?',
      answers: ['var', 'let', 'const', 'static'],
      correctAnswer: 'const',
    },
    {
      question: 'What is Angular mainly used for?',
      answers: [
        'Creating databases',
        'Building web applications',
        'Editing images',
        'Managing operating systems',
      ],
      correctAnswer: 'Building web applications',
    },
    {
      question: 'What does a signal store in Angular?',
      answers: ['A reactive value', 'Only HTML', 'A CSS class', 'A database connection'],
      correctAnswer: 'A reactive value',
    },
  ];

  // Creo l'elenco delle domande che verrà usato nel quiz. Con map() mantengo lo stesso ordine delle domande. Per ogni domanda creo una copia e mescolo solo le risposte.
  questions: Question[] = this.originalQuestions.map((question) => {
    return {
      // Copio tutte le proprietà della domanda originale.
      ...question,
      // Sostituisco l'array delle risposte con una nuova versione mescolata.
      answers: this.shuffleAnswers(question.answers),
    };
  });

  // Metodo privato usato dentro service. Riceve l'array delle risposte di una domanda.
  private shuffleAnswers(answers: string[]) {
    // Creo una copia dell'array originale per non modificarlo direttamente. Poi cambio casualmente l'ordine delle risposte.
    return [...answers].sort(() => Math.random() - 0.5);
  }
}
