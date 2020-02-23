import React from "react";

export default class Footer extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
    }

    render() {
        return (
            <div className="text-center">
                <div>
                    <label className="footer-restaurant">Uncle Luigi's Bistro &copy; {new Date().getFullYear()}</label>
                </div>
                <div>
                    <label className="footer-address">1 University Pkwy, Romeoville, IL 60446</label>
                </div>
                <hr />
            </div>
        );
    }
}