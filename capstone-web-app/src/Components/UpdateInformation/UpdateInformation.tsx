import React from "react";
import Navbar from "../Navigation/Navbar";
import ConstantStrings from "../../Constants/ConstantStrings";
import Footer from "../Footer/Footer";
import TokenService from "../../Services/TokenService";
import MenuService from "../../Services/MenuService";
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
        };
        this.customerLoggedIn = false;
        this.userService = new UserService();
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
                                    <h3 className="card-header text-center font-weight-bold"  >Update Your Information</h3>
                                    <div className="card-margin">
                                        <div className="form-group required">
                                            <label className="font-weight-bold">Email:</label>
                                            <input type="email"  className="form-control" placeholder="Email" id="email" value={this.state.email}onChange={(e) => this.emailOnChange(e)}></input>
                                        </div>
                                        <div className="form-group required">
                                            <label className="font-weight-bold">Phone Number:</label>
                                            <input type="text" className="form-control"  placeholder="Phone" id="tel" value={this.state.phoneNumber}onChange={(e) => this.phoneNumberOnChange(e)}></input>
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
                <Footer />
            </div>
        )
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
        if(localStorage.getItem("Customer ID")){
            const requestBody = {
                id: customerId,
                email: this.state.email,
                phoneNumber: this.state.phoneNumber,
            }
            console.log(requestBody);
            this.userService.updateInformation(requestBody)
            .then(response => {
                if (response){
                    console.log("worked");
                }
            })
            .catch(reason => {
                console.log("didnt work");
            })
        }
    }

}
