import React from "react";
import Footer from "../Footer/Footer";
import Navbar from "../Navigation/Navbar";
import IPortalProps from "./IPortalProps";
import IPortalState from "./IPortalState";
import { Redirect } from "react-router-dom";

export default class Portal extends React.Component<IPortalProps, IPortalState> {

    public constructor(props: any) {
        super(props);
        document.title = "Uncle Luigi's Bistro - Portal";
        this.state = {
            redirectToHome: false,
            redirectToChangePassword: false,
            redirectToOrderList: false,
            redirectToReservationList: false,
            redirectToUpdateInformation: false,
        };
    }

    public componentDidMount() {
        const loggedIn = localStorage.getItem("Customer ID") ? true : false;        

        if (!loggedIn) {
            this.setState({
                redirectToHome: true
            });
        }
    }

    public render() {
        return (
            <div>
                <Navbar />
                <div id="portalBackground">
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <div className="container">
                        <div className="custom-container">
                            <h3 className="text-center">Welcome!</h3>
                            <hr />
                            <div className="row">
                                <div className="col-lg-4 col-md-6 col-sm-12">
                                    <div className="card user-portal">
                                        <img className="card-img-top" src={`/Images/Other/Customer.jpg`} alt="Customer"></img>
                                        <div className="options-container">
                                            <button className="btn btn-danger" onClick={() => this.changePassword()}>Change Password</button>
                                            <button className="btn btn-danger" onClick={() => this.updateInformation()}>Update Information</button>
                                            <button className="btn btn-danger" onClick={() => this.logOut()}>Log Out</button>
                                        </div>
                                        <br />
                                    </div>
                                </div>
                                <br />
                                <br />
                                <div className="col-lg-4 col-md-6 col-sm-12">
                                    <div className="card user-portal">
                                        <img className="card-img-top" src={`/Images/Other/CarryOut.png`} alt="Food"></img>
                                        <div className="options-container">
                                            <button className="btn btn-danger" onClick={() => this.viewOrders()}>View Orders</button>
                                            <span><i className="text-dark">View Carry-Out Orders and Details.</i></span>
                                            <label>&nbsp;</label>
                                            <label>&nbsp;</label>
                                        </div>
                                        <br />
                                    </div>
                                </div>
                                <br />
                                <br />
                                <div className="col-lg-4 col-md-6 col-sm-12">
                                    <div className="card user-portal">
                                        <img className="card-img-top" src={`/Images/Other/Reservation.jpg`} alt="Food"></img>
                                        <div className="options-container">
                                            <button className="btn btn-danger" onClick={() => this.viewReservations()}>View Reservations</button>
                                            <span><i className="text-dark">View Reservations and Details.</i></span>
                                            <label>&nbsp;</label>
                                            <label>&nbsp;</label>
                                        </div>
                                        <br />
                                    </div>
                                </div>
                            </div> 
                            <br />
                            <br />
                        </div>
                    </div>
                    <br />
                    <br />
                </div>
                <Footer />
                {this.state.redirectToHome ? <Redirect push to="/"/> : <div></div>}
                {this.state.redirectToChangePassword ? <Redirect push to="/ChangePassword"/>: <div></div>}
                {this.state.redirectToOrderList ? <Redirect push to="/CarryOutList"/>: <div></div>}
                {this.state.redirectToReservationList ? <Redirect push to="/ReservationList"/>: <div></div>}
                {this.state.redirectToUpdateInformation ? <Redirect push to="/UpdateInformation"/>: <div></div>}
            </div>
        )
    }

    private changePassword = () => {
        this.setState({
            redirectToChangePassword: true
        });
    }

    private viewOrders = () => {
        this.setState({
            redirectToOrderList: true
        });
    }

    private viewReservations = () => {
        this.setState({
            redirectToReservationList: true
        });
    }
    
    private updateInformation = () => {
        this.setState({
            redirectToUpdateInformation: true,
        })
    }

    private logOut = () => {
        localStorage.clear();

        this.setState({
            redirectToHome: true
        });
    }
}