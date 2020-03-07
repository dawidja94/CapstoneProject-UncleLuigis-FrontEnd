import React from "react";
import IUserProfileState from "./IUserProfileState";
import Navbar from "../Navigation/Navbar";
import ConstantStrings from "../../Constants/ConstantStrings";
import { Redirect } from "react-router-dom";
import TokenService from "../../Services/TokenService";
export default class UserProfile extends React.Component<any, IUserProfileState> {
    constructor(props: any) {
        super(props);

        this.state = {
            userName: "",
            password: "",
            isFormValid: false,
            confirmPassword: "",
            customerId: 0,
            navigateToHomeScreen: false,
        }
    }

    public componentDidMount() {
        console.log("Checking for created customer ID.");
        console.log(this.props.match.params.id);

        this.setState({
            customerId: parseInt(this.props.match.params.id) as number 
        });
        //this.props.match.params.id;
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
                {this.state.navigateToHomeScreen ? <Redirect to={"/"}/>:<div></div>}np
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
            // // Call to API would happen
            //  fetch(`${ConstantStrings.baseAzureURL}User/GetUser/id`, {
            //     method: "GET",
            //      headers: {
            //          'Content-Type': 'application/json'
            //      }
            //  })
            //  .then((response: any) => {
            //      console.log("Did we get here?");
            //     console.log(response);

            //      return response.json();
            //  })
            //  .then(data => {
            //      console.log("Checking response here in user profile");
            //      console.log(data);

                
            //  })
            //  .catch(reason => {
            //      console.log(reason);
            //  });
          
            //  fetch(`${ConstantStrings.baseAzureURL}User/GetUser/id`, {
            //      method: "POST",
            //     body: JSON.stringify(body),
            //      headers: {
            //          'Content-Type': 'application/json'
            //      }

            //  })

            // Create the user account and pass in the customer ID along with it.
            // Create your API call here for CreateUser.
            const requestBody = {
                userName: this.state.userName,
                password: this.state.password,
                confirmPassword: this.state.confirmPassword,
                email: "",
                phoneNumber: "",
                customerId: this.state.customerId
            };

            console.log("Checking this.state.customerId");
            console.log(this.state.customerId);

            fetch(`${ConstantStrings.baseAzureURL}User/Register`, {
                method: "POST",
                body: JSON.stringify(requestBody),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(response =>{
                console.log("Create User status:" + response.status);

                if (response.status === 200)
                return response.json();
                else{
                    console.log("wtf");
                }
            })
            .then(data => {
                console.log(data);
                let tokenService = new TokenService();
    
                const tokenBody = {
                    accessToken: data.authenticatedModel.accessToken,
                    refreshToken: data.authenticatedModel.refreshToken,
                    firstName: data.authenticatedModel.customer.firstName,
                    lastName: data.authenticatedModel.customer.lastName,
                    phoneNumber: data.authenticatedModel.customer.phoneNumber

                }
                tokenService.handleAuthTokens(tokenBody); 

                this.setState({
                    navigateToHomeScreen: true
    
                });
            });
            

        }  
        else {
            // Do nothing here....
            // In the HTML use ternary to conditionally display the Validation Modal Pop-up.
        }
    }
}
