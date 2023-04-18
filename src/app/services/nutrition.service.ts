import { Injectable } from "@angular/core";
import { Subject } from "rxjs/Subject";
import { Ingredient } from "../models/ingredient.model";

Injectable()
export class NutritionService{
    ingredientsChanged = new Subject<Ingredient[]>();
    editNutritionList = new Subject<Boolean>();
    indexNutritionList = new Subject<number>();

    private ingredients:  Ingredient[] = [
        new Ingredient ('Eggs', 3),
        new Ingredient ('Broccolie', 1)
    ];


        getIngredients(){
            return this.ingredients.slice();
        }

        addIngredient(newIngredient: Ingredient){
            this.ingredients.push(newIngredient);
            this.ingredientsChanged.next(this.ingredients.slice());
        }

        deleteIngredient(index: number){
            this.ingredients.splice(index,1);
            this.ingredientsChanged.next(this.ingredients.slice());
        }



    }