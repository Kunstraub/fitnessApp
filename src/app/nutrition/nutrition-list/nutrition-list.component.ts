import { Component, OnInit } from '@angular/core';
import { Ingredient } from 'src/app/models/ingredient.model';
import { NutritionService } from 'src/app/services/nutrition.service';

@Component({
  selector: 'app-nutrition-list',
  templateUrl: './nutrition-list.component.html',
  styleUrls: ['./nutrition-list.component.css']
})
export class NutritionListComponent implements OnInit {
  ingredients:  Ingredient[]
  constructor(private nutritionService: NutritionService) { }

  ngOnInit(): void {
    this.ingredients = this.nutritionService.getIngredients();
    this.nutritionService.ingredientsChanged.subscribe(
      (ingredients: Ingredient[]) => {
        this.ingredients = ingredients;
      }
    )
  }

  editNutritionList(index: number){
    this.nutritionService.indexNutritionList.next(index);
  }

}
