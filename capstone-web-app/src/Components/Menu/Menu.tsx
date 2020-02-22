import React from "react";
import IMenuProps from "./IMenuProps";
import IMenuState from "./IMenuState";
import Navbar from "../Navbar";

export default class Menu extends React.Component<IMenuProps, IMenuState> {
    constructor(props: any) {
        super(props);
    }

    render() {
        return (
            <div>
                <Navbar />
                <br />
                <br />
                <br />
                Menu goes here.
            </div>
        );
    }
}