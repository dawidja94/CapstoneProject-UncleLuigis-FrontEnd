export default interface ILoginModalState {
    hidden: boolean;
    userName: string;
    password: string;
    showMessageModal: boolean;
    messageTitle: string;
    messageBody: string;
    isUserValid: boolean;
    show: boolean;
}