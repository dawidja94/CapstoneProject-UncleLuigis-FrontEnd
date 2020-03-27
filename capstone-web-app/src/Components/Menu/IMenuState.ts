import Food from "../../Models/Food";
import Beverage from "../../Models/Beverage";

export default interface IMenuState {
    foodItems: Food[];
    beverageItems: Beverage[];
    showLoginModal: boolean;
    showAddtoCartModal: boolean;
    modalBodyMessage: string;
    modelHeader: string;
}