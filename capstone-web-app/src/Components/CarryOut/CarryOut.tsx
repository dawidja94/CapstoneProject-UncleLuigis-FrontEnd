import React from "react";
import Navbar from "../Navigation/Navbar";
import Footer from "../Footer/Footer";
import ICarryOutProps from "./ICarryOutProps";
import ICarryOutState from "./ICarryOutState";
import MenuService from "../../Services/MenuService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as icons from "@fortawesome/free-solid-svg-icons";
import Beverage from "../../Models/Beverage";
import Food from "../../Models/Food";
import Spinner from "react-bootstrap/Spinner";
import { Redirect } from "react-router-dom";

export default class CarryOut extends React.Component<ICarryOutProps, ICarryOutState> {
    private menuService: MenuService;
    private customerLoggedIn: boolean;
    
    public constructor(props: any) {
        super(props);

        this.state = {
            beverageCartItems: [],
            foodCartItems: [],
            cartItems: [],
            foodAndBeverageCartItemsLoaded: false,
            showSpinner: true,
            customerLoggedIn: false,
            redirectToLogin: false,
            redirectToMenu: false
        };

        this.customerLoggedIn = false;
        this.menuService = new MenuService();
    }

    componentDidMount() {
        this.customerLoggedIn = localStorage.getItem("Customer ID") !== "" ? true : false; 
        let customerIdFromLS = localStorage.getItem("Customer ID");
        let customerId: number = 0;
    
        if (customerIdFromLS !== null) {
            customerId = parseInt(customerIdFromLS.toString());
        }

        if (localStorage.getItem("Customer ID")) {
            // API call, get all the cart items for the current customer.
            this.menuService.getAllCarryOutsInCart(customerId)
            .then((data) => {
                const loggedIn = localStorage.getItem("Customer ID") ? true : false;

                this.setState({
                    cartItems: data,
                    customerLoggedIn: loggedIn,
                    showSpinner: true
                }, () => {
                    console.log("Carry Out Cart checking state");
                    console.log(this.state);

                    let cartItems = this.state.cartItems;
                    let foodItems: Food[] = [];
                    let beverageItems: Beverage[] = [];
                    
                    cartItems.forEach(item => {
                        if (item.food) {
                            foodItems.push(new Food(item.food, item.foodQuantity, item.id));
                        }
                        else if (item.beverage) {
                            beverageItems.push(new Beverage(item.beverage, item.beverageQuantity, item.id));
                        }
                    });

                    this.setState({
                        foodCartItems: foodItems,
                        beverageCartItems: beverageItems,
                        foodAndBeverageCartItemsLoaded: true,
                        showSpinner: false
                    });
                });
            });
        }
        else {
            this.setState({
                showSpinner: false,
                customerLoggedIn: false
            })
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
                                    <br />
                                    <div className="text-right">
                                        <button className="btn btn-outline-danger" onClick={() => this.submitOrder()}>Submit Order</button>
                                    </div>
                                    <div className="text-center">
                                        <hr />
                                        <h1 className="font-weight-lighter custom"><FontAwesomeIcon icon={icons.faShoppingCart}/> Cart</h1>
                                        <br />
                                        {this.renderFoodCart()}
                                        <br />
                                        <br />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {this.state.redirectToLogin ? <Redirect to="/Login"/> : <div></div>}
                {this.state.redirectToMenu ? <Redirect to="/Menu"/> : <div></div>}
                <Footer />
            </div>
        );
    }

    private submitOrder(): void {
        this.customerLoggedIn = localStorage.getItem("Customer ID") !== "" ? true : false; 
        let customerIdFromLS = localStorage.getItem("Customer ID");
        let customerId: number = 0;
    
        if (customerIdFromLS !== null) {
            customerId = parseInt(customerIdFromLS.toString());
        }

        const requestBody = {
            Id: customerId,
            FirstName: localStorage.getItem("First name"),
            LastName: localStorage.getItem("Last name"),
            PhoneNumber: localStorage.getItem("Phone number"),
        }

        this.menuService.submitCarryOutOrder(requestBody)
        .then(response => {
            if (response) {
                localStorage.setItem("cartCount", "0");

                this.setState({
                    beverageCartItems: [],
                    cartItems: [],
                    foodAndBeverageCartItemsLoaded: false,
                    foodCartItems: []
                });
            }
        })
        .catch(reason => {
            console.log(reason);
        });
    }

    private renderFoodCart(): JSX.Element {
        if (this.state.foodCartItems.length > 0 && this.state.customerLoggedIn && !this.state.showSpinner) {
            return (
                <div className="table-container">
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
                            {this.state.foodCartItems.map((item, key) => {
                                return (
                                    <tr key={key}>
                                        <td>
                                            <button className="btn btn-danger" onClick={() => this.removeItemFromCart(item.carryOutRecordId)}>Remove</button>
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
                            {this.state.beverageCartItems.map((item, key) => {
                                return (
                                    <tr key={key}>
                                        <td>
                                            <button className="btn btn-danger" onClick={() => this.removeItemFromCart(item.carryOutRecordId)}>Remove</button>
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
        else if (!this.state.customerLoggedIn && !this.state.showSpinner) {
            return (
                <div>
                    <h5>Please login to add/view items in your cart!</h5>
                    <br />
                    <span>
                        <button className="btn btn-outline-danger" onClick={() => this.setState({redirectToLogin: true})}>{"Login"}</button> &nbsp;
                        <button className="btn btn-outline-danger" onClick={() => this.setState({redirectToMenu: true})}>View Menu</button>
                    </span>
                </div>
            );
        }
        else {
            if (this.state.showSpinner && !this.state.customerLoggedIn) {
                return (
                    <div>
                        <Spinner animation="border" role="status">
                            <span className="sr-only">Loading...</span>
                        </Spinner>
                    </div>
                );
            }
            else {
                return (
                    <div>
                        <h5>{localStorage.getItem("First name")}, you have no items in your cart!</h5>
                        <br />
                        <button className="btn btn-outline-danger" onClick={() => this.setState({redirectToMenu: true})}>View Menu</button>
                    </div>
                );
            }
        }
    }

    private removeItemFromCart(cartId: number): void {
        console.log("Checking cartId");
        console.log(cartId);

        let customerIdFromLS = localStorage.getItem("Customer ID");
        let customerId: number = 0;
    
        if (customerIdFromLS !== null) {
            customerId = parseInt(customerIdFromLS.toString());
        }

        const requestBody = {
            carryOutId: cartId,
            customerId: customerId
        }

        this.menuService.removeFromCart(requestBody)
        .then(data => {
            console.log("checking data");
            console.log(data);
            
            if (data) {
                // Call the API to get all the cart items.
                this.setState({
                    foodAndBeverageCartItemsLoaded: false
                }, () => {
                    this.menuService.getAllCarryOutsInCart(customerId)
                    .then((data) => {
                        this.setState({
                            cartItems: data
                        }, () => {
                            console.log("Carry Out Cart checking state");
                            console.log(this.state);

                            let count = data.length ?? 0;
                            localStorage.setItem("cartCount", count);

                            let cartItems = this.state.cartItems;
                            let foodItems: Food[] = [];
                            let beverageItems: Beverage[] = [];
                            
                            cartItems.forEach(item => {
                                if (item.food) {
                                    foodItems.push(new Food(item.food, item.foodQuantity, item.id));
                                }
                                else if (item.beverage) {
                                    beverageItems.push(new Beverage(item.beverage, item.beverageQuantity, item.id));
                                }
                            });

                            this.setState({
                                foodCartItems: foodItems,
                                beverageCartItems: beverageItems,
                                foodAndBeverageCartItemsLoaded: true
                            });
                        });
                    });
                });
            }
        })
    }
}