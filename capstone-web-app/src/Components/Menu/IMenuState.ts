import Food from "../../Models/Food";
import Beverage from "../../Models/Beverage";

export default interface IMenuState {
    foodItems: Food[];
    beverageItems: Beverage[];
}