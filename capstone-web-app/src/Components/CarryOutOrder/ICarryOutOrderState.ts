import Food from "../../Models/Food";
import Beverage from "../../Models/Beverage";

export default interface ICarryOutOrderState {
    orderItems: any[],
    customerLoggedIn: boolean,
    foodOrderItems: Food[];
    beverageOrderItems: Beverage[];
    showViewOrdersModal: boolean;
    redirectToOrderList: boolean;
}