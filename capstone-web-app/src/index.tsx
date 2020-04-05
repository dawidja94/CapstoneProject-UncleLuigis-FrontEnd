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
import CarryOut from './Components/CarryOut/CarryOut';
import ForgetPassword from './Components/ForgetPassword/ForgetPassword';
import ChangePassword from './Components/ChangePassword/ChangePassword';
import Portal from './Components/Portal/Portal';
import Reservations from './Components/Reservations/Reservations';
import Contact from './Components/Contact/Contact';
import CarryOutList from './Components/CarryOutList/CarryOutList'
import CarryOutOrder from './Components/CarryOutOrder/CarryOutOrder';
import ReservationList from './Components/ReservationList/ReservationList';

const menuService = new MenuService();
const foodMenuItems = menuService.getAllFoodMenuItems();
const beverageMenuItems = menuService.getAllBeverageMenuItems();

let count: number = 23;

function countUp(message: string) {
    count++;
}

function getCountInCustomerCart() {
    let customerIdFromLS = localStorage.getItem("Customer ID");
    let customerId: number = 0;

    if (customerIdFromLS !== null) {
        customerId = parseInt(customerIdFromLS.toString());
    }

    menuService.getAllCarryOutsInCart(customerId)
    .then((data: any) => {
        let count = data.length ?? 0;
        localStorage.setItem("cartCount", count);
    })
    .catch((reason) => {
        console.log(reason);
    });
}

function addItemToCarryOutCart(item: any, quantity: number, type: string): any {
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

    menuService.addToCart(carryOutItem).then((response) => {
        getCountInCustomerCart();
        return response;
    });
}

const routing = (
    <Router>
            <Switch>
                <ScrollToTop>
                    <Route exact path="/" component={App} />
                    <Route exact path="/Home" component={App} />
                    <Route exact path="/Register" component={CustomerRegistration} />
                    <Route exact path="/Portal" component={Portal} />
                    <Route exact path="/ForgetPassword" component={ForgetPassword} />
                    <Route exact path="/ChangePassword" component={ChangePassword} />
                    <Route exact path="/UserProfile/:id" component={UserProfile}/>
                    <Route exact path="/Reservations" component={Reservations} />
                    <Route exact path="/Contact" component={Contact} />
                    <Route exact path="/CarryOutOrder/:id" component={CarryOutOrder}/>
                    <Route path="/Login" render={(props) => <Login {...props} />} />
                    <Route path="/Menu" render={(props) => <Menu {...props} addItem={addItemToCarryOutCart} countUp={countUp} foodItems={foodMenuItems} beverageItems={beverageMenuItems}/>} />
                    <Route path="/CarryOut" render={(props) => <CarryOut {...props} />} />
                    <Route path="/CarryOutList" render={(props) => <CarryOutList/>} />
                    <Route path="/ReservationList" render={(props) => <ReservationList/>} />
                </ScrollToTop>
            </Switch>
    </Router>
)

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
