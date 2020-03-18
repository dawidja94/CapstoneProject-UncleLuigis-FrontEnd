import React from "react";
import Navbar from "../Navigation/Navbar";
import Carousel from 'react-bootstrap/Carousel'
import Footer from "../Footer/Footer";
import { Redirect } from "react-router-dom";
import IContactState from "./IContactState";
import IContactProps from "./IContactProps";

export default class Contact extends React.Component<IContactProps, IContactState> {
    public constructor(props: any) {
        super(props);

        this.state = {
        };
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
                    <div id="contactBackground">

                    </div>
                </div>
            </div>
        );
    }
}