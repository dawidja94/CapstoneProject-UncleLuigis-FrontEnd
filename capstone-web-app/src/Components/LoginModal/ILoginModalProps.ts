export default interface ILoginModalProps {
    show: boolean;
    onCloseModal: () => void;
    loginIsSuccessful: () => void;
}