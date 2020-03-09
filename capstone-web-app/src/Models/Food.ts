export default class Food {
    food: any;
    quantity: number;
    type: string;
    carryOutRecordId: number;

    constructor(food: any, quantity: number, id: number) {
        this.food = food;
        this.quantity = quantity;
        this.type = "food";
        this.carryOutRecordId = id;
    }
}