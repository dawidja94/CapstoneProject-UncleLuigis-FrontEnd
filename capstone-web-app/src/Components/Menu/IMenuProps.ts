export default interface IMenuProps {
    cartItemCount: number;
    foodItems: Promise<any>;
    beverageItems: Promise<any>;
    countUp(message: string): void;
    addItem(item: any, quantity: number, type: string): void;
}