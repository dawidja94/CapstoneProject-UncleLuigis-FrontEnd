export default interface IOrderConfirmationModalProps {
    title: string;
    body: string;
    buttontitle: string;
    show: boolean;
    showSubmitOrderButton: boolean;
    showRemoveItemButton: boolean;
    onSubmitOrderClick: () => void;
    onRemoveItemClick: () => void;
    onCloseModal: () => void;
}