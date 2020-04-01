
export default interface ICarryOutListState {
    orderList: any [];
    customerLoggedIn: boolean;
    navigateToOrder: boolean;
    orderNumber: number;
    redirectToLogin: boolean;
    currentPage: number;
    ordersPerPage: number;
    showSpinner: boolean;
    
}