import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
// @ts-ignore
import ScrollToTop from 'react-router-scroll-top'
import 'bootstrap/dist/css/bootstrap.css';
import {
    BrowserRouter as Router,
    Switch,
    Route
  } from "react-router-dom";
import CustomerRegistration from './Components/CustomerRegistration/CustomerRegistration';
import UserProfile from './Components/UserProfile/UserProfile';
import Menu from './Components/Menu/Menu';
import MenuService from './Services/MenuService';
import Login from './Components/Login/Login';

const menuService = new MenuService();
const foodMenuItems = menuService.getAllFoodMenuItems();
const beverageMenuItems = menuService.getAllBeverageMenuItems();

let count: number = 0;
let cart: any = [];
let cartItemsCount: number = 0;



function countUp(message: string) {
    count++;
    console.log("count: " + count);
    console.log("message: " + message);
}

function getCountInCustomerCart() {
    menuService.getAllCarryOutsInCart(4)
    .then(data => {
        cartItemsCount = data.length;
    });
}

function addItemToCarryOutCart(item: any, quantity: number, type: string) {
    let customerIdFromLS = localStorage.getItem("Customer ID");
    let customerId: number = 0;

    if (customerIdFromLS !== null) {
        customerId = parseInt(customerIdFromLS.toString());
    }

    let carryOutItem = {};

    if (type === "food") {
        carryOutItem = {
            id: 0,
            bundleId: 0,
            customerId: customerId,
            food: item,
            foodQuantity: quantity,
            beverage: null,
            beverageQuantity: 0,
            submissionTime: null
        };
    }
    else if (type === "beverage") {
        carryOutItem = {
            id: 0,
            bundleId: 0,
            customerId: customerId,
            food: null,
            foodQuantity: 0,
            beverage: item,
            beverageQuantity: quantity,
            submissionTime: null
        };
    }

    menuService.addToCart(carryOutItem).then(() => {
        getCountInCustomerCart();
    });
}

const routing = (
    <Router>
        <Switch>
            <ScrollToTop>
                <Route exact path="/" component={App} />
                <Route exact path="/Register" component={CustomerRegistration} />
                <Route exact path="/UserProfile/:id" component={UserProfile}/>
                <Route path="/Login" render={(props) => <Login {...props} />} />
                {/* <Route exact path="/Menu" component={Menu} /> */}
                <Route path="/Menu" render={(props) => <Menu {...props} cartItemCount={cartItemsCount} addItem={addItemToCarryOutCart} countUp={countUp} foodItems={foodMenuItems} beverageItems={beverageMenuItems}/>} />
            </ScrollToTop>
        </Switch>
    </Router>
)

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
