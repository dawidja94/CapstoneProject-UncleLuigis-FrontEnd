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

export default class CarryOut extends React.Component<ICarryOutProps, ICarryOutState> {
    private menuService: MenuService;
    
    public constructor(props: any) {
        super(props);

        this.state = {
            beverageCartItems: [],
            foodCartItems: [],
            cartItems: [],
            foodAndBeverageCartItemsLoaded: false
        };

        this.menuService = new MenuService();
    }

    componentDidMount() {
        let customerIdFromLS = localStorage.getItem("Customer ID");
        let customerId: number = 0;
    
        if (customerIdFromLS !== null) {
            customerId = parseInt(customerIdFromLS.toString());
        }

        // API call, get all the cart items for the current customer.
        this.menuService.getAllCarryOutsInCart(customerId)
        .then((data) => {
            this.setState({
                cartItems: data
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
                    foodAndBeverageCartItemsLoaded: true
                });
            });
        });
    }

    render() {
        console.log(this.state);
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
                                        <h1 className="font-weight-lighter custom"><FontAwesomeIcon icon={icons.faShoppingCart}/> Cart</h1>
                                        <br />
                                        { this.state.foodAndBeverageCartItemsLoaded ? this.renderFoodCart() : 
                                        <Spinner animation="border" role="status">
                                            <span className="sr-only">Loading...</span>
                                        </Spinner>
                                        }
                                        <br />
                                        <br />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <Footer />
            </div>
        );
    }

    private renderFoodCart(): JSX.Element {
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
                                        ${item.food.price}
                                    </td>
                                    <td>
                                        {item.quantity}
                                    </td>
                                    <td>
                                        ${item.quantity * item.food.price}
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
                                        ${item.beverage.price}
                                    </td>
                                    <td>
                                        {item.quantity}
                                    </td>
                                    <td>
                                        ${item.quantity * item.beverage.price}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        );
    }

    private renderBeverageCart(): JSX.Element {
        return (
            <div>
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
                        {this.state.beverageCartItems.map((item, key) => {
                            return (
                                <tr key={key}>
                                    <td>
                                        <button className="btn btn-danger">Remove</button>
                                    </td>
                                    <td>
                                        {item.beverage.name}
                                    </td>
                                    <td>
                                        ${item.beverage.price}
                                    </td>
                                    <td>
                                        {item.quantity}
                                    </td>
                                    <td>
                                        ${item.quantity * item.beverage.price}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        );
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