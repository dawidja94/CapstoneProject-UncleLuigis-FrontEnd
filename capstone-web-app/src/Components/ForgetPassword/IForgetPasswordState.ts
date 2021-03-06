export default interface IForgetPasswordState {
    userName: string,
    email: string,
    phoneNumber: string,
    password: string,
    confirmPassword: string,
    foundCustomerId: number,
    isFormValid: boolean,
    showValidationModal: boolean,
    emptyField: string,
    passwordTooShortError: string;
    passwordsNotMatching: string;
    noMatchingAccount: string;
    validationMessages: string[];
    invalidEmail: string;
    invalidPhoneNumber: string;
    showSuccessModal: boolean;
    navigateToHome: boolean;
    showErrorModal: boolean;
}