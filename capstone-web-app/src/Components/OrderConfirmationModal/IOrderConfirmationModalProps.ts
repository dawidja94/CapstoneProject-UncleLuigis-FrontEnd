export default interface IOrderConfirmationModalProps {
    title: string;
    body: string;
    buttontitle: string;
    show: boolean;
    showSubmitOrderButton: boolean;
    onSubmitOrderClick: () => void;
    onCloseModal: () => void;
}