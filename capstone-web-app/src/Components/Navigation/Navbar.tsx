import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as icons from "@fortawesome/free-solid-svg-icons";
import '../../css/Navbar.scss';
import '../../css/Fixed.scss';
import { Link } from 'react-router-dom';
import INavbarProps from './INavbarProps';

class Navbar extends React.Component<INavbarProps, any> {
    constructor(props:any) {
        super(props);

        this.state = {
            menu: false,
            action: false,
            cartItemsCount: 0
        };

        this.toggleMenu = this.toggleMenu.bind(this);
        this.linkClicked = this.linkClicked.bind(this);
    }

    componentDidMount() {
 
    }

    private toggleMenu() {
        this.setState({ 
            menu: !this.state.menu 
        });
    }

    private linkClicked() {
        this.setState({
            menu: false
        });
    }

    render() {
        const show = (this.state.menu) ? "show" : "" ;

        return (
            <div>
            <nav className="navbar navbar-expand-lg fixed-top">
                <div className="container-fluid">
                    {/* <a className="navbar-brand" href="" onClick={this.linkClicked}> */}
                    <Link to="/">
                        <img src={require("../../Images/restaurantlogo-alt500px.png")} alt="logo" height={'55px'}/>
                    {/* </a> */}
                    </Link>
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
                                <Link to="/Contact" className="nav-link">
                                    Contact
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/CarryOut" className="nav-link">
                                    <FontAwesomeIcon icon={icons.faShoppingCart}/> {localStorage.getItem("cartCount") !== null && localStorage.getItem("cartCount") !== "0"  ? `(${localStorage.getItem("cartCount")})`: ""} Carry Out
                                </Link>
                            </li>
                            <li className="nav-item">
                                { localStorage.getItem("First name") !== null ? 
                                    <Link to="/Portal" className="nav-link">
                                        <FontAwesomeIcon icon={icons.faUser} /> {localStorage.getItem("First name")} {localStorage.getItem("Last name")}
                                    </Link>
                                    :
                                    <Link to="/Login" className="nav-link" onClick={this.linkClicked}>
                                       <FontAwesomeIcon icon={icons.faUser} /> Login
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
