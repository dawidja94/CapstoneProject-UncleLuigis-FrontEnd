export default interface IReservationDetailState {
    customerLoggedIn: boolean,
    reservationId: number,
    reservation: any;   
    showLoginModal: boolean;
    showContinueWithActionModal: boolean;
    showCancelReservationModal: boolean;
    redirectToReservationList: boolean;
}