export default interface IMenuProps {
    foodItems: Promise<any>;
    beverageItems: Promise<any>;
    addItem(item: any, quantity: number, type: string): any;
}