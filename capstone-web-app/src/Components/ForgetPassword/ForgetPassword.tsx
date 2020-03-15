import React from "react";
import Navbar from "../Navigation/Navbar";
import ConstantStrings from "../../Constants/ConstantStrings";
import ILoginProps from "../UserProfile/IUserProfileProps";
import Footer from "../Footer/Footer";
import TokenService from "../../Services/TokenService";
import MenuService from "../../Services/MenuService";
import IForgetPasswordProps from "./IForgetPasswordProps";
import ICustomerRegistrationState from "../CustomerRegistration/ICustomerRegistrationState";


export default class ForgetPassword extends React.Component<IForgetPasswordProps, ICustomerRegistrationState> {

    public render() {
        return (
            <div>
                <Navbar />
                <div id="loginScreenBackground">
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <div className="container">
                        <div className="row">
                            <div className="col-1"></div>
                            <div className="col-10">
                                <br />
                                <br />
                                <div className="card login-custom">
                                    <h3 className="card-header text-center font-weight-bold">Login</h3>
                                    <div className="card-margin">
                                        <div className="form-group">
                                            <label className="font-weight-bold">Username:</label>
                                        </div>
                                        <div className="form-group">
                                            <label className="font-weight-bold">Password:</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-1"></div>
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
