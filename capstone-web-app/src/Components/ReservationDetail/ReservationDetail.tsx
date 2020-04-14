import React from "react";
import Navbar from "../Navigation/Navbar";
import Footer from "../Footer/Footer";
import IReservationDetailState from "./IReservationDetailState";
import TableService from "../../Services/TableService";
import LoginModal from "../LoginModal/LoginModal";
import CustomModal from "../CustomModal/CustomModal";
import { Redirect } from "react-router-dom";
import OrderConfirmationModal from "../OrderConfirmationModal/OrderConfirmationModal";
import Spinner from "react-bootstrap/Spinner";

export default class ReservationDetail extends React.Component<any, IReservationDetailState> {
    private tableService: TableService;
    private customerId: number;
    
    public constructor(props: any) {
        super(props);
        document.title = "Uncle Luigi's Bistro - Reservation";
        this.tableService = new TableService();

        this.customerId = 0;
        let customerIdFromLS = localStorage.getItem("Customer ID");
        
        if (customerIdFromLS !== null ){
            this.customerId = parseInt(customerIdFromLS.toString());
        }

        this.state = {
            customerLoggedIn: false,
            reservationId: parseInt(this.props.match.params.id),
            reservation: null,
            showLoginModal: false,
            showContinueWithActionModal: false,
            showCancelReservationModal: false,
            redirectToReservationList: false
        };
    }

    public componentDidMount() {
        const requestBody = {
            customerId: this.customerId,
            tableId: this.state.reservationId,
            partySize: 0
        };

        this.tableService.getReservation(requestBody).then(response => {
            if (response !== undefined && response !== null) {
                this.setState({
                    reservation: response
                });
            }
            else {
                this.setState({
                    redirectToReservationList: true
                });
            }
        })
        .catch(reason => {
            this.setState({
                redirectToReservationList: true
            })
        });        
    }

    render() {
        if (this.state.reservation !== null) {
            return (
                <div>
                    <Navbar />
                    <br />
                    <br />
                    <br />
                    <br />
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-12">
                                <div className="card custom">
                                    <div className="container-fluid">
                                    <div className="text-center">
                                            <hr />
                                            <h2 className="font-weight-lighter custom">Reservation</h2>
                                            <hr />
                                        </div>
                                        <br />
                                        {this.renderSummary()}
                                        <br />
                                        <br />
                                        <br />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {this.state.showLoginModal ? <LoginModal 
                                show={this.state.showLoginModal} 
                                onCloseModal={this.closeLoginModal}
                                loginIsSuccessful={this.loginIsSuccessful}
                                /> 
                                : <div></div>}
                    {this.state.showContinueWithActionModal ? <CustomModal {...this.props} useListOption={false} listMessages={[]} showLoginButton={false} title={"Proceed"} body={"Your login was successful, please proceed with your previous action."} buttontitle={"Close"} show={this.state.showContinueWithActionModal} onCloseModal={this.closeActionModal} /> : <div></div>}
                    {this.state.redirectToReservationList ? <Redirect push to="/ReservationList"/> : <div></div>}
                    {this.state.showCancelReservationModal ? <OrderConfirmationModal showRemoveItemButton={false} onRemoveItemClick={() => this.setState({...this.state})} showSubmitOrderButton={true} title={"Cancel Reservation"} body={"Are you sure you want to remove this table reservation?"} buttontitle={"No"} onSubmitOrderClick={this.cancelReservation} show={this.state.showCancelReservationModal} onCloseModal={this.closeCancelConfirmationModal}></OrderConfirmationModal> : <div></div>}
                    <Footer />
                </div>
            );
        }
        else if (this.state.reservation !== null && this.state.reservation.length === 0) {
            return (
                <div>
                    <Navbar />
                    <br />
                    <br />
                    <br />
                    <br />
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-12">
                                <div className="card custom">
                                    <div className="container-fluid">
                                    <div className="text-center">
                                            <hr />
                                            <h2 className="font-weight-lighter custom">Reservation</h2>
                                            <hr />
                                        </div>
                                        <br />
                                        <div className="text-center">
                                            <h4>
                                                No Reservation History Available.
                                            </h4>
                                            <br />
                                            <br />
                                        </div>
                                        <br />
                                        <br />
                                        <br />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Footer />
                </div>
            );
        }
        else {
            return (
                <div>
                    <Navbar />
                    <br />
                    <br />
                    <br />
                    <br />
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-12">
                                <div className="card custom">
                                    <div className="container-fluid">
                                    <div className="text-center">
                                            <hr />
                                            <h2 className="font-weight-lighter custom">Reservation</h2>
                                            <hr />
                                        </div>
                                        <br />
                                        <div className="text-center">
                                            <Spinner animation="border" role="status">
                                                <span className="sr-only">Loading...</span>
                                            </Spinner>
                                            <br />
                                            <br />
                                        </div>
                                        <br />
                                        <br />
                                        <br />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Footer />
                </div>
            );
        }
    }

    private renderSummary(): JSX.Element {
        return (
            <div>
                <table className="table table-bordered" id="non-mobile-reservation">
                    <tbody>
                        <tr>
                            <td>
                                <h3>Reservation ID: <span className="font-weight-bold">{this.state.reservationId}</span></h3>
                            </td>
                            <td>
                                <button className="btn btn-danger" onClick={() => this.cancelReservationClick()}>Cancel Reservation</button>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Table
                            </td>
                            <td>
                                {this.state.reservation.reservationTable}
                            </td>
                        </tr>
                        <tr>
                            <td>Table Size</td>
                            <td>{this.state.reservation.tableSize}</td>
                        </tr>
                        <tr>
                            <td>Group Size:</td>
                            <td>{this.state.reservation.partySize}</td>
                        </tr>
                        <tr>
                            <td>Reservation Date:</td>
                            <td>{this.state.reservation.reservationDate}</td>
                        </tr>
                        <tr>
                            <td>Time Slot:</td>
                            <td>{this.state.reservation.timeSlot}</td>
                        </tr>
                    </tbody>
                </table>
                <div className="container-fluid" id="mobile-reservation">
                    <h3>Reservation ID: <span className="font-weight-bold">{this.state.reservationId}</span></h3>
                    <button className="btn btn-danger" onClick={() => this.cancelReservationClick()}>Cancel Reservation</button>
                    <br /><br />
                    <h4 className="font-weight-bolder">{this.state.reservation.reservationTable}</h4>
                    <h5>Table Size: {this.state.reservation.tableSize}</h5>
                    <h5>Group Size: {this.state.reservation.partySize}</h5>
                    <h5>Reservation Date: {this.state.reservation.reservationDate}</h5>
                    <h5>Time Slot: {this.state.reservation.timeSlot}</h5>
                </div>

            </div>
        );
    }

    private closeCancelConfirmationModal = () => {
        this.setState({
            showCancelReservationModal: false
        });
    }

    private closeActionModal = () => {
        this.setState({
            showContinueWithActionModal: false
        });
    }

    private closeLoginModal = () => {
        this.setState({
            showLoginModal: false
        });
    }

    private loginIsSuccessful = (): void => {
        this.setState({
            showLoginModal: false,
            showContinueWithActionModal: true
        });
    }

    private cancelReservationClick(): void {
        this.setState({
            showCancelReservationModal: true
        });
    }

    private cancelReservation = (): void => {
        this.setState({
            showCancelReservationModal: false
        });

        const requestBody = {
            customerId: this.customerId,
            tableId: this.state.reservationId,
            partySize: 0
        };

        this.tableService.cancelReservation(requestBody).then(response => {
            this.setState({
                redirectToReservationList: true
            });
        })
        .catch(reason => {
            this.setState({
                showLoginModal: true
            });
        });
    }
}