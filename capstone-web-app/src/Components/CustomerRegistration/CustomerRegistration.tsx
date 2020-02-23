import React from "react";
import ICustomerRegistrationProps from "./ICustomerRegistrationProps";
import ICustomerRegistrationState from "./ICustomerRegistrationState";
import Navbar from "../Navbar";
import ConstantStrings from "../../Constants/ConstantStrings";

export default class CustomerRegistration extends React.Component<ICustomerRegistrationProps, ICustomerRegistrationState> {
    constructor(props: any) {
        super(props);

        this.state = {
            firstName: "",
            lastName: "",
            email: "",
            phoneNumber: "",
            isFormValid: false
        }
    }

    public componentDidMount() {
        
    }

    public render() {
        return (
            <div>
                <Navbar />
                <div>
                    <br />
                    <br />
                    <br />
                    <br />
                    <div className="container">
                        <div className="row">
                            <div className="col-1"></div>
                            <div className="col-10">
                                <div className="card">
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
                                            <input type="tel" className="form-control" placeholder="Phone" id="tel" value={this.state.phoneNumber}onChange={(e) => this.phoneNumberChange(e)}></input>
                                        </div>
                                        <button type="button" onClick={() => this.onFormSubmit()} className="btn btn-outline-danger">Continue</button>
                                    </div>
                                </div>
                            </div>
                            <div className="col-1"></div>
                        </div>
                    </div>
                </div>
            </div>
        )
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
        let response: any;
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
            isFormValid: valid
        }, () => {

            console.log("Hereerererere");
            if (this.state.isFormValid) {
                const requestBody = {
                    firstName: this.state.firstName,
                    lastName: this.state.lastName,
                    phoneNumber: this.state.phoneNumber
                };
                
                // Call to API would happen
                fetch(`${ConstantStrings.baseDevURL}Customer/GetCustomer`, {
                    method: "POST",
                    body: JSON.stringify(requestBody),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                .then(response => {
                    console.log(response.json());
                    console.log(response.status);

                    if (response.status === 200) {
                        
                    }
                    else if (response.status === 400) {
                        // Need to make a call to create the customer.
                        // Then store the customer object and pass to the next screen somehow.
                        const requestBodyCreate = {
                            firstName: this.state.firstName,
                            lastName: this.state.lastName,
                            dateOfBirth: null,
                            phoneNumber: this.state.phoneNumber,
                            memberSince: null,
                            email: this.state.email
                        };
                        
                        fetch(`${ConstantStrings.baseDevURL}Customer/CreateCustomer`, {
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


                            }
                        })
                    }
                })
                .then(data => {
                    //console.log(data);
                    //response = data;

                    
                })
                .catch(reason => {
                    console.log("Error calling Customer/GetCustomer endpoint.");
                    console.log(reason);
                });
            }
            else {
                // Do nothing here....
                // In the HTML use ternary to conditionally display the Validation Modal Pop-up.
            }
         });

    }
}
