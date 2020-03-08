import React from "react";
import IMenuProps from "./IMenuProps";
import IMenuState from "./IMenuState";
import Navbar from "../Navigation/Navbar";
import Footer from "../Footer/Footer";
import Food from "../../Models/Food";
import Beverage from "../../Models/Beverage";
import CustomModal from "../CustomModal/CustomModal";

export default class Menu extends React.Component<IMenuProps, IMenuState> {
    constructor(props: any) {
        super(props);

        this.state = {
            foodItems:  [],
            beverageItems: [],
            showLoginModal: false,
        };
    }

    public componentDidMount() {
        this.props.foodItems.then(food => {
            let foodList: Food[] = [];

            // Push in a new Food item for each index along with a quantity of zero for each.
            food.forEach((item: any) => {
                foodList.push(new Food(item, 1));
            });

            this.setState({
                foodItems: foodList
            }, () => {
                this.props.beverageItems.then(beverages => {
                    let beveragesList: Beverage[] = [];

                    // Push in a new Food item for each index along with a quantity of zero for each.
                    beverages.forEach((item: any) => {
                        beveragesList.push(new Beverage(item, 1));
                    });

                    this.setState({
                        beverageItems: beveragesList
                    });
                })
            });
        })
    }

    render() {
        return (
            <div>
                <Navbar/>
                <br />
                <br />
                <br />
                {this.state.foodItems.length > 0 ? 
                <div className="container">
                    <div className="row">
                        <div className="card">
                            <div className="col-lg-12 col-sm-12 col-md-12 justify-content-center">
                                <br />
                                <h2 className="text-center menu-header">Food Menu</h2>
                                <hr />
                                {this.state.foodItems.map((item, key) => {
                                    return (
                                    <div className="card-container">
                                        <div className="card">
                                            <div className="card-margin">
                                                <div className="row">
                                                    <div className="col-lg-6 col-md-12 col-sm-12">
                                                        <h4>{item.food.name}</h4>
                                                        <div className="custom-card-image">
                                                            <img className="card-img-top custom" src={`/Images/Food/${item.food.imageURL}`} alt="Food"></img>
                                                        </div>
                                                        <br className="menu-item-break"/>
                                                    </div>
                                                    <div className="col-lg-6 col-md-12 col-sm-12">
                                                        <div className="card-right-section">
                                                            <hr />
                                                            <span><h6>Category: {item.food.type}</h6></span>
                                                            <span><h6>Gluten Free: {item.food.glutenFree ? "Yes" : "No"}</h6></span>
                                                            <span><h6>Vegan: {item.food.vegan ? "Yes" : "No"}</h6></span>
                                                            <span><h6>Description: <i>{item.food.description}</i></h6></span>
                                                            <span><h6>Price: ${item.food.price}</h6></span>
                                                            <span>
                                                                <h6>Quantity:</h6>
                                                                <select className="form-control quantity-custom" value={item.quantity} onChange={(e) => this.changeQuantityForFood(e, key)}>
                                                                    <option></option>
                                                                    <option>1</option>
                                                                    <option>2</option>
                                                                    <option>3</option>
                                                                    <option>4</option>
                                                                    <option>5</option>
                                                                </select>
                                                            </span>
                                                            <button className="btn btn-outline-danger custom" onClick={() => this.addToCart(item, item.quantity)}>Add To Carry Out</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <br />
                                    </div>);
                                })}
                            </div>
                        </div>
                    </div>
                    <br />
                    <div className="container card">
                        <br />
                        <h2 className="text-center menu-header-beverage">Beverage Menu</h2>
                        <hr />
                        <div className="row justify-content-md-center">
                            {this.state.beverageItems.map((item, key) => {
                                return (
                                    <div className="card col-lg-4-custom">
                                        <div className="card-margin">
                                            <h4>{item.beverage.name}</h4>
                                            <span><h6>Description: <i>{item.beverage.description}</i></h6></span>
                                            <span><h6>Price: ${item.beverage.price}</h6></span>
                                            <span>
                                                <h6>Quantity:</h6>
                                                <select className="form-control quantity-custom" value={item.quantity} onChange={(e) => this.changeQuantityForBeverages(e, key)}>
                                                    <option>1</option>
                                                    <option>2</option>
                                                    <option>3</option>
                                                    <option>4</option>
                                                    <option>5</option>
                                                </select>
                                            </span>
                                            <button className="btn btn-outline-danger custom" onClick={() => this.addToCart(item, item.quantity)}>Add To Carry Out</button>
                                        </div>
                                    </div>
                                );
                            })}
                            <br />
                            <br />
                        </div>
                        <div>
                            &nbsp;
                        </div>
                    </div>
                </div> : ""}
                {this.state.showLoginModal ? <CustomModal {...this.props} showLoginButton={true} title={"Valued Customer"} body={"Please login to add items to carry out order. Thank you!"} buttontitle={"Ok"} show={this.state.showLoginModal} onCloseModal={this.closeLoginModal} /> : <div></div>}
                <Footer />
            </div>
        );
    }

    private closeLoginModal = () => {
        this.setState({
            showLoginModal: false
        });
    }
    
    /**
     * @function changeQuantityForFood
     * 
     * @description
     * This method is responsible for setting the quantity on each food menu item. 
     */
    private changeQuantityForFood = (e: any, key: number) => {
        let quantity: number = e.target.value  != "" ? parseInt(e.target.value) : 0;
        let foodItems = this.state.foodItems;

        foodItems[key].quantity = quantity;

        this.setState({
            foodItems: foodItems
        });
    }

    /**
     * @function changeQuantityForBeverages
     * 
     * @description
     * This method is responsible for setting the quantity on each food menu item. 
     */
    private changeQuantityForBeverages = (e: any, key: number) => {
        let quantity: number = e.target.value  != "" ? parseInt(e.target.value) : 0;
        let beverageItems = this.state.beverageItems;

        beverageItems[key].quantity = quantity;

        this.setState({
            beverageItems: beverageItems
        });
    }

    private addToCart = (item: any, quantity: number) => {
        // If we don't have a logged in user.
        if (!localStorage.getItem("First name") && !localStorage.getItem("Last name")) {
            this.setState({
                showLoginModal: true
            });
        }
        else {
            if (item.type === "food") {
                this.props.addItem(item.food, quantity, item.type);

                setTimeout(() => {
                    this.forceUpdate();
                }, 1200);
            }
            else if (item.type === "beverage") {
                this.props.addItem(item.beverage, quantity, item.type);

                setTimeout(() => {
                    this.forceUpdate();
                }, 1200);
            }

            
        }
    }
}