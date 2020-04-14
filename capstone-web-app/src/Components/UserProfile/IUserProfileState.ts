export default interface IUserProfileState {
    userName: string;
    password: string;
    confirmPassword: string;
    customerId: number;
    navigateToHomeScreen: boolean;
    passwordTooShortError: string;
    passwordsNotMatching: string;
    userNameTooShort: string;
    userExistsError: string;
    useListOption: boolean;
    validationMessages: string[];
    showValidationModal: boolean;
    showCustomerExistsModal: boolean;
    isFormValid: boolean,
    accountExists: string;    
}