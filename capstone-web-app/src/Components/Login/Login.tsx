import React from "react";
import Navbar from "../Navigation/Navbar";
import ConstantStrings from "../../Constants/ConstantStrings";
import ILoginProps from "../UserProfile/IUserProfileProps";
import ILoginState from "./ILoginState";
import Footer from "../Footer/Footer";
import TokenService from "../../Services/TokenService";
import MenuService from "../../Services/MenuService";
import { Redirect, NavLink } from "react-router-dom";
import CustomModal from "../CustomModal/CustomModal";

export default class Login extends React.Component<ILoginProps, ILoginState> {
    private menuService: MenuService;

    constructor(props: any) {
        super(props);

        this.state = {
            userName: "",
            password: "",
            redirectToHome: false,
            showWrongLoginModal: false,
        }

        this.menuService = new MenuService();
    }

    public componentDidMount() {
    
    }

    public render() {
        return (
            <div>
                <Navbar />
                <div id="loginScreenBackground">
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
                                <br />
                                <br />
                                <div className="card login-custom">
                                    <h3 className="card-header text-center font-weight-bold">Login</h3>
                                    <div className="card-margin">
                                        <div className="form-group">
                                            <label className="font-weight-bold">Username:</label>
                                            <input type="text" className="form-control" placeholder="Username" id="name"value={this.state.userName} onChange={(e) => this.userNameOnChange(e)}></input>
                                        </div>
                                        <div className="form-group">
                                            <label className="font-weight-bold">Password:</label> 
                                            <input type="password" className="form-control" placeholder="Password" id="pswd"value={this.state.password} onChange={(e) => this.passwordOnChange(e)}></input>
                                            <small><NavLink to="/ForgetPassword"> Forget Password</NavLink></small>
                                        </div>
                                        <button onClick={() => this.onFormSubmit()} type="button" className="btn btn-outline-danger">Submit</button>
                                        <br />
                                        <br />
                                        <small className="text-mute text-center">Not a member?<NavLink to="/Register"> Register now!</NavLink></small>
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
                {!this.state.showWrongLoginModal ? <div></div> : <CustomModal {...this.props} showLoginButton={false} title={"Warning"} body={"Wrong username or password. Please try again."} buttontitle={"Ok"} show={this.state.showWrongLoginModal} onCloseModal={this.closeModal} useListOption={false} listMessages={[]} />}
                {this.state.redirectToHome ? <Redirect to="/"/> : <div></div>}
                <Footer />
            </div>
        )
    }

    private closeModal = () => {
        this.setState({
            showWrongLoginModal: false
        });
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
    
    private onFormSubmit(): void {
        const requestBody = {
            username: this.state.userName,
            password: this.state.password,
            rememberMe: true
        };

        fetch(`${ConstantStrings.baseAzureURL}User/Login`, {
            method: "POST",
            body: JSON.stringify(requestBody),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        
        .then(response => {
            console.log(response.status);
            if (response.status === 401){
                this.setState({
                    showWrongLoginModal: true
                })
                return response.json();
            }
            else if (response.status === 200) {
                return response.json();
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
                phoneNumber: data.authenticatedModel.customer.phoneNumber,
                customerId: data.authenticatedModel.customer.id
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
                    redirectToHome: true
                });
            });
        })
        .catch(reason => {
            
            console.log(reason);
        })
    }
}
