import { Component, computed, inject, signal } from '@angular/core';
import { QuizResult } from '../../models/quiz-result.model';
import { QuizService } from '../../services/quiz.service';
import { QuizResultItem } from '../quiz-result-item/quiz-result-item';

@Component({
  selector: 'app-quiz',
  imports: [QuizResultItem],
  templateUrl: './quiz.html',
  styleUrl: './quiz.css',
})
export class Quiz {
  // Recupero il service che contiene le domande.
  private quizService = inject(QuizService);

  // Salvo le domande presenti nel service.
  questions = this.quizService.questions;

  // Indica se il quiz è iniziato e terminato.
  quizStarted = signal(false);
  quizFinished = signal(false);

  // Indice della domanda corrente.
  currentIndex = signal(0);

  // Risposta scelta dall'utente.
  selectedAnswer = signal('');

  // Score del quiz.
  score = signal(0);

  // Elenco dei risultati delle risposte date.
  results = signal<QuizResult[]>([]);

  // Calcolo la domanda corrente in base all'indice.
  currentQuestion = computed(() => {
    return this.questions[this.currentIndex()];
  });

  // Il quiz parte.
  startQuiz() {
    this.quizStarted.set(true);
  }

  // Gestisce la risposta scelta dall'utente.
  selectAnswer(answer: string) {
    // Se una risposta è già stata scelta non permetto di cambiarla.
    if (this.selectedAnswer() !== '') {
      return;
    }

    this.selectedAnswer.set(answer);

    // Controllo se la risposta è corretta. Se sì aumento il punteggio.
    const isCorrect = answer === this.currentQuestion().correctAnswer;

    if (isCorrect) {
      this.score.update((score) => score + 1);
    }

    /*Caso contrario potrei usare un else ma non serve perché il punteggio rimane invariato.
     */

    // Salvo il risultato della domanda.
    const result: QuizResult = {
      question: this.currentQuestion().question,
      selectedAnswer: answer,
      correctAnswer: this.currentQuestion().correctAnswer,
      correct: isCorrect,
    };

    this.results.update((results) => [...results, result]);
  }

  // Passo alla nextQuestion.
  nextQuestion() {
    if (this.currentIndex() < this.questions.length - 1) {
      this.currentIndex.update((index) => index + 1);
      this.selectedAnswer.set('');
    } else {
      this.quizFinished.set(true);
    }
  }
}
