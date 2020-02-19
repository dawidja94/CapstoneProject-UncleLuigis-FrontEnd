import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as icons from "@fortawesome/free-solid-svg-icons";
import '../css/Navbar.scss';
import '../css/Fixed.scss';
import { Link } from 'react-router-dom';
import { Link as SmoothLink } from "react-scroll";

class Navbar extends React.Component<any, any> {
    constructor(props:any) {
        super(props);

        this.state = {
            menu: false,
            action: false
        };

        this.toggleMenu = this.toggleMenu.bind(this);
        this.linkClicked = this.linkClicked.bind(this);
        this.logOut = this.logOut.bind(this);
    }

    private toggleMenu() {
        this.setState({ 
            menu: !this.state.menu 
        }, () => { console.log(this.state.menu)});
    }

    private linkClicked() {
        this.setState({
            menu: false
        });
    }

    private logOut() {
        localStorage.clear();

        this.setState({
            action: !this.state.action
        });
    }

    render() {
        const show = (this.state.menu) ? "show" : "" ;

        return (
            <div>
            <nav className="navbar navbar-expand-lg fixed-top">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#home" onClick={this.linkClicked}>
                        <img src={require("../Images/restaurantlogo500px.png")} alt="logo" height={'500px'}/>
                    </a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" onClick={this.toggleMenu}>
                        <span className="custom-toggler-icon">
                            <FontAwesomeIcon icon={icons.faBars}></FontAwesomeIcon>
                        </span>
                    </button>
                    <div className={"collapse navbar-collapse " + show} id="navbarResponsive">
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <SmoothLink to="home" href="#home" className="nav-link" spy={true} offset={0} smooth={true} onClick={this.linkClicked}>
                                    Home
                                </SmoothLink> 
                            </li>
                            <li className="nav-item">
                                <SmoothLink to="biography" href="#biography" className="nav-link" spy={true} offset={0} smooth={true} onClick={this.linkClicked}>
                                    Menu
                                </SmoothLink>
                            </li>
                            <li className="nav-item">
                                <SmoothLink to="skills" href="#skills" className="nav-link" spy={true} offset={0} smooth={true} onClick={this.linkClicked}>
                                    Reservations
                                </SmoothLink>
                            </li>
                            <li className="nav-item">
                                <SmoothLink to="blog" href="#blog" className="nav-link" spy={true} offset={0} smooth={true} onClick={this.linkClicked}>
                                    Carry Out
                                </SmoothLink>
                            </li>
                            <li className="nav-item">
                                <SmoothLink to="contact" href="#contact" className="nav-link" spy={true} offset={0} smooth={true} onClick={this.linkClicked}>
                                    Contact
                                </SmoothLink>
                            </li>
                            <li className="nav-item">
                                { localStorage.getItem("FirstName") !== null ? 
                                    <Link to="/" onClick={this.logOut} className="nav-link">
                                        Logout
                                    </Link>
                                    :
                                    <Link to="/Login" className="nav-link" onClick={this.linkClicked}>
                                        Login
                                    </Link>
                                } 
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            </div>
        );
    }
}

export default Navbar;
