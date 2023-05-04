import { Injectable } from "@angular/core";
import { WeightExercise } from "../models/weightExercise.model";
import { Subject } from "rxjs/Subject";

@Injectable({providedIn:'root'})
export class WeightExerciseService{
    changedWeightExercise = new Subject<WeightExercise[]>();

    private weightExercises: WeightExercise[];

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