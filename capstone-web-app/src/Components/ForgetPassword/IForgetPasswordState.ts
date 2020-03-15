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
    
}