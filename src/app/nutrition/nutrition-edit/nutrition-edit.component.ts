import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Ingredient } from 'src/app/models/ingredient.model';
import { NutritionService } from 'src/app/services/nutrition.service';

@Component({
  selector: 'app-nutrition-edit',
  templateUrl: './nutrition-edit.component.html',
  styleUrls: ['./nutrition-edit.component.css']
})
export class NutritionEditComponent implements OnInit {
  @ViewChild('f', {static:false}) nutForm: NgForm;
  index: number;

  constructor(private nutService: NutritionService) { }

  ngOnInit(): void {
    this.nutService.indexNutritionList.subscribe(index => {
      this.index = index
    }

    )
  }

  onSubmit(form: NgForm){
    let newIngedient = new Ingredient(
      form.value.name, form.value.amount
    )
    this.nutService.addIngredient(newIngedient);
    form.reset();
  }

  deleteIngredient(){
    this.nutService.deleteIngredient(this.index);
  }

}
