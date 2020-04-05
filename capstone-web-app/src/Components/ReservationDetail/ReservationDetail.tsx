import React from "react";
import Navbar from "../Navigation/Navbar";
import Footer from "../Footer/Footer";
import MenuService from "../../Services/MenuService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as icons from "@fortawesome/free-solid-svg-icons";
import IReservationDetailProps from "./IReservationDetailProps";
import IReservationDetailState from "./IReservationDetailState";


export default class ReservationDetail extends React.Component<any, IReservationDetailState> {
    private menuService: MenuService;
    private customerLoggedIn: boolean;
    
    public constructor(props: any) {
        super(props);
        
        this.menuService = new MenuService();
        this.customerLoggedIn = false;
        this.state = {
            customerLoggedIn: false,
            reservationId: parseInt(this.props.match.params.id)
        };

    }

    public componentDidMount() {
        console.log(this.props.match.params);
        
        let customerId: number = 0;
        let customerIdFromLS = localStorage.getItem("Customer ID");
        
        if (customerIdFromLS !== null ){
            customerId = parseInt(customerIdFromLS.toString());
        }
        
        
    }

    render() {
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
                                        <h1 className="font-weight-lighter custom">Reservation Details</h1>
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
                            <td>Sales T</td>
                            <td> 7.25% (IL)</td>
                        </tr>
                        <tr>
                            <td>Total: </td>
                            <td></td>
                        </tr>
                    </tbody>
                </table>
                <br />
                <br />
                <br />
                <br />
                <br />
                Reservation Id{this.state.reservationId}
            </div>
        );
    }
}