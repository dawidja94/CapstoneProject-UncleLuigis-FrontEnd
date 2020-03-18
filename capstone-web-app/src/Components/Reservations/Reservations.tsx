import React from "react";
import Navbar from "../Navigation/Navbar";
import Carousel from 'react-bootstrap/Carousel'
import Footer from "../Footer/Footer";
import { Redirect } from "react-router-dom";
import IReservationsProps from "./IReservationsProps";
import IReservationsState from "./IReservationState";

export default class Reservations extends React.Component<IReservationsProps, IReservationsState> {
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
                    <div className="row">
                        <div className="col-12">
                            <h2 className="text-center menu-header">Reservations</h2>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}