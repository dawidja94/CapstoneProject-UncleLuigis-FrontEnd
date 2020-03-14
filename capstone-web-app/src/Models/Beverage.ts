export default class Beverage {
    beverage: any;
    quantity: number;
    type: string;
    carryOutRecordId: number;

    constructor(beverage: any, quantity: number, id: number) {
        this.beverage = beverage;
        this.quantity = quantity;
        this.type = "beverage";
        this.carryOutRecordId = id;
    }
}