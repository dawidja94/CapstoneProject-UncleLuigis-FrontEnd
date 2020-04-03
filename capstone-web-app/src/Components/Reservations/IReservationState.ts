export default interface IReservationsState {
    availableTables: any[];
    selectedTableSize: string;
    selectedTimeSlot: string;
    showSpinner: boolean;
    showLoginModal: boolean;
    showReserveModal: boolean;
    modalHeader: string;
    modalBodyMessage: string;
    reserveModalHeader: string;
    reserveModalMessage: string;
}