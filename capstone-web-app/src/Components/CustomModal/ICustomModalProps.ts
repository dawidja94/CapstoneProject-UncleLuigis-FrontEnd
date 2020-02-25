export default interface ICustomModalProps {
    title: string;
    body: string;
    buttontitle: string;
    show: boolean;
    onCloseModal: () => void;
}