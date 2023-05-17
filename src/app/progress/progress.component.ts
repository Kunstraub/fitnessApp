import { Component, OnInit } from '@angular/core';
import { WeightExercise } from '../models/weightExercise.model';
import { ProgressiveStoreService } from '../services/progressive-storeExercise.service';
import { WeightExerciseService } from '../services/weight-exercise.service';
import { NgForm } from '@angular/forms';

interface Human {
  firstName: string;
  age: number

  addYearToAge: () => number   
}

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.css']
})
export class ProgressComponent implements OnInit {

  stefan: Human;
  imageUrl: string = 'assets/Jennifer Lawrence very HOT 7.jpg';
  spiel: string = 'hier ein spiel eingeben'
  onClick(){
    console.log(this.spiel)
  }
  isHighlighted: boolean = true;
  changeHightlight(){
    this.isHighlighted = !this.isHighlighted
  }
  
  
 reps: number[];
  exercises: WeightExercise[] = [ new WeightExercise("Bankdrücken",120,10, new Date(Date.now())),
new WeightExercise("Kniebeugen",120,8, new Date(Date.now())),new WeightExercise("Klimmzüge",110,10, new Date(Date.now())),
new WeightExercise("Dips",110,10, new Date(Date.now())),];

  constructor(private progressiveService: ProgressiveStoreService) { }

  ngOnInit(): void {
    this.stefan = {
      firstName : 'Stefan',
      age: 44,
      addYearToAge() {
        return this.age+1;
      }
      
    }
  }

  main(){
    const number = [1, 2, 3, 4, 5];
const sum = number.reduce((acc, num) => acc + num, 0);
console.log(sum); // Output: 15

    const numbers = [1, 2, 3, 4, 5];
const squaredNumbers = numbers.map(num => num * num)
const exerciseDips = this.exercises.filter(exercise => exercise.name == 'Dips')
const konkatExercises = this.exercises.map(exercise => exercise.name+' Übung')
const sumReps = this.exercises.reduce((acc, current) => acc + current.reps, 0)
const sumNames = this.exercises.reduce((acc, curr) => acc + ',' +curr.name, '')
const keys = Object.keys(this.stefan)
const values = Object.values(this.exercises)
const pushInExercise = this.exercises.push(new WeightExercise('DragonAbs',100,10,new Date(Date.now())))
const deletetedArrExercise = this.exercises.splice(1,2)
const lastDragon = this.exercises.pop()
const firstNum = numbers.shift()
this.exercises.unshift(new WeightExercise('DragonAbs',100,10,new Date(Date.now())))
const joinedNumsComaSeperated = numbers.join(',')
const indexFrom5 = numbers.indexOf(5)//here it is the value not the index as parameter
const allNumsLowerTen = numbers.every(num => num < 10)
console.log(this.exercises); // Output: [1, 4, 9, 16, 25]
this.exercises.sort((a,b) => b.weightKG - a.weightKG)
console.log(this.exercises); 
setTimeout(() => {
  console.log('Huhu nach drei Sekunde!!!!'); // Output: [1, 4, 9, 16, 25]
}, 3000);

    // console.log(this.updatedArray)
    // console.log(this.demoArray)
  }
  sendToFirebase(){
    this.progressiveService.putExercisesToFirebase();
  }

  async getTheReps(): Promise<void>{
     await this.progressiveService.getExercisesFromFirebaseAndWorkWithIt();
      this.reps = [...this.progressiveService.reputations]
    
  }

  deleteWeightExercisesInFirebase(){
    this.progressiveService.deleteExercisesInFirebase();
  }



  insertAtBeginning<T>(array: T[], value: T){
    const newArray = [value , ...array];
    return newArray;
  }

  demoArray = [1,2,3,4];
  updatedArray = this.insertAtBeginning(this.demoArray,0);
  

}
