import React from "react";
import Footer from "../Footer/Footer";
import Navbar from "../Navigation/Navbar";
import { Redirect } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";
import IReservationListProps from "./IReservationListProps";
import IReservationListState from "./IReservationListState";
import TableService from "../../Services/TableService";

export default class ReservationList extends React.Component<IReservationListProps, IReservationListState> {
    private tableService: TableService;

    public constructor(props: any) {
        super(props);
        document.title = "Uncle Luigi's Bistro - Reservation List";
        this.tableService = new TableService();

        this.state = {
            reservationList: [],
            customerLoggedIn: false,
            navigateToOrder: false,
            reservationId: 0,
            redirectToLogin: false,
            currentPage: 1,
            ordersPerPage: 8,
            showSpinner: false,
            activeIndex: 1
        };
    }

    public componentDidMount() {     
        const loggedIn = localStorage.getItem("Customer ID") ? true : false;

        if (loggedIn) {
            this.setState({
                showSpinner: true,
                customerLoggedIn: loggedIn
            }, () => {
                this.tableService.getCustomerReservations()
                .then ((data) => {
                    this.setState({
                        reservationList: data,
                        showSpinner: false
                    });
                })
            });
        }
        else if (!loggedIn) {
            this.setState({
                showSpinner: false,
                customerLoggedIn: loggedIn
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
                            <h3 className="text-center">Your Reservations</h3>
                            <hr />
                            <div className="row">
                                <div className="col-12">
                                    {this.state.reservationList.length > 8 ? this.Pagination(this.state.ordersPerPage, this.state.reservationList.length) : <div></div> }
                                    {this.displayReservations(this.state.reservationList)}
                                </div>
                            </div> 
                            <br />
                        </div>
                    </div>
                    <br />
                    <br />
                </div>
                <Footer />
                {this.state.redirectToLogin ? <Redirect push to="/Login"/> : <div></div>}
                {this.state.navigateToOrder ? <Redirect push to={{pathname: `/ReservationDetail/${this.state.reservationId}`}}/> : <div></div>}
            </div>
        )
    }

    private viewReservation(reservationId: number) {
       this.setState({
            navigateToOrder: true,
            reservationId: reservationId
       });
    }

    public paginate = (pageNumber: number) => {
        this.setState({
            currentPage: pageNumber,
            activeIndex: pageNumber 
        });
    }
    
    
    public Pagination = (ordersPerPage: number, totalOrders: number ) => {
        const pageNumbers= [];

        for (let i = 1; i <= Math.ceil(totalOrders/ordersPerPage); i++){
            pageNumbers.push(i);
        }

        return (
            <nav>
                <br />
                <br />
                <ul className="pagination">
                    {pageNumbers.map(number =>(
                        <li key={number} className="pagination pagination-lg">
                            <span>
                           <button onClick={() => this.paginate(number)} className={number === this.state.activeIndex ? "btn btn-danger" : "btn btn-outline-danger"} >{number}</button> &nbsp; 
                           </span>
                        </li>
                    ))}
                </ul>
            </nav>
        )
    }
    
    private displayReservations = (orderList: any []) => {
        if (this.state.customerLoggedIn && this.state.reservationList.length > 0) {
            let indexOfLastReservation: number = this.state.currentPage * this.state.ordersPerPage;
            let indexOfFirstReservation: number = indexOfLastReservation - this.state.ordersPerPage;
            let currentReservations: any [] = orderList.slice(indexOfFirstReservation, indexOfLastReservation);

            return (
                <div className="table-container">
                    <table className="table table-hover">
                        <thead className="text-left">
                            <tr>
                                <th className="font-weight-normal"></th> 
                                <th>Reservation ID</th>
                                <th>Table</th>
                                <th>Group Size</th>
                                <th>Time Slot</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody className="text-left">
                        {currentReservations.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td>
                                        <button className="btn btn-danger" onClick={() => this.viewReservation(item.id)}>View</button>
                                    </td>
                                    <td>{item.id}</td>
                                    <td>{item.reservationTable}</td>
                                    <td>{item.partySize}</td>
                                    <td>{item.timeSlot}</td>
                                    <td>{item.reservationDate}</td>
                                </tr>
                            );
                        })}
                        </tbody>
                        </table>
                        </div>
            );
        }
        else if (this.state.showSpinner && this.state.customerLoggedIn && this.state.reservationList.length === 0) {
            return (
                <div className="text-center">
                    <Spinner animation="border" role="status">
                        <span className="sr-only">Loading...</span>
                    </Spinner>
                    <br />
                    <br />
                </div>
            );
        }
        else if (!this.state.showSpinner && !this.state.customerLoggedIn) {
            return (
                <div className="text-center">
                    <h5>Please login to view your reservations!</h5>
                    <br />
                    <span>
                        <button className="btn btn-outline-danger"onClick={() => this.setState({redirectToLogin: true})} >{"Login"}</button> &nbsp;
                    </span>
                    <br />
                </div>
            );
        }
        else {
            return (
                <div className="text-center">
                    <br />
                    <br />
                    <h5>No Reservations To Display</h5>
                    <br />
                    <br />
                </div>
            );
        }
    }
}