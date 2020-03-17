export default interface IChangePasswordState
{
    userName: string,
    password: string,
    confirmPassword: string,
    newPassword: string,
    newConfirmPassword: string,
    isFormValid: boolean,
    showValidationModal: boolean,
    emptyField: string,
    passwordTooShortError: string;
    passwordsNotMatching: string;
    validationMessages: string[];
    showSuccessModal: boolean;
    navigateToHome: boolean;
    showErrorModal: boolean;
    newPasswordsNotMatching: string;
    showLoginModal: boolean;
    
}