import React from "react";
import IUserProfileState from "./IUserProfileState";
import Navbar from "../Navigation/Navbar";
import ConstantStrings from "../../Constants/ConstantStrings";
import { Redirect } from "react-router-dom";
import TokenService from "../../Services/TokenService";
import CustomModal from "../CustomModal/CustomModal";
import Footer from "../Footer/Footer";
import MenuService from "../../Services/MenuService";

export default class UserProfile extends React.Component<any, IUserProfileState> {
    private menuService: MenuService;

    constructor(props: any) {
        super(props);
        document.title = "Uncle Luigi's Bistro - User Profile";
        this.state = {
            userName: "",
            password: "",
            confirmPassword: "",
            customerId: 0,
            navigateToHomeScreen: false,
            useListOption: true,
            passwordTooShortError: "Password must be at least 6 characters.",
            userExistsError: "This username already exists in our system.",
            passwordsNotMatching: "Confirmed password did not match password.",
            userNameTooShort: "Username must be at least 4 characters.",
            accountExists: "This account is already registered.",
            validationMessages: [],
            showValidationModal: false,
            showCustomerExistsModal: false,
            isFormValid: false,
        }

        this.menuService = new MenuService();
    }

    public componentDidMount() {
        this.setState({
            customerId: parseInt(this.props.match.params.id) as number 
        });
    }

    public render() {
        return (
            <div>
                <Navbar />
                <div id="userProfileScreenBackground">
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
                                    <h3 className="card-header text-center font-weight-bold">Create User</h3>
                                    <div className="card-margin">
                                        <div className="form-group">
                                            <label className="font-weight-bold">Username:</label>
                                            <input type="text" className="form-control" placeholder="Username" id="name"value={this.state.userName} onChange={(e) => this.userNameOnChange(e)}></input>
                                        </div>
                                        <div className="form-group">
                                            <label className="font-weight-bold">Password:</label>
                                            <input type="password" className="form-control" placeholder="Password" id="pswd"value={this.state.password} onChange={(e) => this.passwordOnChange(e)}></input>
                                        </div>
                                        <div className="form-group">
                                            <label className="font-weight-bold">Confirm Password:</label>
                                            <input type="password" className="form-control" placeholder="Confirm Password" id="pswd"value={this.state.confirmPassword} onChange={(e) => this.confirmPasswordOnChange(e)}></input>
                                        </div>
                                        {this.state.isFormValid ? <div></div> : <CustomModal {...this.props} showLoginButton={false} title={"Warning"} useListOption={true} listMessages={this.state.validationMessages} body={this.state.userExistsError} buttontitle={"Ok"} show={this.state.showValidationModal} onCloseModal={this.closeValidationModal} />}
                                        {this.state.isFormValid ? <div></div> : <CustomModal {...this.props} showLoginButton={false} title={"Warning"} useListOption={true} listMessages={this.state.validationMessages} body={this.state.userExistsError} buttontitle={"Ok"} show={this.state.showValidationModal} onCloseModal={this.closeValidationModal} />}
                                        <button onClick={() => this.onFormSubmit()} type="button" className="btn btn-outline-danger" >Submit</button>
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
                {this.state.navigateToHomeScreen ? <Redirect push to={"/"}/>:<div></div>}
            </div>
        )
    }

    private closeValidationModal = () => {
        this.setState({
            showValidationModal: false
        });
    }

    private userNameOnChange(event: any): void{
        //this prevents users from entering special characters
        let value = event.target.value
        value  = value.replace(/[^A-Za-z0-9]/gi, "");
        this.setState({
            userName: value
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
        let messages: string [] = [];

        if (this.state.userName.length < 4 ){
            valid = false;
            messages.push(this.state.userNameTooShort)
        }
      
        if (this.state.password.length < 6 ){
            valid = false;
            messages.push(this.state.passwordTooShortError)
             
            this.setState({
                validationMessages: messages
            });

        }
        if (this.state.confirmPassword !== this.state.password) {
            valid = false;
            messages.push(this.state.passwordsNotMatching)
             
            this.setState({
                validationMessages: messages
            });
        }

        this.setState({
            isFormValid: valid,
            showValidationModal: true
        }, () => {
            if (this.state.isFormValid) {
               // At this point, the form has been validated for password length and matching fields.
               // It is necessary to check if the username submitted by the user is already taken.
                fetch(`${ConstantStrings.baseAzureURL}User/GetUserProfileByCustomer/${this.state.customerId}`,{
                    method: "GET",
                    headers: {
                        'Constant-Type': 'application/json'
                    }
                })
                .then((response: any) => {
                    return response.json();
                })
                .then(data => {
                    // Then check that the username hasn't already been taken.
                    if (data.length === 0 ){
                        fetch(`${ConstantStrings.baseAzureURL}User/GetUser/${this.state.userName}`, {
                            method: "GET",
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        })
                        .then((response: any) => {
                            return response.json();
                        })
                        .then(data => {
                            // Here we should see either a JSON object with one property (username).
                            // Either the property is equal to the username passed in in the URL (this means that the username is already taken.)
                            // Or the username property returned is an empty string, (this means the username is not taken and is available.)        
                            if (data.username === "") {
                                // // Create the user account and pass in the customer ID along with it.
                                // // Create your API call here for CreateUser.
                                const requestBody = {
                                    userName: this.state.userName,
                                    password: this.state.password,
                                    confirmPassword: this.state.confirmPassword,
                                    email: "",
                                    phoneNumber: "",
                                    customerId: this.state.customerId
                                };
        
                                fetch(`${ConstantStrings.baseAzureURL}User/Register`, {
                                    method: "POST",
                                    body: JSON.stringify(requestBody),
                                    headers: {
                                        'Content-Type': 'application/json'
                                    }
                                })
                                .then(response =>{        
                                    if (response.status === 200) {
                                        return response.json();
                                    }
                                })
                                .then(data => {
                                    let tokenService = new TokenService();
                        
                                    const tokenBody = {
                                        accessToken: data.authenticatedModel.accessToken,
                                        refreshToken: data.authenticatedModel.refreshToken,
                                        firstName: data.authenticatedModel.customer.firstName,
                                        lastName: data.authenticatedModel.customer.lastName,
                                        phoneNumber: data.authenticatedModel.customer.phoneNumber,
                                        email: data.authenticatedModel.customer.email,
                                        customerId: data.authenticatedModel.customer.id,
                                        username: data.username
                                    };

                                    tokenService.handleAuthTokens(tokenBody); 
                                    let customerIdFromLS = localStorage.getItem("Customer ID");
                                    let customerId: number = 0;
                                    if (customerIdFromLS !== null) {
                                        customerId = parseInt(customerIdFromLS.toString());
                                    }
                                    this.menuService.getAllCarryOutsInCart(customerId)
                                    .then((data: any) => {
                                        let count = data.length ?? 0;
                                         localStorage.setItem("cartCount", count);

                                         this.setState({
                                            navigateToHomeScreen: true
                                       
                                        });

                                     });
                                    
                                });
                            }
                            else {
                                    valid = false;
                                  messages.push(this.state.userExistsError)
                                    // Set the state such a manner that it triggers a modal that says a username like that exists
                                     this.setState({
                                         isFormValid: valid,
                                     validationMessages: messages
                                    });
                                    
                             }
                        })
                        .catch(reason => {
                        });
                    }
                    else {
                        // Display message saying that the customer already has an account.
                        // Potentially later this logic will need to redirect them to forget user/forget password screen.
                        valid = false;
                        messages.push(this.state.accountExists)
                        
                        this.setState({
                            isFormValid: valid,
                            validationMessages: messages
                        });
                    }
                })
            }  
        });
    }
}
