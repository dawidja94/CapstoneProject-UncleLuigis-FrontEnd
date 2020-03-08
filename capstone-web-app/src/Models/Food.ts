export default class Food {
    food: any;
    quantity: number;
    type: string;

    constructor(food: any, quantity: number) {
        this.food = food;
        this.quantity = quantity;
        this.type = "food";
    }
}