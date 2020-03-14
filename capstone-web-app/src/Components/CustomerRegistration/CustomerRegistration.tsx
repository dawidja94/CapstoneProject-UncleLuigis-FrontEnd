import React from "react";
import ICustomerRegistrationProps from "./ICustomerRegistrationProps";
import ICustomerRegistrationState from "./ICustomerRegistrationState";
import Navbar from "../Navigation/Navbar";
import ConstantStrings from "../../Constants/ConstantStrings";
import { Redirect } from "react-router-dom";
import Modal from 'react-bootstrap/Modal';
import CustomModal from "../CustomModal/CustomModal";
import Footer from "../Footer/Footer";

export default class CustomerRegistration extends React.Component<ICustomerRegistrationProps, ICustomerRegistrationState> {
    constructor(props: any) {
        super(props);

        this.state = {
            firstName: "",
            lastName: "",
            email: "",
            phoneNumber: "",
            isFormValid: true,
            navigateToNextScreen: false,
            createdCustomerId: 0,
            foundCustomerId: 0,
            showValidationModal: false,
            showCustomerExistsModal: false,
            emptyFirstNameField: "First name field cannot be empty",
            emptyLastNameField: "Last name field cannot be empty",
            invalidEmail: "Invalid email format. Please use email@domain.com format.",
            invalidPhoneNumber: "Invalid phone number format. Please use 630-123-1234 format.",
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
                                    <h3 className="card-header text-center font-weight-bold"  >Customer Registration</h3>
                                    <div className="card-margin">
                                        <div className="form-group required">
                                            <label className="font-weight-bold">First Name:</label>
                                            <input type="text" className="form-control" placeholder="First Name" id="name" value={this.state.firstName} onChange={(e) => this.firstNameOnChange(e)}></input>
                                        </div>
                                        <div className="form-group required">
                                            <label className="font-weight-bold">Last Name:</label>
                                            <input type="text" className="form-control" placeholder="Last Name" id="name" value={this.state.lastName}onChange={(e) => this.lastNameOnChange(e)}></input>
                                        </div>
                                        <div className="form-group required">
                                            <label className="font-weight-bold">Email:</label>
                                            <input type="email"  className="form-control" placeholder="Email" id="email" value={this.state.email}onChange={(e) => this.emailOnChange(e)}></input>
                                        </div>
                                        <div className="form-group">
                                            <label className="font-weight-bold">Phone:</label>
                                            <input type="text" className="form-control"  placeholder="Phone" id="tel" value={this.state.phoneNumber}onChange={(e) => this.phoneNumberChange(e)}></input>
                                        </div>
                                        <button type="button" onClick={() => this.onFormSubmit()} className="btn btn-outline-danger">Continue</button>
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
                {this.state.navigateToNextScreen ? <Redirect to={{pathname: `/UserProfile/${this.state.createdCustomerId === 0 ? this.state.foundCustomerId : this.state.createdCustomerId}`, state: {id: this.state.createdCustomerId}}}/> : <div></div>}
                <Footer />
            </div>
        )
    }

    private closeValidationModal = () => {
        this.setState({
            showValidationModal: false
        });
    }

    private firstNameOnChange(event: any): void {
        this.setState({
            firstName: event.target.value
        });
    }
    private lastNameOnChange(event: any): void {
        this.setState({
            lastName: event.target.value
        });
    }
    private emailOnChange(event: any): void {
        this.setState({
            email: event.target.value
        });
    }
    private phoneNumberChange(event: any): void {
        this.setState({
            phoneNumber: event.target.value
        });
    }

    private onFormSubmit(): void {
        let messages: string[] = [];
        console.log("Deadass");
        let valid: boolean = true;
        //let response: any;
        let regExEmail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        // Create another regEx to check for the phone number make it a specific format
        // Example: 630-343-3434.
        let regExPhone = /^[2-9]\d{2}-\d{3}-\d{4}$/;
        let emptyString = ""

        if ( this.state.firstName === emptyString){
            valid = false;
            messages.push(this.state.emptyFirstNameField)
             
            this.setState({
                validationMessages: messages
            });
        }
        if ( this.state.lastName === emptyString){
            valid = false;
            messages.push(this.state.emptyLastNameField)
             
            this.setState({
                validationMessages: messages
            });
        }
        if (!regExEmail.test(this.state.email)) {
            valid = false;
            messages.push(this.state.invalidEmail);

            this.setState({
                validationMessages: messages
            });
        }
        if (!regExPhone.test(this.state.phoneNumber)){
            valid = false;
            messages.push(this.state.invalidPhoneNumber);

            this.setState({
                validationMessages: messages
            });
        }
        
        console.log("Valid: " + valid);

        this.setState({
            isFormValid: valid,
            showValidationModal: true

        }, () => {

            console.log("Hereerererere");
            if (this.state.isFormValid) {
                const requestBody = {
                    firstName: this.state.firstName,
                    lastName: this.state.lastName,
                    phoneNumber: this.state.phoneNumber
                };
                
                // Call to API would happen
                fetch(`${ConstantStrings.baseAzureURL}Customer/GetCustomer`, {
                    method: "POST",
                    body: JSON.stringify(requestBody),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                .then(response => {
                    console.log(response.status);

                    if (response.status === 200) {
                        // If customer exists, pop-up a modal on top of center of screen alerting the user about them already existing
                        // Grab this customer object and on the modal add a button to redirect them to the User Profile screen so that they set up a login
                        console.log("Inside 200 status");
                        console.log(response);

                        return response.json();
                    }
                    else if (response.status === 400) {
                        // Need to make a call to create the customer.
                        // Then store the customer object and pass to the next screen somehow.
                        const requestBodyCreate = {
                            firstName: this.state.firstName,
                            lastName: this.state.lastName,
                            dateOfBirth: new Date(),
                            phoneNumber: this.state.phoneNumber,
                            memberSince: new Date(),
                            email: this.state.email
                        };
                        
                        fetch(`${ConstantStrings.baseAzureURL}Customer/CreateCustomer`, {
                            method: "POST",
                            body: JSON.stringify(requestBodyCreate),
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        })
                        .then(response => {
                            console.log("Create Customer status:" + response.status);

                            // If it is 200, then it created the customer successfully. 
                            if (response.status === 200) {
                                
                                // Redirect at this point in time to the next screen and pass
                                // in the requestBodyCreate object (Customer) to that screen.
                                return response.json();
                                
                            }
                        })
                        .then(data => {

                            console.log(data);
                            this.setState({
                                navigateToNextScreen: true,
                                createdCustomerId: data.id
                            });
                        });
                    }
                })
                .then(data => {
                    // This is the block of .then for when the customer is found as an already existing customer in the Db.
                    console.log(data);
                    // fetch(`${ConstantStrings.baseAzureURL}Customer/GetCustomer`,{
                    //     method: "GET",
                    //     headers: {
                    //         'Content-Type': 'application/json'
                    //     }
                    // })
                    // .then((response: any) => {
                    //     return response.json();
                    // })
                    // .then(data =>{
                    //     console.log(data);

                    //     if (data.)
                    // })
                    
                    // Need another API call here. Because this customer exists. But we need to check if
                    // they already have an user profile or not.
                    // If they do not.... Then redirect them like below already coded.
                    // Else need to pop-up a modal saying, hey my guy you already have a user profile.
                    // Click ok and redirect to login screen..

                    // This part below is for when they do not have a user profile, so you send them to
                    // the next screen, the user profile screen!
                    this.setState({
                        foundCustomerId: data.id,
                        navigateToNextScreen: true
                    }, () => {
                        console.log("Checking this after setting the state when a customer was found.");
                        console.log(this.state);
                    });
                })
                .catch(reason => {
                    console.log("Error calling Customer/GetCustomer endpoint.");
                    console.log(reason);
                });
            }
            else {
                // Set the state, accordingly....
                // Let’s display (*) around the input form controls in red, and display a modal message alerting them about the problem
            }
         });

    }
}
