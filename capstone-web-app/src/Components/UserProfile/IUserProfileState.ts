export default interface IUserProfileState {
    userName: string;
    password: string;
    isFormValid: boolean;
    confirmPassword: string;
    customerId: number;
    navigateToHomeScreen: boolean;
}