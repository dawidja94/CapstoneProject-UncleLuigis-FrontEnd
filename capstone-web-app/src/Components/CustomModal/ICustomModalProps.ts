export default interface ICustomModalProps {
    title: string;
    body: string;
    buttontitle: string;
    show: boolean;
    showLoginButton: boolean;
    useListOption: boolean;
    listMessages: string [];
    onCloseModal: () => void;
}