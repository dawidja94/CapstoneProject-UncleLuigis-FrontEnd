import React from "react";

export default class Footer extends React.Component<any, any> {
    render() {
        return (
            <div className="text-center">
                <div>
                    <label className="footer-restaurant">Uncle Luigi's Bistro</label>
                </div>
                <div>
                    <label className="footer-address">1 University Pkwy, Romeoville, IL 60446</label>
                </div>
                <div>
                    <label className="footer-authors">Designed and Developed by Thomas Owca and Dawid Jasionowski &copy; {new Date().getFullYear()}</label>
                </div>
                <hr />
            </div>
        );
    }
}