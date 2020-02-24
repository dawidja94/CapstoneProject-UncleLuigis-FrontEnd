export default interface IMenuProps {
    foodItems: Promise<any>;
    beverageItems: Promise<any>;
    countUp(message: string): void;
}