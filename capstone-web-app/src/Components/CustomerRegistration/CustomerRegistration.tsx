import React from "react";
import ICustomerRegistrationProps from "./ICustomerRegistrationProps";
import ICustomerRegistrationState from "./ICustomerRegistrationState";
import Navbar from "../Navigation/Navbar";
import ConstantStrings from "../../Constants/ConstantStrings";
import { Redirect } from "react-router-dom";
import Modal from 'react-bootstrap/Modal'
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
            showModal: false
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
                                        <div className="form-group">
                                            <label className="font-weight-bold">First Name:</label>
                                            <input type="text" className="form-control" placeholder="First Name" id="name" value={this.state.firstName} onChange={(e) => this.firstNameOnChange(e)}></input>
                                        </div>
                                        <div className="form-group">
                                            <label className="font-weight-bold">Last Name:</label>
                                            <input type="text" className="form-control" placeholder="Last Name" id="name" value={this.state.lastName}onChange={(e) => this.lastNameOnChange(e)}></input>
                                        </div>
                                        <div className="form-group">
                                            <label className="font-weight-bold">Email:</label>
                                            <input type="email" className="form-control" placeholder="Email" id="email" value={this.state.email}onChange={(e) => this.emailOnChange(e)}></input>
                                        </div>
                                        <div className="form-group">
                                            <label className="font-weight-bold">Phone:</label>
                                            <input type="tel" className="form-control"  placeholder="Phone" id="tel" value={this.state.phoneNumber}onChange={(e) => this.phoneNumberChange(e)}></input>
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
                {this.state.isFormValid ? <div></div> : <CustomModal {...this.props} title={"Warning"} body={"Yes"} buttontitle={"Ok"} show={this.state.showModal} onCloseModal={this.closeModal} />}
                {this.state.navigateToNextScreen ? <Redirect to={{pathname: `/UserProfile/${this.state.createdCustomerId}`, state: {id: this.state.createdCustomerId}}}/> : <div></div>}
                <Footer />
            </div>
        )
    }

    private closeModal = () => {
        this.setState({
            showModal: false
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

        console.log("Deadass");
        let valid: boolean = true;
        //let response: any;
        let regEx = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        // Create another regEx to check for the phone number make it a specific format
        // maybe: (630)-343-3434 something like that????

        if (!regEx.test(this.state.email)) {
            valid = false;
        }
        else {
            valid = true;
        }
        
        console.log("Valid: " + valid);

        this.setState({
            isFormValid: valid,
            showModal: true
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
