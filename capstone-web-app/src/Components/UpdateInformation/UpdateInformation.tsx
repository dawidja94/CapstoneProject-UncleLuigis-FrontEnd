import React from "react";
import Navbar from "../Navigation/Navbar";
import Footer from "../Footer/Footer";
import CustomModal from "../CustomModal/CustomModal";
import { Redirect } from "react-router-dom";
import UserService from "../../Services/UserService";
import IUpdateInformationState from "./IUpdateInformationState";
import IUpdateInformationProps from "./IUpdateInformationProps";

export default class UpdateInformation extends React.Component<IUpdateInformationProps, IUpdateInformationState> {
    private userService: UserService;
    private customerLoggedIn: boolean;
    private customerId: number = 0;

    constructor(props: any) {
        super(props);
        document.title = "Uncle Luigi's Bistro - Update Information";
        this.state = {
            customerLoggedIn: false,
            id: 0,
            email: "",
            phoneNumber: "",
            firstName: "string",
            lastName: "string",
            showSuccessfulModal: false,
            navigateToHome: false,
        };
        this.customerLoggedIn = false;
        this.userService = new UserService();
    }

    public componentDidMount() {
        const loggedIn = localStorage.getItem("Customer ID") ? true : false;        

        if (!loggedIn) {
            this.setState({
                navigateToHome: true
            });
        }

      let email: string = localStorage.getItem("Email") !== null ? localStorage.getItem("Email") as string : "";
      let phoneNumber: string = localStorage.getItem("Phone number") ? localStorage.getItem("Phone number") as string: "";
      
      this.setState({
        email: email,
        phoneNumber: phoneNumber
      });
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
                                    <h3 className="card-header text-center font-weight-bold"  >Update Your Information</h3>
                                    <div className="card-margin">
                                        <div className="form-group required">
                                            <label className="font-weight-bold">Email:</label>
                                            <input type="email"  className="form-control" placeholder="Email" id="email" value={this.state.email} onChange={(e) => this.emailOnChange(e)}></input>
                                        </div>
                                        <div className="form-group required">
                                            <label className="font-weight-bold">Phone Number:</label>
                                            <input type="text" className="form-control"  placeholder="Phone" id="tel" value={this.state.phoneNumber} onChange={(e) => this.phoneNumberOnChange(e)}></input>
                                        </div>
                                        <button type="button" onClick={() => this.onFormSubmit()} className="btn btn-outline-danger">Submit</button>
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
                {!this.state.showSuccessfulModal ? <div></div> : <CustomModal {...this.props} showLoginButton={false} title={"Success"} body={"Your information has been updated successfully!"} buttontitle={"Home"} show={this.state.showSuccessfulModal} onCloseModal={this.closeSuccessModal} useListOption={false} listMessages={[]} />}
                {this.state.navigateToHome ? <Redirect push to={{pathname: `/`}}/> : <div></div>}
                <Footer />
            </div>
        )
    }

    private closeSuccessModal = () => {

        this.setState({
            showSuccessfulModal: false,
            navigateToHome: true,
        })
    }

    private emailOnChange (event: any): void {
        this.setState({
            email: event.target.value
        });
    }

    private phoneNumberOnChange (event: any): void {
        this.setState({
            phoneNumber: event.target.value
        });
    }

    onFormSubmit(): void {
        this.customerLoggedIn = localStorage.getItem("Customer ID") !== "" ? true : false; 
        let customerIdFromLS = localStorage.getItem("Customer ID");
        let customerId: number = 0;
    
        if (customerIdFromLS !== null) {
            customerId = parseInt(customerIdFromLS.toString());
        }
        if (localStorage.getItem("Customer ID")){
            const requestBody = {
                id: customerId,
                email: this.state.email,
                phoneNumber: this.state.phoneNumber,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                memberSince: null,
                dateOfBirth: null,
            }
            
            this.userService.updateInformation(requestBody)
            .then(response => {
                
                if (response){
                    this.setState({
                        showSuccessfulModal: true
                    }, () => {
                        localStorage.setItem("Email", this.state.email);
                        localStorage.setItem("Phone number", this.state.phoneNumber);
                    });
                }
            })
            .catch(reason => {
            })
        }
    }

}
