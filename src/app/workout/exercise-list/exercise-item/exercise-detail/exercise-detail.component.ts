import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Exercise } from 'src/app/models/exercise.model';
import { ExerciseService } from 'src/app/services/exercise.service';

@Component({
  selector: 'app-exercise-detail',
  templateUrl: './exercise-detail.component.html',
  styleUrls: ['./exercise-detail.component.css']
})
export class ExerciseDetailComponent implements OnInit {
  exercise: Exercise;
  id: number;

  constructor(private exerciseService: ExerciseService, private route: ActivatedRoute,
    private router: Router) { }


  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id']
        this.exercise = this.exerciseService.getExercise(this.id);
      }
    )

    this.exerciseService.changedExercises.subscribe(
      (exercises: Exercise[]) => {
        this.exercise = exercises.slice(-1)[0]
      }
    )

  
  }

  onEditExercise(){
    this.router.navigate(['edit'], {relativeTo: this.route});
  }

  // onAddExercise(){
  //   this.router.navigate(['edit'], {relativeTo: this.route});
  // }

  onDeleteExercise(){
    this.exerciseService.deleteExercise(this.id);
  }

}
