export default class Beverage {
    beverage: any;
    quantity: number;
    type: string;

    constructor(beverage: any, quantity: number) {
        this.beverage = beverage;
        this.quantity = quantity;
        this.type = "beverage";
    }
}