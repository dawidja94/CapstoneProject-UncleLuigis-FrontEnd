import Food from "../../Models/Food";
import Beverage from "../../Models/Beverage";

export default interface ICarryOutState {
    foodCartItems: Food[];
    beverageCartItems: Beverage[];
    cartItems: any[];
    cartIdToRemove: number;
    foodAndBeverageCartItemsLoaded: boolean;
    customerLoggedIn: boolean;
    showSpinner: boolean;
    redirectToMenu: boolean;
    redirectToLogin: boolean;
    showSubmitOrderConfirmationModal: boolean;
    showThankYouModal: boolean;
    showRemoveItemModal: boolean;
    showContinueWithActionModal: boolean;
    showLoginModal: boolean;
}