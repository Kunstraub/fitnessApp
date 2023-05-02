import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ExerciseComponent } from "./exercise/exercise.component";
import { NutritionComponent } from "./nutrition/nutrition.component";
import { ProgressComponent } from "./progress/progress.component";
import { UserComponent } from "./user/user.component";
import { ExerciseDetailComponent } from "./workout/exercise-list/exercise-item/exercise-detail/exercise-detail.component";
import { ExerciseEditComponent } from "./workout/exercise-list/exercise-item/exercise-detail/exercise-edit/exercise-edit.component";
import { WorkoutComponent } from "./workout/workout.component";
import { AuthComponentComponent } from "./auth/auth.component/auth.component.component";
import { AuthGuard } from "./auth/auth.guard";

const appRoutes: Routes = [
    { path: 'auth', component: AuthComponentComponent},
    { path: 'user', component: UserComponent,  },
    { path: 'exercise', component: ExerciseComponent },
    {path: 'workout', component: WorkoutComponent, canActivate:[AuthGuard], children: [
      {path: 'new', component: ExerciseEditComponent},
      {path: ':id', component: ExerciseDetailComponent},
      {path: ':id/edit', component: ExerciseEditComponent}
    ]},
    {path: 'progress', component: ProgressComponent},
    {path: 'nutrition', component: NutritionComponent}
  ];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})

export class AppRoutingModule{

}