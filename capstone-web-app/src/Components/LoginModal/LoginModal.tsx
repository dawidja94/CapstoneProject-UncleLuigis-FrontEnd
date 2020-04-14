import React from "react";
import Modal from "react-bootstrap/Modal";
import ILoginModalProps from "./ILoginModalProps";
import ConstantStrings from "../../Constants/ConstantStrings";
import ILoginModalState from "./ILoginModalState";
import TokenService from "../../Services/TokenService";
import MenuService from "../../Services/MenuService";
import CustomModal from "../../Components/CustomModal/CustomModal";
import { NavLink } from "react-router-dom";

export default class LoginModal extends React.Component<ILoginModalProps, ILoginModalState> {
    private menuService: MenuService;
    
    constructor(props: any) {
        super(props);

        let username = localStorage.getItem("Username");
        let usernameString = "";

        if (username != null) {
            usernameString = username.toString();
        }

        this.state = {
            hidden: false,
            userName: usernameString,
            password: "",
            showMessageModal: false,
            isUserValid: false,
            show: true,
            messageBody: "",
            messageTitle: ""
        };

        this.menuService = new MenuService();
    }

    private onHideHandler() {
        this.props.onCloseModal();
    }

    render() {
        if (this.props.show) {
            return (
                <div>
                    <div className="modal-container">
                        <Modal.Dialog
                            size="lg"
                            aria-labelledby="contained-modal-title-vcenter"
                            centered
                            hidden={false}
                            >
                            <Modal.Header closeButton onHide={() => this.onHideHandler()}>
                                <Modal.Title>Login</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                
                                <p>
                                    You must login again to continue with your action.
                                    &nbsp;<NavLink className="text-left text-danger" to="/Login" onClick={() => this.differentUserClick()}>Not {localStorage.getItem("First name")}? Click here.</NavLink>
                                </p>
                                <div className="form-group">
                                    <label className="font-weight-bold">Password:</label>
                                    <input type="password" placeholder="Password" className="form-control" value={this.state.password} onChange={(e) => this.passwordOnChange(e)} onKeyPress={(e) => this.enterPress(e)}/>
                                </div>
                                <NavLink className="text-danger" to="/ForgetPassword">Forget Password</NavLink>
                                <br /><br />
                            </Modal.Body>
                            <Modal.Footer>
                                <button className="btn btn-outline-danger" onClick={() => this.onFormSubmit()}>Login</button>
                            </Modal.Footer>
                        </Modal.Dialog>
                    </div>
                    {this.state.showMessageModal ? <CustomModal {...this.props} useListOption={false} listMessages={[]} showLoginButton={false} title={this.state.messageTitle} body={this.state.messageBody} buttontitle={"Close"} show={this.state.showMessageModal} onCloseModal={this.closeWarningModal} /> : <div></div>}
                </div>
            );
        }
        else {
            return (<div></div>);
        }
    }

    private enterPress(event: any): void {
        if (event.key === 'Enter'){
           this.onFormSubmit(); 
        }
    }

    private passwordOnChange(event: any): void {
        this.setState({
            password: event.target.value
        });
    }

    private differentUserClick(): void {
        localStorage.clear();
    }

    private closeWarningModal = (): void => {
        this.setState({
            showMessageModal: false
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
            if (response.status === 401) {
                this.setState({
                    showMessageModal: true
                })
                return response.json();
            }
            else if (response.status === 200) {
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
            });

            this.setState({
                isUserValid: true,
                show: false,
                messageTitle: "Login Succeeded",
                messageBody: "Thank you. Please retry your previous action!"
            }, () => {
                this.props.loginIsSuccessful();
            });
        })
        .catch(reason => {
            this.setState({
                isUserValid: false,
                messageTitle: "Login Failed",
                messageBody: "The username/password is incorrect."
            });
        })
    }
}