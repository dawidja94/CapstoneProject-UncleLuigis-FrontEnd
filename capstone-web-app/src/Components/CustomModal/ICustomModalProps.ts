export default interface ICustomModalProps {
    title: string;
    body: string;
    buttontitle: string;
    show: boolean;
    showLoginButton: boolean;
    onCloseModal: () => void;
}