import React from "react";
import Navbar from "../Navigation/Navbar";
import Footer from "../Footer/Footer";
import IContactState from "./IContactState";
import IContactProps from "./IContactProps";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as icons from "@fortawesome/free-solid-svg-icons";

export default class Contact extends React.Component<IContactProps, IContactState> {
    public constructor(props: any) {
        super(props);
        document.title = "Uncle Luigi's Bistro - Contact";
        this.state = {
        };
    }

    render() {
        return (
            <div>
                <Navbar />
                <div id="contactBackground">
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <div className="container">
                        <div className="card contact">
                            <h1 className="font-weight-lighter custom text-center"><FontAwesomeIcon icon={icons.faPhoneAlt}/> Contact Us</h1>
                            <hr />
                            <div className="card-body">
                                <h5 className="font-weight-bolder">Uncle Luigi's Bistro</h5>
                                <h5 className="font-weight-bold">1 University Pkwy, Romeoville, IL 60446</h5>
                                <h5 className="font-weight-bold">Phone: (815) 838-0500</h5>
                            </div>
                        </div>
                    </div>
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                </div>   
                <Footer />
            </div>
        );
    }
}