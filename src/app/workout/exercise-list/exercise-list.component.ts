import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Exercise } from 'src/app/models/exercise.model';
import { ExerciseService } from 'src/app/services/exercise.service';

@Component({
  selector: 'app-exercise-list',
  templateUrl: './exercise-list.component.html',
  styleUrls: ['./exercise-list.component.css']
})
export class ExerciseListComponent implements OnInit {
  exercises: Exercise[];
  subscription: Subscription

  constructor(private exerciseService: ExerciseService,  private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
   this.subscription = this.exerciseService.changedExercises.subscribe(
      (exercises: Exercise[]) => {
        this.exercises = exercises;
      }
    )
    this.exercises = this.exerciseService.getExercises();
  }

  AddNewExercise(){
    this.router.navigate(['new'], {relativeTo: this.route});
  }
  

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
