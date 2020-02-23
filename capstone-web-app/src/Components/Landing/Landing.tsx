import React from "react";
import ILandingProps from "./ILandingProps";
import ILandingState from "./ILandingState";
import Navbar from "../Navigation/Navbar";
import Carousel from 'react-bootstrap/Carousel'
import Footer from "../Footer/Footer";

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
                            src={'/Images/Carousel/wallpaper1-fit.jpg'}
                            alt="First slide"
                            />
                            <Carousel.Caption>
                            <h3>Mouth Watering Spaghetti</h3>
                            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                            className="d-block w-100 carousel-image"
                            src={'/Images/Carousel/wallpaper5-fit.jpg'}
                            alt="Third slide"
                            />
                            <Carousel.Caption>
                            <h3>Second slide label</h3>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                            className="d-block w-100 carousel-image"
                            src={'/Images/Carousel/wallpaper3-fit.jpg'}
                            alt="Third slide"
                            />
                            <Carousel.Caption>
                            <h3>Second slide label</h3>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                            className="d-block w-100 carousel-image"
                            src={'/Images/Carousel/wallpaper6-fit.jpg'}
                            alt="Third slide"
                            />
                            <Carousel.Caption>
                            <h3>Second slide label</h3>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                    </Carousel>
                    <Footer />
                </div>
            </div>
        );
    }
}