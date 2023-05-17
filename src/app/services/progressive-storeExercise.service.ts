import { Injectable } from "@angular/core";
import { Exercise } from "../models/exercise.model";
import { WeightExercise } from "../models/weightExercise.model";
import { Subject } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { exhaustMap, map } from "rxjs/operators";

@Injectable({providedIn:'root'})
export class ProgressiveStoreService{

    constructor(private http: HttpClient){}
    changedWeightExercise = new Subject<WeightExercise[]>();
    reputations: number[];

    weightExercises: WeightExercise[] = [ new WeightExercise("OneLegSquat",40,20,new Date(Date.now())),
    new WeightExercise("Crunches",0,20,new Date(Date.now())),
    new WeightExercise("FrontShoulder",20,30,new Date(Date.now())),
    new WeightExercise("Australian Pull Ups",70,25,new Date(Date.now())),
    new WeightExercise("OneArmPushUp",0,13,new Date(Date.now())),
    new WeightExercise("HipTraining",80,20,new Date(Date.now())),]

    putExercisesToFirebase(){
        this.http.put('https://ng-complete-guide-69f20-default-rtdb.europe-west1.firebasedatabase.app/weightExercises.json',
        this.weightExercises).subscribe(response => {
            console.log(response)
        })
    }
    deleteExercisesInFirebase(){
        this.http.delete('https://ng-complete-guide-69f20-default-rtdb.europe-west1.firebasedatabase.app/weightExercises.json')
        .subscribe(res => {
            console.log(res);
        })
    }

    // getExercisesFromFirebaseAndWorkWithIt(){
    //  this.http.get<WeightExercise[]>('https://ng-complete-guide-69f20-default-rtdb.europe-west1.firebasedatabase.app/weightExercises.json')
    //  .pipe(map(response => {
    //     const updatedResponse = response.filter(weightExercise => weightExercise.reps >= 25)
    //     .map(exercise => exercise.reps);
    //     return updatedResponse;
    //  })).subscribe(reps => {
    //     this.reputations = [...reps];
    //  })      
    // }
    async getExercisesFromFirebaseAndWorkWithIt(): Promise<void> {
        const response = await this.http.get<WeightExercise[]>('https://ng-complete-guide-69f20-default-rtdb.europe-west1.firebasedatabase.app/weightExercises.json').toPromise();
        const updatedResponse = response.filter(weightExercise => weightExercise.reps < 25).map(exercise => exercise.reps);
        this.reputations = [...updatedResponse];
      }
      

    getWeightExercises(){
        return this.weightExercises.slice();
    }

    setWeightExercises(weightExercises: WeightExercise[]){
        this.weightExercises = weightExercises;
        this.changedWeightExercise.next(this.weightExercises.slice());
    }

    getWeightExercise(index: number){
        return this.weightExercises[index];
    }

    updateWeightExercise(index: number, newWeightExercise: WeightExercise){
        this.weightExercises[index] = newWeightExercise;
        this.changedWeightExercise.next(this.weightExercises.slice());
    }

    addWeightExercise(newWeightExercise: WeightExercise){
        this.weightExercises.push(newWeightExercise);
        this.changedWeightExercise.next(this.weightExercises.slice());
    }

    deleteWeightExercise(index: number){
        this.weightExercises.splice(index,1);
        this.changedWeightExercise.next(this.weightExercises.slice());
    }

}