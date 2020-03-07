export default interface ICustomerRegistrationState {
    createdCustomerId: number;
    foundCustomerId: number;
    firstName: string;
    lastName:  string;
    email:     string;
    phoneNumber: string;
    isFormValid: boolean;
    navigateToNextScreen: boolean;
    showValidationModal: boolean;
    showCustomerExistsModal: boolean;
}