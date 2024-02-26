import { Component, OnInit } from '@angular/core';
import quizz_questions from '../../../assets/data/quizz_questions.json';

@Component({
  selector: 'app-quizz',
  templateUrl: './quizz.component.html',
  styleUrls: ['./quizz.component.css']
})
export class QuizzComponent implements OnInit {

  title:string = '';

  questions:any;
  questionSelected:any;

  answers:string[] = [];
  answerSelected:string = '';

  questionIndex:number = 0;
  questionMaxIndex:number = 0;

  finished:boolean = false;

  constructor() { }

  ngOnInit(): void {
    if(quizz_questions){
      this.finished = false;
      this.title = quizz_questions.title;

      this.questions = quizz_questions.questions;
      this.questionSelected = this.questions[this.questionIndex];

      this.questionMaxIndex = this.questions.length;
    }
  }

  playerChoice(valor:string){
    this.answers.push(valor);
    this.nextStep();
  }

  async nextStep(){
    this.questionIndex++;

    if (this.questionIndex < this.questionMaxIndex) {
      this.questionSelected = this.questions[this.questionIndex]
    } else {
      const finalAnswer:string = await this.checkResult(this.answers)
      this.finished = true;
      /*Aqui o finalAnswer se lê: 
       esta variável (no caso finalAnswer)
       vai se comportar "como" uma "chave de" "do tipo"*/
      this.answerSelected = quizz_questions.results[finalAnswer as keyof typeof quizz_questions
      .results]
    }
  }

  async checkResult(answers:string[]){
    /*O método de array reduce(()) lhe dá:
    reduce((valor anterior, valor atual, index da array, a própria array))

    Ele percorre todos os index da array comparando o item atual com o anterior
    Neste exemplo, estamos vendo se o index atual é maior do que o anterior*/
    const result = answers.reduce((previous, current, i, arr) => {
      if (
        arr.filter(item => item === previous).length >
        arr.filter(item => item === current).length
      ) {
        return previous;
      } else {
        return current;
      }
    })
    return result;
  }
}
