import React from "react";
import Footer from "../Footer/Footer";
import Navbar from "../Navigation/Navbar";
import { Redirect } from "react-router-dom";
import ICarryOutListProps from "./ICarryOutListProps";
import ICarryOutListState from "./ICarryOutListState";
import MenuService from "../../Services/MenuService";
import moment from "moment";
import Spinner from "react-bootstrap/Spinner";
require('moment-timezone');

export default class CarryOutList extends React.Component<ICarryOutListProps, ICarryOutListState> {
    private menuService: MenuService
    private customerLoggedIn: boolean;
    public constructor(props: any) {
        super(props);
        document.title = "Uncle Luigi's Bistro - Carry Out List";
        this.menuService = new MenuService();
        this.customerLoggedIn = false;

        this.state = {
            orderList: [],
            customerLoggedIn: false,
            navigateToOrder: false,
            orderNumber: 0,
            redirectToLogin: false,
            currentPage: 1,
            ordersPerPage: 8,
            showSpinner: true,
            activeIndex: 1 
        };
    }

    public componentDidMount() {
        const loggedIn = localStorage.getItem("Customer ID") ? true : false;        
        let customerIdFromLS = localStorage.getItem("Customer ID");
        let customerId: number = 0;
    
        if (customerIdFromLS !== null) {
            customerId = parseInt(customerIdFromLS.toString());
        }
        
        if (loggedIn) {
            this.setState({
                showSpinner: true,
                customerLoggedIn: loggedIn
            }, () => {
                this.menuService.getAllCarryOutsForCustomer(customerId)
                .then ((data) => {
                    this.setState({
                        orderList: data,
                        orderNumber: data.bundleId,
                        showSpinner: false
                    });
                })
            })
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
                            <h3 className="text-center">Your Orders</h3>
                            <hr />
                            <div className="row">
                                <div className="col-12">
                                {this.Pagination(this.state.ordersPerPage, this.state.orderList.length)}
                                    {this.displayOrders(this.state.orderList)}
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
                {this.state.navigateToOrder ? <Redirect push to={{pathname: `/CarryOutOrder/${this.state.orderNumber}`}}/> : <div></div>}
            </div>
        )
    }

    private viewOrder(bundle: number) {
       this.setState({
           navigateToOrder: true,
           orderNumber: bundle
       })
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
        if (totalOrders > 8 )
        {
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
                  
    }
    
    private displayOrders = (orderList: any []) => {
       if (this.state.customerLoggedIn && this.state.orderList.length > 0) {
            let indexOfLastOrder: number = this.state.currentPage * this.state.ordersPerPage;
            let indexOfFirstOrder: number = indexOfLastOrder - this.state.ordersPerPage;
            let currentOrders: any [] = orderList.slice(indexOfFirstOrder, indexOfLastOrder);
            return (
                <div className="table-container">
                    <table className="table table-hover">
                        <thead className="text-left">
                            <tr>
                                <th className="font-weight-normal"></th> 
                                <th>Order ID</th>
                                <th>Order Date</th>
                            </tr>
                        </thead>
                        <tbody className="text-left">
                        {currentOrders.map((item, index) => {
                            return  (
                                <tr key={index}>
                                    <td>
                                        <button className="btn btn-danger" onClick={() => this.viewOrder(item.bundleId)}>View</button>
                                    </td>
                                    <td>{item.bundleId}</td>
                                    <td>{moment.tz(item.submissionTime, 'America/Chicago').subtract(5, 'h').format('MMM DD, YYYY, h:mm:ss a z')}</td>
                                </tr>
                                
                            );
                        })}
                        </tbody>
                        </table>
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
        else if (this.state.showSpinner && !this.customerLoggedIn){
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
        else {
            return (
                <div className="text-center">
                    <br />
                    <br />
                    <h5>No Orders To Display</h5>
                    <br />
                    <br />
                </div>
            );
        }
    }
}