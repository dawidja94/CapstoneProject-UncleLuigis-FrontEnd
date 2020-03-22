import React from "react";
import Footer from "../Footer/Footer";
import Navbar from "../Navigation/Navbar";
import { Redirect } from "react-router-dom";
import ICarryOutListProps from "./ICarryOutListProps";
import ICarryOutListState from "./ICarryOutListState";
import MenuService from "../../Services/MenuService";
import { mockComponent } from "react-dom/test-utils";
import Moment from 'react-moment';
import moment from "moment";
import OrderConfirmationModal from "../OrderConfirmationModal/OrderConfirmationModal";
export default class CarryOutList extends React.Component<ICarryOutListProps, ICarryOutListState> {
    private menuService: MenuService
    private customerLoggedIn: boolean;
    public constructor(props: any) {
        super(props);

        this.menuService = new MenuService();
        this.customerLoggedIn = false;

        this.state = {
            orderList: [],
            customerLoggedIn: false,
            navigateToOrder: false,
            orderNumber: 0,
            redirectToLogin: false,
        };

    }

    public componentDidMount() {

        this.customerLoggedIn = localStorage.getItem("Customer ID") !== "" ? true : false; 
        let customerIdFromLS = localStorage.getItem("Customer ID");
        let customerId: number = 0;
    
        if (customerIdFromLS !== null) {
            customerId = parseInt(customerIdFromLS.toString());
        }
        
        this.menuService.getAllCarryOutsForCustomer(customerId)
        .then ((data) => {
            const loggedIn = localStorage.getItem("Customer ID") ? true : false;

            this.setState({
                orderList: data,
                customerLoggedIn: loggedIn,
                orderNumber: data.bundleId,
            }, () => {
                console.log(this.state);
            });
        })
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
                                    {this.displayOrders()}
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
                {this.state.redirectToLogin ? <Redirect to="/Login"/> : <div></div>}
                {this.state.navigateToOrder ? <Redirect to={{pathname: `/CarryOutOrder/${this.state.orderNumber}`}}/> : <div></div>}
            </div>
        )
    }

    private viewOrder(bundle: number) {
       this.setState({
           navigateToOrder: true,
           orderNumber: bundle
       })
    }
    
    private displayOrders = () => {
    {
        if (this.state.customerLoggedIn){
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
                        {this.state.orderList.map((item, index) => {
                            return  (
                                
                                <tr>
                                    <td>
                                        <button className="btn btn-danger" onClick={() => this.viewOrder(item.bundleId)}>View</button>
                                    </td>
                                    <td>{item.bundleId}</td>
                                    <td>{moment(item.submissionTime).format('MMM DD, YYYY')}</td>
                                </tr>
                                
                            );
                        })}
                        </tbody>
                        </table>
                        </div>
            );
        }
        else if (!this.customerLoggedIn){
            return (
                <div className="text-center">
                    <h5>Please login to view your orders!</h5>
                    <br />
                    <span>
                        <button className="btn btn-outline-danger"onClick={() => this.setState({redirectToLogin: true})} >{"Login"}</button> &nbsp;
                    </span>
                    <br />
                </div>
            );
        }
    }

    }
}