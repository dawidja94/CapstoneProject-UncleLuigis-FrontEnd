import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as icons from "@fortawesome/free-solid-svg-icons";
import '../../css/Navbar.scss';
import '../../css/Fixed.scss';
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
                    <a className="navbar-brand" href="/" onClick={this.linkClicked}>
                        <img src={require("../../Images/restaurantlogo-alt500px.png")} alt="logo" height={'500px'}/>
                    </a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" onClick={this.toggleMenu}>
                        <span className="custom-toggler-icon">
                            <FontAwesomeIcon icon={icons.faBars}></FontAwesomeIcon>
                        </span>
                    </button>
                    <div className={"collapse navbar-collapse " + show} id="navbarResponsive">
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <Link to="" className="nav-link">
                                    Home
                                </Link> 
                            </li>
                            <li className="nav-item">
                                <Link to="/Menu" className="nav-link">
                                    Menu
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/Reservations" className="nav-link">
                                    Reservations
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/CarryOut" className="nav-link">
                                    Carry Out
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/Contact" className="nav-link">
                                    Contact
                                </Link>
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
