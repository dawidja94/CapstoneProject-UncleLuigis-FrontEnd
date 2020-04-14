import React from "react";
import Navbar from "../Navigation/Navbar";
import Footer from "../Footer/Footer";
import IChangePasswordProps from "./IChangePasswordProps";
import IChangePasswordState from "./IChangePasswordState";
import CustomModal from "../CustomModal/CustomModal";
import { Redirect } from "react-router-dom";
import UserService from "../../Services/UserService";

export default class ChangePassword extends React.Component<IChangePasswordProps, IChangePasswordState> {
    private userService: UserService;

    constructor(props: any) {
        super(props);
        document.title = "Uncle Luigi's Bistro - Change Password";
        this.state = {
            userName: "",
            password: "",
            confirmPassword: "",
            newPassword: "",
            newConfirmPassword: "",
            isFormValid: true,
            showValidationModal: true,
            emptyField: "One or more required fields are empty, please review your form.",
            passwordTooShortError: "Password must be at least 6 characters.",
            passwordsNotMatching: "Confirmed password did not match current password",
            newPasswordsNotMatching: "Confirmed password did not match new password.",
            validationMessages: [],
            showSuccessModal: false,
            navigateToHome: false,
            showErrorModal: false,
            showLoginModal: false
        };

        this.userService = new UserService();
    }

    public componentDidMount() {
        const loggedIn = localStorage.getItem("Customer ID") ? true : false;        

        if (!loggedIn) {
            this.setState({
                navigateToHome: true
            });
        }
    }

    public render() {
        return (
            <div>
                <Navbar />
                <div id="registrationScreenBackground">
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <div className="container">
                        <div className="row">
                            <div className="col-1"></div>
                            <div className="col-10">
                                <div className="card login-custom">
                                    <h3 className="card-header text-center font-weight-bold">Change Password</h3>
                                    <div className="card-margin">
                                        <div className="form-group required">
                                            <label className="font-weight-bold">Username:</label>
                                            <input type="text" className="form-control" placeholder="Username" id="name" value={this.state.userName}onChange={(e) => this.userNameOnChange(e)}></input>
                                        </div>
                                        <div className="form-group required">
                                            <label className="font-weight-bold">Current Password:</label>
                                            <input type="password" className="form-control" placeholder="Current Password" id="pswd"value={this.state.password}onChange={(e) => this.passwordOnChange(e)}></input>
                                        </div>
                                        <div className="form-group required">
                                            <label className="font-weight-bold">Confirm Current Password:</label>
                                            <input type="password" className="form-control" placeholder="Confirm Current Password" id="pswd" value={this.state.confirmPassword}onChange={(e) => this.confirmPasswordOnChange(e)}></input>
                                        </div>
                                        <div className="form-group required">
                                            <label className="font-weight-bold">New Password:</label>
                                            <input type="password" className="form-control" placeholder="New Password" id="pswd" value={this.state.newPassword}onChange={(e) => this.newPasswordOnChange(e)}></input>
                                        </div>
                                        <div className="form-group required">
                                            <label className="font-weight-bold">Confirm New Password:</label>
                                            <input type="password" className="form-control" placeholder="Confirm New Password" id="pswd"value={this.state.newConfirmPassword}onChange={(e) => this.newConfirmPasswordOnChange(e)}></input>
                                        </div>
                                        <button type="button" onClick={() => this.onFormSubmit()} className="btn btn-outline-danger">Submit</button>
                                        <br />
                                        <small className="text-muted">Required fields.</small>
                                    </div>
                                </div>
                            </div>
                            <div className="col-1"></div>
                        </div>
                    </div>
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                </div>
                {this.state.isFormValid ? <div></div> : <CustomModal {...this.props} showLoginButton={false} title={"Warning"} body={"Yes"} buttontitle={"Ok"} show={this.state.showValidationModal} onCloseModal={this.closeValidationModal} useListOption={true} listMessages={this.state.validationMessages} />}
                {!this.state.showSuccessModal ? <div></div> : <CustomModal {...this.props} showLoginButton={false} title={"Success"} body={"Password changed successfully!"} buttontitle={"Home"} show={this.state.showSuccessModal} onCloseModal={this.closeSuccessModal} useListOption={false} listMessages={[]} />}
                {!this.state.showErrorModal ? <div></div> : <CustomModal {...this.props} showLoginButton={false} title={"Error"} body={"Could not find matching account, please try again."} buttontitle={"Ok"} show={this.state.showErrorModal} onCloseModal={this.closeErrorModal} useListOption={false} listMessages={[]} />}
                {this.state.navigateToHome ? <Redirect push to={{pathname: `/`}}/> : <div></div>}
                <Footer />
            </div>
        )
    }

    private closeSuccessModal = () => {

        this.setState({
            showSuccessModal: false,
            navigateToHome: true,
        })
    }

    private closeErrorModal = () => {

        this.setState({
            showErrorModal: false,
            
        })
    }

    private closeValidationModal = () => {
        this.setState({
            showValidationModal: false,
            
        });
    }
    private userNameOnChange(event:any): void{
        this.setState({
            userName: event.target.value
        });
    }

    private passwordOnChange(event: any): void {
        this.setState({
            password: event.target.value
        });
    }
    private confirmPasswordOnChange(event: any): void {
        this.setState({
            confirmPassword: event.target.value
        });
    }

    private newPasswordOnChange(event: any): void {
        this.setState({
            newPassword: event.target.value
        });
    }
    private newConfirmPasswordOnChange(event: any): void {
        this.setState({
            newConfirmPassword: event.target.value
        });
    }

    private onFormSubmit(): void {
        let messages: string[] = [];
        let valid: boolean = true;
        let emptyString = "";

        if (this.state.userName === emptyString){
            valid = false;
            messages.push(this.state.emptyField)
             
            this.setState({
                validationMessages: messages,
            });
        }

        if (this.state.password  === emptyString ){
            valid = false;
            messages.push(this.state.emptyField)
             
            this.setState({
                validationMessages: messages,  
            });
        }

        if (this.state.newPassword.length < 6 ){
            valid = false;
            messages.push(this.state.passwordTooShortError)
             
            this.setState({
                validationMessages: messages,  
            });
        }
        if (this.state.confirmPassword !== this.state.password){
            valid = false;
            messages.push(this.state.passwordsNotMatching)

            this.setState({
                validationMessages: messages,
            });
        }
        if (this.state.newConfirmPassword !== this.state.newPassword){
            valid = false;
            messages.push(this.state.newPasswordsNotMatching)

            this.setState({
                validationMessages: messages,
            });
        }

        this.setState({
            isFormValid: valid,
            showValidationModal: true,
        }, () => {

            if (this.state.isFormValid){
                const requestBody = {
                    userName: this.state.userName,
                    password: this.state.password,
                    confirmPassword: this.state.confirmPassword,
                    newPassword: this.state.newPassword,
                    confirmNewPassword: this.state.newConfirmPassword
                };

                this.userService.changePassword(requestBody)
                .then(response => {
                    if (response) {
                        this.setState({
                            showSuccessModal: true,
                        });
                    }
                })
                .catch(reason => {
                    this.setState({
                        showErrorModal: true,
                    });
                });
            }
            
        })
    }
}
