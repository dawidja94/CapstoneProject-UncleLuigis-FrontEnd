import React from "react";
import IMenuProps from "./IMenuProps";
import IMenuState from "./IMenuState";
import Navbar from "../Navigation/Navbar";
import Footer from "../Footer/Footer";
import Food from "../../Models/Food";
import Beverage from "../../Models/Beverage";
import CustomModal from "../CustomModal/CustomModal";
import MenuService from "../../Services/MenuService";
import LoginModal from "../LoginModal/LoginModal";

export default class Menu extends React.Component<IMenuProps, IMenuState> {
    private menuService: MenuService;
    
    constructor(props: any) {
        super(props);
        document.title = "Uncle Luigi's Bistro - Menu";
        this.state = {
            foodItems:  [],
            beverageItems: [],
            showLoginModal: false,
            showAddtoCartModal: false,
            showContinueWithActionModal: false,
            showNoLoginModal: false,
            modalBodyMessage: "Please login to add items to the carry-out cart! Thank you!",
            modalHeader: "Valued Customer"
        };

        this.menuService = new MenuService();
    }

    public componentDidMount() {
        this.props.foodItems.then(food => {
            let foodList: Food[] = [];

            // Push in a new Food item for each index along with a quantity of zero for each.
            food.forEach((item: any) => {
                foodList.push(new Food(item, 1, 0));
            });

            this.setState({
                foodItems: foodList
            }, () => {
                this.props.beverageItems.then(beverages => {
                    let beveragesList: Beverage[] = [];

                    // Push in a new Food item for each index along with a quantity of zero for each.
                    beverages.forEach((item: any) => {
                        beveragesList.push(new Beverage(item, 1, 0));
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
                                    <div className="card-container" key={key}>
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
                                    <div className="card col-lg-4-custom" key={key}>
                                        <div className="card-margin">
                                            <h4>{item.beverage.name}</h4>
                                            <span><h6>Description: <i>{item.beverage.description}</i></h6></span>
                                            <span><h6>Price: ${item.beverage.price.toFixed(2)}</h6></span>
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
                {this.state.showLoginModal ? <LoginModal 
                    show={this.state.showLoginModal} 
                    onCloseModal={this.closeLoginModal}
                    loginIsSuccessful={this.loginIsSuccessful}
                    /> 
                    : <div></div>}
                {this.state.showNoLoginModal ? <CustomModal {...this.props} useListOption={false} listMessages={[]} showLoginButton={true} title={this.state.modalHeader} body={this.state.modalBodyMessage} buttontitle={"Ok"} show={this.state.showNoLoginModal} onCloseModal={this.closeNoLoginModal} /> : <div></div>}
                {this.state.showAddtoCartModal ? <CustomModal {...this.props} useListOption={false} listMessages={[]} showLoginButton={false} title={"Added To Cart"} body={"Item added to cart!"} buttontitle={"Close"} show={this.state.showAddtoCartModal} onCloseModal={this.closeAddToCartModal} /> : <div></div>}
                {this.state.showContinueWithActionModal ? <CustomModal {...this.props} useListOption={false} listMessages={[]} showLoginButton={false} title={"Proceed"} body={"Your login was successful, please proceed with your previous action."} buttontitle={"Close"} show={this.state.showContinueWithActionModal} onCloseModal={this.closeActionModal} /> : <div></div>}
                <Footer />
            </div>
        );
    }

    private closeLoginModal = () => {
        this.setState({
            showLoginModal: false
        });
    }

    private closeNoLoginModal = () => {
        this.setState({
            showNoLoginModal: false
        });
    }

    private closeAddToCartModal = () => {
        this.setState({
            showAddtoCartModal: false
        });
    }

    private closeActionModal = () => {
        this.setState({
            showContinueWithActionModal: false
        });
    }
    
    /**
     * @function changeQuantityForFood
     * 
     * @description
     * This method is responsible for setting the quantity on each food menu item. 
     */
    private changeQuantityForFood = (e: any, key: number) => {
        let quantity: number = e.target.value  !== "" ? parseInt(e.target.value) : 0;
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
        let quantity: number = e.target.value  !== "" ? parseInt(e.target.value) : 0;
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
                showNoLoginModal: true,
                modalBodyMessage: "Please login to add items to carry out order. Thank you!",
                modalHeader: "Valued Customer"
            });
        }
        else {
            let customerIdFromLS = localStorage.getItem("Customer ID");
            let customerId: number = 0;

            if (customerIdFromLS !== null) {
                customerId = parseInt(customerIdFromLS.toString());
            }

            let carryOutItem = {};

            if (item.type === "food") {
                carryOutItem = {
                    id: 0,
                    bundleId: 0,
                    customerId: customerId,
                    food: item.food,
                    foodQuantity: quantity,
                    beverage: null,
                    beverageQuantity: 0,
                    submissionTime: null
                };
            }
            else if (item.type === "beverage") {
                carryOutItem = {
                    id: 0,
                    bundleId: 0,
                    customerId: customerId,
                    food: null,
                    foodQuantity: 0,
                    beverage: item.beverage,
                    beverageQuantity: quantity,
                    submissionTime: null
                };
            }

            this.menuService.addToCart(carryOutItem).then((response) => {
                if (response) {
                    this.menuService.getAllCarryOutsInCart(customerId)
                    .then((data: any) => {
                        let count = data.length ?? 0;
                        localStorage.setItem("cartCount", count);
                        
                        this.setState({
                            showAddtoCartModal: true,
                            showLoginModal: false
                        });
                    })
                    .catch((reason) => {
                    });
                }
            })
            .catch(reason => {
                this.setState({
                    showLoginModal: true
                });
            });
        }
    }

    private loginIsSuccessful = (): void => {
        this.setState({
            showLoginModal: false,
            showContinueWithActionModal: true
        });
    }
}