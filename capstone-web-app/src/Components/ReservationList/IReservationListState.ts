export default interface IReservationListState {
    reservationList: any [];
    customerLoggedIn: boolean;
    navigateToOrder: boolean;
    reservationId: number;
    redirectToLogin: boolean;
    currentPage: number;
    ordersPerPage: number;
    showSpinner: boolean;
    activeIndex: number;
}