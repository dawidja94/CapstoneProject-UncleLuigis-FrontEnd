/* eslint-disable */
import React from "react";
import Navbar from "../Navigation/Navbar";
import ConstantStrings from "../../Constants/ConstantStrings";
import Footer from "../Footer/Footer";
import IForgetPasswordProps from "./IForgetPasswordProps";
import IForgetPasswordState from "./IForgetPasswordState";
import CustomModal from "../CustomModal/CustomModal";
import { Redirect } from "react-router-dom";


export default class ForgetPassword extends React.Component<IForgetPasswordProps, IForgetPasswordState> {
    constructor(props: any) {
        super(props);
        document.title = "Uncle Luigi's Bistro - Forget Password";
        this.state = {
            
            userName: "",
            email: "",
            phoneNumber: "",
            password: "",
            confirmPassword: "",
            foundCustomerId: 0,
            isFormValid: true,
            showValidationModal: false,
            emptyField: "One or more required fields are empty, please review your form.",
            passwordTooShortError: "Password must be at least 6 characters.",
            passwordsNotMatching: "Confirmed password did not match new password.",
            noMatchingAccount: "No matching account has been found, please review your form.",
            invalidEmail: "Invalid email format. Please use email@domain.com format.",
            invalidPhoneNumber: "Invalid phone number format. Please use US phone number format (ex. 630-123-1234).",
            validationMessages: [],
            showSuccessModal: false,
            navigateToHome: false,
            showErrorModal: false,
        };
    }

    public componentDidMount() {
        
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
                                    <h3 className="card-header text-center font-weight-bold">Forget Password</h3>
                                    <div className="card-margin">
                                        <div className="form-group required">
                                            <label className="font-weight-bold">Username:</label>
                                            <input type="text" className="form-control" placeholder="Username" id="name"value={this.state.userName}onChange={(e) => this.userNameOnChange(e)}></input>
                                        </div>
                                        <div className="form-group required">
                                            <label className="font-weight-bold">Phone:</label>
                                            <input type="text" className="form-control"  placeholder="Phone" id="tel" value={this.state.phoneNumber}onChange={(e) => this.phoneNumberOnChange(e)}></input>
                                        </div>
                                        <div className="form-group required">
                                            <label className="font-weight-bold">Email:</label>
                                            <input type="email"  className="form-control" placeholder="Email" id="email" value={this.state.email}onChange={(e) => this.emailOnChange(e)}></input>
                                        </div>
                                        <div className="form-group required">
                                            <label className="font-weight-bold">New Password:</label>
                                            <input type="password" className="form-control" placeholder="New Password" id="pswd"value={this.state.password}onChange={(e) => this.newPasswordOnChange(e)}></input>
                                        </div>
                                        <div className="form-group required">
                                            <label className="font-weight-bold">Confirm Password:</label>
                                            <input type="password" className="form-control" placeholder="Confirm Password" id="pswd" value={this.state.confirmPassword}onChange={(e) => this.confirmPasswordOnChange(e)}></input>
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
                {!this.state.showSuccessModal ? <div></div> : <CustomModal {...this.props} showLoginButton={true} title={"Success"} body={"Password changed successfully! Click Login button to login with new password."} buttontitle={"Home"} show={this.state.showSuccessModal} onCloseModal={this.closeSuccessModal} useListOption={false} listMessages={[]} />}
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
    private emailOnChange(event: any): void {
        this.setState({
            email: event.target.value
        });
    }
    private phoneNumberOnChange(event: any): void {
        this.setState({
            phoneNumber: event.target.value
        });
    }
    private newPasswordOnChange(event: any): void {
        this.setState({
            password: event.target.value
        });
    }
    private confirmPasswordOnChange(event: any): void {
        this.setState({
            confirmPassword: event.target.value
        });
    }

    private onFormSubmit(): void {
        let messages: string[] = [];
        let valid: boolean = true;
        let emptyString = "";
        let regExEmail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        // Create another regEx to check for the phone number make it a specific format
        // Example: 630-343-3434.
        let regExPhone = /^[2-9]\d{2}-\d{3}-\d{4}$/;

        if (this.state.userName === emptyString){
            valid = false;
            messages.push(this.state.emptyField)
             
            this.setState({
                validationMessages: messages,
                
            });
        }
        if (this.state.email === emptyString){
            valid = false;
            messages.push(this.state.emptyField)
             
            this.setState({
                validationMessages: messages,
                
            });
        }
        if (this.state.phoneNumber === emptyString){
            valid = false;
            messages.push(this.state.emptyField)
             
            this.setState({
                validationMessages: messages,
                
            });
        }
        if (this.state.password.length < 6 ){
            valid = false;
            messages.push(this.state.passwordTooShortError)
             
            this.setState({
                validationMessages: messages,  
            });
        }
        if (!regExEmail.test(this.state.email)) {
            valid = false;
            messages.push(this.state.invalidEmail);

            this.setState({
                validationMessages: messages,  
            });
        }
        if (!regExPhone.test(this.state.phoneNumber)){
            valid = false;
            messages.push(this.state.invalidPhoneNumber);

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

        this.setState({
            isFormValid: valid,
            showValidationModal: true,
        }, () => {
            if (this.state.isFormValid){
                const requestBody = {
                    userName: this.state.userName,
                    emailAddress: this.state.email,
                    phoneNumber: this.state.phoneNumber,
                    newPassword: this.state.password,
                    confirmNewPassword: this.state.confirmPassword
                };
                //Call to API
                fetch(`${ConstantStrings.baseAzureURL}User/ForgetPassword`, {
                    method: "PUT",
                    body: JSON.stringify(requestBody),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                //response taken from API call
                .then(response => {
                    //found matching account, password is changed
                    if(response.status === 200){
                        this.setState({
                            showSuccessModal: true,
    
                        })
                        return response.json();   
                    }
                    else if (response.status === 404){
                        //no matching data found, display modal with error
                        this.setState({
                            showErrorModal: true,
                        })
                        return response.json();
                    }

                })
                
            }
            else {

            }


        })
    }
}
