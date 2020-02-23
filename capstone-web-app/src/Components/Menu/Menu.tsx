import React from "react";
import IMenuProps from "./IMenuProps";
import IMenuState from "./IMenuState";
import Navbar from "../Navbar";
import ConstantStrings from "../../Constants/ConstantStrings";

export default class Menu extends React.Component<IMenuProps, IMenuState> {
    constructor(props: any) {
        super(props);

        this.state = {
            foodItems:  []
        };
    }

    public componentDidMount() {
        fetch(`${ConstantStrings.baseAzureURL}Food/GetAllFood`)
        .then(response => {
            if (response.status === 200) {
                return response.json();
            }
        })
        .then(data => {
            this.setState({
                foodItems: data
            }, () => console.log(this.state.foodItems));
        })
        .catch(reason => {
            console.log("Error with /Food/GetAllFood api call.");
        });
    }

    render() {
        return (
            <div>
                <Navbar />
                <br />
                <br />
                <br />
                <div className="container">
                    <div className="row">
                        <div className="col-lg-1"></div>
                        <div className="col-lg-10 col-sm-12 col-md-12">
                            {this.state.foodItems.map((item, key) => {
                                return (
                                <div className="card-container">
                                    <div className="card">
                                        <div className="card-margin">
                                            <div className="row">
                                                <div className="col-lg-6 col-md-12 col-sm-12">
                                                    <h4>{item.name}</h4>
                                                    <div className="custom-card-image">
                                                        <img className="card-img-top custom" src={`/Images/Food/${item.imageURL}`}></img>
                                                    </div>
                                                    <br />
                                                </div>
                                                <div className="col-lg-6 col-md-12 col-sm-12">
                                                    <div className="card-right-section">
                                                        <br />
                                                        <span><h6>Category: {item.type}</h6></span>
                                                        <span><h6>Gluten Free: {item.glutenFree ? "Yes" : "No"}</h6></span>
                                                        <span><h6>Vegan: {item.vegan ? "Yes" : "No"}</h6></span>
                                                        <span><h6>Description: <i>{item.description}</i></h6></span>
                                                        <span><h6>Price: ${item.price}</h6></span>
                                                        <span>
                                                            <h6>Quantity:</h6>
                                                            <select className="form-control quantity-custom">
                                                                <option></option>
                                                                <option>1</option>
                                                                <option>2</option>
                                                                <option>3</option>
                                                                <option>4</option>
                                                                <option>5</option>
                                                            </select>
                                                        </span>
                                                        <button className="btn btn-outline-danger">Add To Carry Out</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>);
                            })}
                        </div>
                        <div className="col-lg-1"></div>
                    </div>
                </div>
            </div>
        );
    }
}