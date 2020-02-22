import React from "react";
import ICustomerRegistrationProps from "./ICustomerRegistrationProps";
import ICustomerRegistrationState from "./ICustomerRegistrationState";
import Navbar from "../Navbar";

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
                                        <button type="button" className="btn btn-outline-danger">Continue</button>
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
        let valid: boolean = true;
        let regEx = /^(([^<>()[]\.,;:\s@"]+(.[^<>()[]\.,;:\s@"]+))|(".+"))@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}])|(([a-zA-Z-0-9]+.)+[a-zA-Z]{2,}))$/;

        if (!regEx.test(this.state.email)) {
            valid = false;
        }

        this.setState({
            isFormValid: valid
        }, () => {
            if (this.state.isFormValid) {
                const body = {
                    
                };

                // Call to API would happen
                fetch("url goes here", {method: "GET"}).then(response => {
                    console.log(response.body);
                });
            }
            else {
                // Do nothing here....
                // In the HTML use ternary to conditionally display the Validation Modal Pop-up.
            }
         });

    }
}
