import Food from "../../Models/Food";
import Beverage from "../../Models/Beverage";

export default interface ICarryOutState {
    foodCartItems: Food[];
    beverageCartItems: Beverage[];
    cartItems: any[];
    foodAndBeverageCartItemsLoaded: boolean;
    customerLoggedIn: boolean;
    showSpinner: boolean;
}