import React from "react";
import Footer from "../Footer/Footer";
import Navbar from "../Navigation/Navbar";

export default class Portal extends React.Component<any,any> {

    public componentDidMount() {
    
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
                    <br />
                    <div className="container">
                        <div className="row">
                            <div className="col-4">
                                <div className="card">
                                    <img className="card-img-top custom" src={`/Images/Food/Spaghetti.png`} alt="Food"></img>
                                    <hr />
                                    <div className="options-container">
                                        <button className="btn btn-outline-danger">Change Password</button>
                                        <button className="btn btn-outline-danger">Update Information</button>
                                        <button className="btn btn-outline-danger">Log Out</button>
                                    </div>
                                    <br />
                                </div>
                            </div>
                            <div className="col-4">
                                <div className="card">
                                    <h3 className="card-header">Title</h3>
                                </div>
                            </div>
                            <div className="col-4">
                                <div className="card">
                                    <h3 className="card-header">Title</h3>
                                </div>
                            </div>
                        </div> 
                    </div>
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                </div>
                <Footer />
            </div>
        )
    }
}