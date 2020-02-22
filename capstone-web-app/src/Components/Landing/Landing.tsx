import React from "react";
import ILandingProps from "./ILandingProps";
import ILandingState from "./ILandingState";
import Navbar from "../Navbar";
import Carousel from 'react-bootstrap/Carousel'

export default class Landing extends React.Component<ILandingProps, ILandingState> {
    public constructor(props: any) {
        super(props);

        this.state = {
            index: 0,
            direction: "right"
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
                            src={'https://wallpaperaccess.com/full/1463534.jpg'}
                            alt="First slide"
                            />
                            <Carousel.Caption>
                            <h3>Mouth Watering Spaghetti</h3>
                            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                        {/* <Carousel.Item>
                            <img
                            className="d-block w-100"
                            src="holder.js/800x400?text=Second slide&bg=282c34"
                            alt="Third slide"
                            />

                            <Carousel.Caption>
                            <h3>Second slide label</h3>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                            className="d-block w-100"
                            src="holder.js/800x400?text=Third slide&bg=20232a"
                            alt="Third slide"
                            />

                            <Carousel.Caption>
                            <h3>Third slide label</h3>
                            <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                            </Carousel.Caption>
                        </Carousel.Item> */}
                    </Carousel>
                    <div className="text-center">
                        <div>
                            <label className="footer-restaurant">Uncle Luigi's Bistro &copy; {new Date().getFullYear()}</label>
                        </div>
                        <div>
                            <label className="footer-address">1 University Pkwy, Romeoville, IL 60446</label>
                        </div>
                        <hr />
                    </div>
                </div>
            </div>
        );
    }
}