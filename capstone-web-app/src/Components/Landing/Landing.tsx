import React from "react";
import ILandingProps from "./ILandingProps";
import ILandingState from "./ILandingState";
import Navbar from "../Navigation/Navbar";
import Carousel from 'react-bootstrap/Carousel'
import Footer from "../Footer/Footer";
import { Redirect } from "react-router-dom";

export default class Landing extends React.Component<ILandingProps, ILandingState> {
    public constructor(props: any) {
        super(props);

        this.state = {
            index: 0,
            direction: "right",
            redirectToContact: false,
            redirectToMenu: false,
            redirectToRegister: false,
            redirectToReservations: false
        };
    }

    private handleSelect = (selectedIndex: number, e: any) => {
        this.setIndex(selectedIndex);
        this.setDirection(e.direction);
    };

    private setIndex = (selectedIndex: number): void => {
        this.setState({
            index: selectedIndex
        });
    }

    private setDirection = (selectedDirection: string): void => {
        this.setState({
            direction: selectedDirection,
        });
    }

    render() {
        return (
            <div>
                <Navbar />
                <div className="custom-carousel">
                <Carousel>
                        <Carousel.Item>
                            <img
                            className="d-block w-100 carousel-image"
                            src={'/Images/Carousel/wallpaper1-fit.jpg'}
                            alt="First slide"
                            />
                            <Carousel.Caption>
                            <div className="carousel-descriptor">
                                <h3 className="text-uppercase font-weight-light">A Taste of Italy</h3>
                                <hr />
                                <button className="btn btn-danger btn-lg" onClick={() => {
                                    this.setState({
                                        redirectToMenu: true
                                    });
                                }}>View Menu</button>
                                <h6>We at Uncle Luigi's offer our customers a unique Italian dine-in experience.</h6>
                            </div>
                            <br />
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                            className="d-block w-100 carousel-image"
                            src={'/Images/Carousel/wallpaper5-fit.jpg'}
                            alt="Third slide"
                            />
                            <Carousel.Caption>
                            <div className="carousel-descriptor">
                                <h3 className="text-uppercase font-weight-light">Reserve Your Group</h3>
                                <hr />
                                <button className="btn btn-danger btn-lg" onClick={() => {
                                    this.setState({
                                        redirectToReservations: true
                                    });
                                }}>Reservations</button>
                                <h6>We are happy to offer our customers the ability to reserve their groups' table in advance.</h6>
                            </div>
                            <br />
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                            className="d-block w-100 carousel-image"
                            src={'/Images/Carousel/wallpaper3-fit.jpg'}
                            alt="Third slide"
                            />
                            <Carousel.Caption>
                            <div className="carousel-descriptor">
                                <h3 className="text-uppercase font-weight-light">Register An Account</h3>
                                <hr />
                                <button className="btn btn-danger btn-lg" onClick={() => {
                                    this.setState({
                                        redirectToRegister: true
                                    });
                                }}>Register</button>
                                <h6>Register today to create orders and reserve tables on your own time from anywhere.</h6>
                            </div>
                            <br />
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                            className="d-block w-100 carousel-image"
                            src={'/Images/Carousel/wallpaper6-fit.jpg'}
                            alt="Third slide"
                            />
                            <Carousel.Caption>
                            <div className="carousel-descriptor">
                                <h3 className="text-uppercase font-weight-light">Questions?</h3>
                                <hr />
                                <button className="btn btn-danger btn-lg" onClick={() => {
                                    this.setState({
                                        redirectToContact: true
                                    });
                                }}>Contact Us</button>
                                <h6>We are happy to answer any questions about our menu or business.</h6>
                            </div>
                            <br />
                            </Carousel.Caption>
                        </Carousel.Item>
                    </Carousel>
                    <Footer />
                </div>
                {this.state.redirectToMenu ? <Redirect push to="/Menu"/> : <div></div>}
                {this.state.redirectToReservations ? <Redirect push to="/Reservations"/> : <div></div>}
                {this.state.redirectToContact ? <Redirect push to="/Contact"/> : <div></div>}
                {this.state.redirectToRegister ? <Redirect push to="/Register"/> : <div></div>}
            </div>
        );
    }
}