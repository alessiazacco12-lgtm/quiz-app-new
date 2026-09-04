import { Component, input } from '@angular/core';
import { QuizResult } from '../../models/quiz-result.model';

@Component({
  selector: 'app-quiz-result-item',
  imports: [],
  templateUrl: './quiz-result-item.html',
  styleUrl: './quiz-result-item.css',
})
export class QuizResultItem {
  // Ricevo dal componente padre il risultato della singola domanda.
  result = input.required<QuizResult>();

  // Ricevo dal padre il numero della domanda.
  questionNumber = input.required<number>();
}
