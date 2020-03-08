import React from "react";
import IUserProfileState from "./IUserProfileState";
import Navbar from "../Navigation/Navbar";
import ConstantStrings from "../../Constants/ConstantStrings";
export default class UserProfile extends React.Component<any, IUserProfileState> {
    constructor(props: any) {
        super(props);

        this.state = {
            userName: "",
            password: "",
            isFormValid: false,
            confirmPassword: "",
            customerId: 0
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
                                    <h3 className="card-header text-center font-weight-bold">Customer Registration</h3>
                                    <div className="card-margin">
                                        <div className="form-group">
                                            <label className="font-weight-bold">User Name:</label>
                                            <input type="text" className="form-control" placeholder="User Name" id="name"value={this.state.userName} onChange={(e) => this.userNameOnChange(e)}></input>
                                        </div>
                                        <div className="form-group">
                                            <label className="font-weight-bold">Password:</label>
                                            <input type="password" className="form-control" placeholder="Password" id="pswd"value={this.state.password} onChange={(e) => this.passwordOnChange(e)}></input>
                                        </div>
                                        <div className="form-group">
                                            <label className="font-weight-bold">Confirm Password:</label>
                                            <input type="password" className="form-control" placeholder="Confirm Password" id="pswd"value={this.state.confirmPassword} onChange={(e) => this.confirmPasswordOnChange(e)}></input>
                                        </div>
                                        <button onClick={() => this.onFormSubmit()} type="button" className="btn btn-outline-danger" >Submit</button>
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

    private userNameOnChange(event: any): void{
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
    private onFormSubmit(): void {
        let valid: boolean = true;
      

        if (this.state.confirmPassword !== this.state.password) {
            valid = false;
        }

        if (valid) {
            const body = {
            };

            console.log("Checking this.state.customerId");
            console.log(this.state.customerId);

            // // Call to API would happen
            // fetch(`${ConstantStrings.baseAzureURL}User/GetUser/Samson`, {
            //     method: "GET",
            //     headers: {
            //         'Content-Type': 'application/json'
            //     }
            // })
            // .then((response: any) => {
            //     console.log("Did we get here?");
            //     console.log(response);

            //     return response.json();
            // })
            // .then(data => {
            //     console.log("Checking response here in user profile");
            //     console.log(data);

                
            // })
            // .catch(reason => {
            //     console.log(reason);
            // });

            // Create the user account and pass in the customer ID along with it.
            // Create your API call here for CreateUser.
            
        }
        else {
            // Do nothing here....
            // In the HTML use ternary to conditionally display the Validation Modal Pop-up.
        }
    }
}
