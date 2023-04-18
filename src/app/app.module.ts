import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { NutritionComponent } from './nutrition/nutrition.component';
import { ExerciseComponent } from './exercise/exercise.component';
import { WorkoutComponent } from './workout/workout.component';
import { ProgressComponent } from './progress/progress.component';
import { HeaderComponent } from './header/header.component';
import { AppRoutingModule } from './app-routing.module';
import { ExerciseListComponent } from './workout/exercise-list/exercise-list.component';
import { ExerciseItemComponent } from './workout/exercise-list/exercise-item/exercise-item.component';
import { ExerciseService } from './services/exercise.service';
import { ExerciseDetailComponent } from './workout/exercise-list/exercise-item/exercise-detail/exercise-detail.component';
import { DropdownDirective } from './directives/dropdown.directive';
import { ExerciseEditComponent } from './workout/exercise-list/exercise-item/exercise-detail/exercise-edit/exercise-edit.component';
import { NutritionListComponent } from './nutrition/nutrition-list/nutrition-list.component';
import { NutritionEditComponent } from './nutrition/nutrition-edit/nutrition-edit.component';
import { NutritionService } from './services/nutrition.service';
import { DataStorageService } from './services/data-storage.service';
import { AuthComponentComponent } from './auth/auth.component/auth.component.component';
import { AuthInterceptorService } from './interceptors/auth-interceptor.service';
import { AlertComponent } from './alert/alert.component';


@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    NutritionComponent,
    ExerciseComponent,
    WorkoutComponent,
    ProgressComponent,
    HeaderComponent,
    ExerciseListComponent,
    ExerciseItemComponent,
    ExerciseDetailComponent,
    DropdownDirective,
    ExerciseEditComponent,
    NutritionListComponent,
    NutritionEditComponent,
    AuthComponentComponent,
    AlertComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [ExerciseService, NutritionService, 
    { provide: HTTP_INTERCEPTORS, 
    useClass: AuthInterceptorService,
     multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
