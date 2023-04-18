import { Injectable } from "@angular/core";
import { Exercise } from "../models/exercise.model";
import { Subject } from 'rxjs/Subject';

@Injectable()
export class ExerciseService{
    startedEditing = new Subject<number>();
    changedExercises = new Subject<Exercise[]>();

    private exercises: Exercise[] = [ 
    new Exercise('bulgarian leg squat','leg exercise',
    'https://cdn-0.weighttraining.guide/wp-content/uploads/2017/02/Barbell-Bulgarian-Split-Squat-resized-fixed.png?ezimgfmt=ng%3Awebp%2Fngcb4'),
    new Exercise('Dips','Chest Exercise',
     'https://s3.amazonaws.com/prod.skimble/assets/2576513/image_iphone.jpg'),
    new Exercise('Pull-Up','Back Exercise',
    'https://cdn-0.weighttraining.guide/wp-content/uploads/2016/10/pull-up-2-resized.png?ezimgfmt=ng%3Awebp%2Fngcb4'),
    new Exercise('Dragon Flag', 'abs Exercise',
     'https://fitnessprogramer.com/wp-content/uploads/2022/07/Leg-Raise-Dragon-Flag.gif')
    ]

    setExercises(updateExercises: Exercise[]){
        this.exercises = updateExercises;
        this.changedExercises.next(this.exercises.slice());
    }

    getExercises(){
        return this.exercises.slice();
    }
    getExercise(index: number){
        return this.exercises[index];
    }

    addExercise(newExercise: Exercise){
        this.exercises.push(newExercise);
        this.changedExercises.next(this.exercises.slice());

    }
    updateExercises(index: number, newExercise: Exercise){
        this.exercises[index] = newExercise
        this.changedExercises.next(this.exercises.slice());
    }

    deleteExercise(index: number){
        this.exercises.splice(index,1);
        this.changedExercises.next(this.exercises.slice());
    }
        
    }


