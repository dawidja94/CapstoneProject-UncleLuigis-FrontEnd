import React from "react";
import Navbar from "../Navigation/Navbar";
import Footer from "../Footer/Footer";
import ICarryOutOrderState from "./ICarryOutOrderState";
import MenuService from "../../Services/MenuService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as icons from "@fortawesome/free-solid-svg-icons";
import Beverage from "../../Models/Beverage";
import Food from "../../Models/Food";
import { Redirect } from "react-router-dom";

export default class CarryOutOrder extends React.Component<any, ICarryOutOrderState> {
    private menuService: MenuService;
    private customerLoggedIn: boolean;
    
    public constructor(props: any) {
        super(props);
        document.title = "Uncle Luigi's Bistro - View Order";
        this.menuService = new MenuService();
        this.customerLoggedIn = false;
        this.state = {
                orderItems: [],
                customerLoggedIn: false,
                foodOrderItems: [],
                beverageOrderItems: [],
                showViewOrdersModal: false,
                redirectToOrderList: false,
        };

    }

    public componentDidMount() {
        let bundleId: number = 0;
        let customerId: number = 0;
        let customerIdFromLS = localStorage.getItem("Customer ID");
        
        if (customerIdFromLS !== null ){
            customerId = parseInt(customerIdFromLS.toString());
        }

        bundleId = parseInt(this.props.match.params.id);
        this.menuService.getCarryOutById(bundleId)
        .then((data) => {
            this.setState({
                    orderItems: data,
                }, () => {
                    
                    let cartItems = this.state.orderItems;
                    let foodItems: Food[] = [];
                    let beverageItems: Beverage[] = [];
                    cartItems.forEach(item => {
                        //check if the id of logged customer matches the order's customer id
                        if(item.customer.id === customerId){
                            if (item.food) {
                                foodItems.push(new Food(item.food, item.foodQuantity, item.id));
                            }
                            else if (item.beverage) {
                                beverageItems.push(new Beverage(item.beverage, item.beverageQuantity, item.id));
                            }
                        }
                        //if this order does not belong to logged customer,
                        //take them back to their order list
                        else if (item.customer.id !== customerId){
                            
                            this.setState({
                                redirectToOrderList: true
                            });
                        }
                       
                    });

                    this.setState({
                        foodOrderItems: foodItems,
                        beverageOrderItems: beverageItems,
                    });
                });
            
    
        });
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
                                        <h1 className="font-weight-lighter custom"><FontAwesomeIcon icon={icons.faShoppingCart}/> Order Details</h1>
                                        <hr />
                                    </div>
                                    <br />
                                    {this.renderSummary()}
                                    {this.displayOrder()}
                                    <br />
                                    <br />
                                    <br />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {this.state.redirectToOrderList ? <Redirect push to="/CarryOutList"/> : <div></div>}
                <Footer />
            </div>
        );
    }

    private getSubTotal(): number {
        let subTotal = 0.0;

        this.state.foodOrderItems.forEach(item => {
            subTotal += (item.food.price * item.quantity); 
        });

        this.state.beverageOrderItems.forEach(item => {
            subTotal += (item.beverage.price * item.quantity);
        });

        return subTotal;
    }
    private getTotal(): number {
        let total = this.getSubTotal();
        let salesTax = 0.0725;

        let taxableAmount = total * salesTax;
        total += taxableAmount;

        return total;
    }
    private renderSummary(): JSX.Element {
        
            return (
                <div className="row">
                    <div className="col-lg-6 col-sm-6">
                        <h3>Pickup Location</h3>
                        <div><h5>1 University Pkwy,</h5></div>
                        <div><h5>Romeoville, IL 60446</h5></div>
                        <div><h5>Customer: {localStorage.getItem("First name")} {localStorage.getItem("Last name")}</h5></div>
                        <br />
                        <div>
                            
                        </div>
                        <div>
                            <label></label>
                        </div>
                    </div>
                    <div className="col-lg-6 col-sm-6">
                        <h3 className="text-left">Order Summary</h3>
                        <table className="table table-bordered">
                            <tbody>
                                <tr>
                                    <td>Sub-Total: </td>
                                    <td> ${this.getSubTotal().toFixed(2)}</td>
                                </tr>
                                <tr>
                                    <td>Sales Tax: </td>
                                    <td> 7.25% (IL)</td>
                                </tr>
                                <tr>
                                    <td>Total: </td>
                                    <td> ${this.getTotal().toFixed(2)}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <br />
                    <br />
                </div>
            
            )}
    

    private displayOrder(): JSX.Element {
        return (
            <div className="table-container">
                <br />
                <table className="table table-hover">
                    <thead className="text-left">
                        <tr>
                            <th className="font-weight-normal"></th> 
                            <th>Item</th>
                            <th>Price each</th>
                            <th>Quantity</th>
                            <th>Sub-Total</th>
                        </tr>
                    </thead>
                    <tbody className="text-left">
                        {this.state.foodOrderItems.map((item, key) => {
                            return (
                                <tr key={key}>
                                    <td>
                        
                                    </td>
                                    <td>
                                        {item.food.name}
                                    </td>
                                    <td>
                                        ${item.food.price.toFixed(2)}
                                    </td>
                                    <td>
                                        {item.quantity}
                                    </td>
                                    <td>
                                        ${(item.quantity * item.food.price).toFixed(2)}
                                    </td>
                                </tr>
                            );
                        })}
                        {this.state.beverageOrderItems.map((item, key) => {
                            return (
                                <tr key={key}>
                                    <td>
                                        
                                    </td>
                                    <td>
                                        {item.beverage.name}
                                    </td>
                                    <td>
                                        ${item.beverage.price.toFixed(2)}
                                    </td>
                                    <td>
                                        {item.quantity}
                                    </td>
                                    <td>
                                        ${(item.quantity * item.beverage.price).toFixed(2)}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        );
    }
}