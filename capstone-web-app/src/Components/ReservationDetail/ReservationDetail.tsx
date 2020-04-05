import React from "react";
import Navbar from "../Navigation/Navbar";
import Footer from "../Footer/Footer";
import IReservationDetailState from "./IReservationDetailState";
import TableService from "../../Services/TableService";
import Spinner from "react-bootstrap/Spinner";


export default class ReservationDetail extends React.Component<any, IReservationDetailState> {
    private tableService: TableService;
    private customerLoggedIn: boolean;
    
    public constructor(props: any) {
        super(props);
        
        this.tableService = new TableService();
        this.customerLoggedIn = false;
        this.state = {
            customerLoggedIn: false,
            reservationId: parseInt(this.props.match.params.id),
            reservation: null
        };
    }

    public componentDidMount() {
        this.tableService.getReservation(this.state.reservationId).then(response => {
            this.setState({
                reservation: response
            }, () => {
                console.log(response);
                console.log(this.state.reservation);
            })
        })        
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
                                            <h1 className="font-weight-lighter custom">Table Reservation</h1>
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
                                            <h1 className="font-weight-lighter custom">Table Reservation</h1>
                                            <hr />
                                        </div>
                                        <br />
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
                <table className="table table-bordered">
                    <tbody>
                        <tr>
                            <td>
                                <h3>Reservation ID: <span className="font-weight-bold">{this.state.reservationId}</span></h3>
                            </td>
                            <td>
                                <button className="btn btn-danger">Cancel Reservation</button>
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
            </div>
        );
    }
}