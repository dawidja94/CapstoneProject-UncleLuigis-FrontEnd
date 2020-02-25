export default interface ICustomerRegistrationState {
    createdCustomerId: number;
    firstName: string;
    lastName:  string;
    email:     string;
    phoneNumber: string;
    isFormValid: boolean;
    navigateToNextScreen: boolean;
    showModal: boolean;
}