import React from "react";
import Navbar from "../Navigation/Navbar";
import ConstantStrings from "../../Constants/ConstantStrings";
import ILoginProps from "../UserProfile/IUserProfileProps";
import Footer from "../Footer/Footer";
import TokenService from "../../Services/TokenService";
import MenuService from "../../Services/MenuService";
import IForgetPasswordProps from "./IForgetPasswordProps";
import ICustomerRegistrationState from "../CustomerRegistration/ICustomerRegistrationState";
import IForgetPasswordState from "./IForgetPasswordState";


export default class ForgetPassword extends React.Component<IForgetPasswordProps, IForgetPasswordState> {
    constructor(props: any) {
        super(props);

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
            validationMessages: []
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
                                    <h3 className="card-header text-center font-weight-bold"  >Forget Password</h3>
                                    <div className="card-margin">
                                        <div className="form-group required">
                                            <label className="font-weight-bold">User Name:</label>
                                            <input type="text" className="form-control" placeholder="First Name" id="name"></input>
                                        </div>
                                        <div className="form-group required">
                                            <label className="font-weight-bold">Phone:</label>
                                            <input type="text" className="form-control"  placeholder="Phone" id="tel"></input>
                                        </div>
                                        <div className="form-group required">
                                            <label className="font-weight-bold">Email:</label>
                                            <input type="email"  className="form-control" placeholder="Email" id="email" ></input>
                                        </div>
                                        <div className="form-group required">
                                            <label className="font-weight-bold">New Password:</label>
                                            <input type="password" className="form-control" placeholder="New Password" id="pswd"></input>
                                        </div>
                                        <div className="form-group required">
                                            <label className="font-weight-bold">Confirm Password:</label>
                                            <input type="password" className="form-control" placeholder="Confirm Password" id="pswd"></input>
                                        </div>
                                        <button type="button" className="btn btn-outline-danger">Continue</button>
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
                <Footer />
            </div>
        )
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

        if (this.state.userName === emptyString){
            valid = false;
            messages.push(this.state.emptyField)
             
            this.setState({
                validationMessages: messages
            });
        }
        if (this.state.email === emptyString){
            valid = false;
            messages.push(this.state.emptyField)
             
            this.setState({
                validationMessages: messages
            });
        }
        if (this.state.phoneNumber === emptyString){
            valid = false;
            messages.push(this.state.emptyField)
             
            this.setState({
                validationMessages: messages
            });
        }
        if (this.state.password.length < 6 ){
            valid = false;
            messages.push(this.state.passwordTooShortError)
             
            this.setState({
                validationMessages: messages
            });
        }

        if (this.state.confirmPassword !== this.state.password){
            valid = false;
            messages.push(this.state.passwordsNotMatching)
             
            this.setState({
                validationMessages: messages
            });
        }
        console.log("Valid" + valid);

        this.setState({
            isFormValid: valid,
            showValidationModal: true
        }, () => {

            console.log("we got here");
            if (this.state.isFormValid){
                const requestBody = {
                    userName: this.state.userName,
                    email: this.state.email,
                    phoneNumber: this.state.phoneNumber,
                    password: this.state.password,
                    confirmPassword: this.state.confirmPassword
                };

                //Call to API
                fetch(`${ConstantStrings.baseAzureURL}User/ForgetPassword`, {
                    method: "POST",
                    body: JSON.stringify(requestBody),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                //response taken from API call
                .then(response => {
                    console.log(response.status);
                    //found matching account, password is changed
                    if(response.status === 200){

                        return response.json();
                    }
                    else if (response.status === 400) {
                        //no matching data found, display modal with error
                        console.log(response.status)
                    }
                })
                .then(data => {

                    console.log(data);
                    this.setState({

                    })

                })
            }
            else {

            }


        })
    }
}
