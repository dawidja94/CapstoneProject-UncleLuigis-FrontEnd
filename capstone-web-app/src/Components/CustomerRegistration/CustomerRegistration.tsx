import React from "react";
import ICustomerRegistrationProps from "./ICustomerRegistrationProps";
import ICustomerRegistrationState from "./ICustomerRegistrationState";
import Navbar from "../Navbar";

export default class CustomerRegistration extends React.Component<ICustomerRegistrationProps, ICustomerRegistrationState> {
    constructor(props: any) {
        super(props);
    }

    public componentDidMount() {
        
    }

    public render() {
        return (
            <div>
                <Navbar />
                <div>
                    <br />
                    <br />
                    <br />
                    <br />
                    Add your HTML here.
                </div>
            </div>
        )
    }
}