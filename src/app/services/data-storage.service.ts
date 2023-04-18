import { HttpClient, HttpClientModule, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ExerciseService } from "./exercise.service";
import { Exercise } from "../models/exercise.model";
import { AuthService } from "../auth/auth.component/auth.service";
import { exhaustMap, take } from "rxjs/operators";

@Injectable({providedIn: 'root'})
export class DataStorageService {
    constructor(private http: HttpClient, private exerciseService: ExerciseService,
        private authService: AuthService) {}

    storeExercises() {
        const exercises = this.exerciseService.getExercises();
        this.http.put('https://ng-complete-guide-69f20-default-rtdb.europe-west1.firebasedatabase.app/exercises.json',
         exercises).subscribe(response => {
            console.log(response)
        })
    }

    fetchExercises(){
        this.authService.user.pipe(take(1), exhaustMap(user => {
            return  this.http.get<Exercise[]>('https://ng-complete-guide-69f20-default-rtdb.europe-west1.firebasedatabase.app/exercises.json'
            );
        })).subscribe( exercises => {
            this.exerciseService.setExercises(exercises)
        })
    }



}