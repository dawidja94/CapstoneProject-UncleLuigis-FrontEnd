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
import OrderConfirmationModal from "../OrderConfirmationModal/OrderConfirmationModal";
import CustomModal from "../../Components/CustomModal/CustomModal";
import LoginModal from "../LoginModal/LoginModal";

export default class CarryOut extends React.Component<ICarryOutProps, ICarryOutState> {
    private menuService: MenuService;
    private customerLoggedIn: boolean;
    
    public constructor(props: any) {
        super(props);
        document.title = "Uncle Luigi's Bistro - Carry Out";
        this.state = {
            beverageCartItems: [],
            foodCartItems: [],
            cartItems: [],
            foodAndBeverageCartItemsLoaded: false,
            showSpinner: true,
            customerLoggedIn: false,
            redirectToLogin: false,
            redirectToMenu: false,
            showSubmitOrderConfirmationModal: false,
            showThankYouModal: false,
            showRemoveItemModal: false,
            showLoginModal: false,
            cartIdToRemove: 0,
            showContinueWithActionModal: false
        };

        this.customerLoggedIn = false;
        this.menuService = new MenuService();
    }

    componentDidMount() {
        this.getAllCarryOutsInCart();
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
                                        <h1 className="font-weight-lighter custom"><FontAwesomeIcon icon={icons.faShoppingCart}/> Cart</h1>
                                        <hr />
                                    </div>
                                    <br />
                                    {this.renderSummary()}
                                    {this.renderFoodCart()}
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
                {this.state.redirectToLogin ? <Redirect push to="/Login"/> : <div></div>}
                {this.state.redirectToMenu ? <Redirect push to="/Menu"/> : <div></div>}
                {this.state.showSubmitOrderConfirmationModal ? <OrderConfirmationModal showRemoveItemButton={false} onRemoveItemClick={(this.submitOrder)} showSubmitOrderButton={true} title={"Order Confirmation"} body={"Please confirm your intent to submit this carry-out order."} buttontitle={"Close"} onSubmitOrderClick={this.submitOrder} show={this.state.showSubmitOrderConfirmationModal} onCloseModal={this.closeSubmitOrderConfirmationModal}></OrderConfirmationModal> : <div></div>}
                {this.state.showThankYouModal ? <OrderConfirmationModal showRemoveItemButton={false} onRemoveItemClick={(this.submitOrder)} showSubmitOrderButton={false} title={"Thank You!"} body={"Thank you for your carry-out order!"} buttontitle={"Close"} onSubmitOrderClick={this.submitOrder} show={this.state.showThankYouModal} onCloseModal={this.closeThankYouModal}></OrderConfirmationModal> : <div></div>}
                {this.state.showRemoveItemModal ? <OrderConfirmationModal onRemoveItemClick={this.removeItemFromCart} showRemoveItemButton={true} showSubmitOrderButton={false} title={"Remove Item"} body={"Are you sure you want to remove this item from your cart?"} buttontitle={"No"} onSubmitOrderClick={this.submitOrder} show={this.state.showRemoveItemModal} onCloseModal={this.closeRemoveItemFromCartModal}></OrderConfirmationModal> : <div></div>}
                {this.state.showContinueWithActionModal ? <CustomModal {...this.props} useListOption={false} listMessages={[]} showLoginButton={false} title={"Proceed"} body={"Your login was successful, please proceed with your previous action."} buttontitle={"Close"} show={this.state.showContinueWithActionModal} onCloseModal={this.closeActionModal} /> : <div></div>}
                <Footer />
            </div>
        );
    }

    private getAllCarryOutsInCart(): void {
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

    private closeLoginModal = () => {
        this.setState({
            showLoginModal: false
        });
    }

    private closeActionModal = () => {
        this.setState({
            showContinueWithActionModal: false
        });
    }

    private closeThankYouModal = () => {
        this.setState({
            showThankYouModal: false
        });
    }

    private closeSubmitOrderConfirmationModal = () => {
        this.setState({
            showSubmitOrderConfirmationModal: false
        });
    }

    private getSubTotal(): number {
        let subTotal = 0.0;

        this.state.foodCartItems.forEach(item => {
            subTotal += (item.food.price * item.quantity); 
        });

        this.state.beverageCartItems.forEach(item => {
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

    private onClickSubmitOrder = (): void => {
        this.setState({
            showSubmitOrderConfirmationModal: true
        });
    }

    private submitOrder = (): void => {
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
                    foodCartItems: [],
                    showSubmitOrderConfirmationModal: false,
                    showThankYouModal: true
                });
            }
        })
        .catch(reason => {
            this.setState({
                showLoginModal: true,
                showSubmitOrderConfirmationModal: false
            });
        });
    }

    private renderSummary(): JSX.Element {
        if ((this.state.foodCartItems.length > 0 || this.state.beverageCartItems.length > 0) && this.state.customerLoggedIn && !this.state.showSpinner) {
            return (
                <div className="row">
                    <div className="col-lg-6 col-sm-6">
                        <h3>Pickup Location</h3>
                        <div><h5>1 University Pkwy,</h5></div>
                        <div><h5>Romeoville, IL 60446</h5></div>
                        <div><h5>Customer: {localStorage.getItem("First name")} {localStorage.getItem("Last name")}</h5></div>
                        <br />
                        <div>
                            <button className="btn btn-danger" onClick={() => this.onClickSubmitOrder()}>Submit Order</button>
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
            );
        }
        else {
            return (
                <div></div>
            );
        }
    }

    private renderFoodCart(): JSX.Element {
        if ((this.state.foodCartItems.length > 0 || this.state.beverageCartItems.length > 0) && this.state.customerLoggedIn && !this.state.showSpinner) {
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
                                            <button className="btn btn-outline-danger" onClick={() => this.onClickRemoveItemFromCart(item.carryOutRecordId)}>Remove</button>
                                        </td>
                                        <td>
                                            {item.food.name}
                                        </td>
                                        <td>
                                            ${item.food.price.toFixed(2)}
                                        </td>
                                        <td>
                                            <button className="btn btn-outline-danger quantity" onClick={() => this.decrementQuantity(item)}>-</button>
                                            <input type="string" value={item.quantity} className="form-control quantity" readOnly />
                                            <button className="btn btn-outline-danger quantity" onClick={() => this.incrementQuantity(item)}>+</button>                                                                                    </td>
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
                                            <button className="btn btn-outline-danger" onClick={() => this.onClickRemoveItemFromCart(item.carryOutRecordId)}>Remove</button>
                                        </td>
                                        <td>
                                            {item.beverage.name}
                                        </td>
                                        <td>
                                            ${item.beverage.price.toFixed(2)}
                                        </td>
                                        <td>
                                            <button className="btn btn-outline-danger quantity" onClick={() => this.decrementQuantity(item)}>-</button>
                                            <input type="string" value={item.quantity} className="form-control quantity" readOnly />
                                            <button className="btn btn-outline-danger quantity" onClick={() => this.incrementQuantity(item)}>+</button>
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
                <div className="text-center">
                    <h5>Please login to add/view items in your cart!</h5>
                    <br />
                    <span>
                        <button className="btn btn-outline-danger" onClick={() => this.setState({redirectToLogin: true})}>{"Login"}</button> &nbsp;
                        <button className="btn btn-outline-danger" onClick={() => this.setState({redirectToMenu: true})}>View Menu</button>
                    </span>
                    <br />
                </div>
            );
        }
        else {
            if (this.state.showSpinner && !this.state.customerLoggedIn) {
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
                        <h5>{localStorage.getItem("First name")}, you have no items in your cart!</h5>
                        <br />
                        <button className="btn btn-outline-danger" onClick={() => this.setState({redirectToMenu: true})}>View Menu</button>
                        <br />
                    </div>
                );
            }
        }
    }

    private incrementQuantity = (item: any) => {
        let customerIdFromLS = localStorage.getItem("Customer ID");
        let customerId: number = 0;
    
        if (customerIdFromLS !== null) {
            customerId = parseInt(customerIdFromLS.toString());
        }

        const requestBody = {
            id: item.carryOutRecordId,
            bundleId: 0,
            food: null,
            foodQuantity: item.type === "food" ? item.quantity + 1: -99,
            beverage: null,
            beverageQuantity: item.type === "beverage" ? item.quantity + 1: -99,
            submissionTime: null,
            customerId: customerId
        }

        this.menuService.updateCarryOutOrder(requestBody).then(response => {
            this.getAllCarryOutsInCart();
        })
        .catch(reason => {
            
        });
    }

    private decrementQuantity = (item: any) => {
        let customerIdFromLS = localStorage.getItem("Customer ID");
        let customerId: number = 0;
    
        if (customerIdFromLS !== null) {
            customerId = parseInt(customerIdFromLS.toString());
        }

        const requestBody = {
            id: item.carryOutRecordId,
            bundleId: 0,
            food: null,
            foodQuantity: item.type === "food" ? item.quantity - 1: -99,
            beverage: null,
            beverageQuantity: item.type === "beverage" ? item.quantity - 1: -99,
            submissionTime: null,
            customerId: customerId
        }

        this.menuService.updateCarryOutOrder(requestBody).then(response => {
            this.getAllCarryOutsInCart();
        })
        .catch(reason => {
            
        });
    }

    private closeRemoveItemFromCartModal = (): void => {
        this.setState({
            showRemoveItemModal: false
        });
    }

    private onClickRemoveItemFromCart = (cartId: number):void => {
        this.setState({
            showRemoveItemModal: true,
            cartIdToRemove: cartId
        });
    }

    private removeItemFromCart = (): void => {
        let customerIdFromLS = localStorage.getItem("Customer ID");
        let customerId: number = 0;
    
        if (customerIdFromLS !== null) {
            customerId = parseInt(customerIdFromLS.toString());
        }

        const requestBody = {
            carryOutId: this.state.cartIdToRemove,
            customerId: customerId
        }

        this.menuService.removeFromCart(requestBody)
        .then(data => {
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
                                foodAndBeverageCartItemsLoaded: true,
                                showRemoveItemModal: false
                            });
                        });
                    });
                });
            }
        })
        .catch(reason => {
            this.setState({
                showLoginModal: true,
                showRemoveItemModal: false
            });
        })
    }

    private loginIsSuccessful = (): void => {
        this.setState({
            showLoginModal: false,
            showContinueWithActionModal: true
        });
    }
}