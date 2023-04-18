import { Component, OnInit, ViewChild } from '@angular/core';
import {  FormControl, FormGroup, NgForm } from '@angular/forms';
import { Exercise } from 'src/app/models/exercise.model';
import { ExerciseService } from 'src/app/services/exercise.service';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-exercise-edit',
  templateUrl: './exercise-edit.component.html',
  styleUrls: ['./exercise-edit.component.css']
})
export class ExerciseEditComponent implements OnInit {

  exerciseForm: FormGroup;
  subscription: Subscription;
  editMode = false;
  id: number;

  constructor(private exerciseService: ExerciseService,
    private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.editMode = params['id'] != null;
        this.initForm();
      }
    )
  }

  goBack(){
      this.router.navigate(['/../workout'], {relativeTo: this.route});
  }

  onSubmit(){
    // const exercise = new Exercise(
    //   this.exerciseForm.value['name'],
    //   this.exerciseForm.value['image-path'],
    //   this.exerciseForm.value['description']
    // )
   // console.log(this.exerciseForm)
   if(this.editMode){
    this.exerciseService.updateExercises(this.id,this.exerciseForm.value);
   }
   else{
    this.exerciseService.addExercise(this.exerciseForm.value)
   }
    
  

    }

  private initForm(){
    let exerciseName = '';
    let urlName = '';
    let description = '';
    if(this.editMode){
      const newExercise = this.exerciseService.getExercise(this.id);
      exerciseName = newExercise.name;
      urlName = newExercise.url;
      description = newExercise.description;
    }
    this.exerciseForm = new FormGroup({
      'name':  new FormControl(exerciseName),
      'url': new FormControl(urlName),
      'description': new FormControl(description)
    })


  }

}
