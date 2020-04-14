import React from "react";
import Navbar from "../Navigation/Navbar";
import IReservationsProps from "./IReservationsProps";
import IReservationsState from "./IReservationState";
import TableService from "../../Services/TableService";
import Spinner from "react-bootstrap/Spinner";
import Footer from "../Footer/Footer";
import CustomModal from "../CustomModal/CustomModal";
import LoginModal from "../LoginModal/LoginModal";

export default class Reservations extends React.Component<IReservationsProps, IReservationsState> {
    private tableService: TableService;
    private timeSlots: string[];
    
    public constructor(props: any) {
        super(props);
        document.title = "Uncle Luigi's Bistro - Reservations";
        this.state = {
            availableTables: [],
            selectedTableSize: "",
            selectedTimeSlot: "",
            showSpinner: false,
            showLoginModal: false,
            showNoLoginModal: false,
            showReserveModal: false,
            showContinueWithActionModal: false,
            modalBodyMessage: "Please login to make a table reservation! Thank you!",
            modalHeader: "Valued Customer",
            reserveModalHeader: "Reservation Confirmation",
            reserveModalMessage: ""
        };

        this.tableService = new TableService();
        this.timeSlots = ["9:00AM", "10:00AM", "11:00AM", "12:00PM", "1:00PM", "2:00PM", "3:00PM", "4:00PM",
        "5:00PM", "6:00PM", "7:00PM", "8:00PM", "9:00PM"];

        this.getCurrentLocalTime();
    }

    render() {
        return (
            <div>
                <Navbar />
                <br />
                <br />
                <br />
                <br />
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <div className="card custom">
                                <div className="container-fluid">
                                    <div className="text-center">
                                        <hr />
                                        <h2 className="text-center menu-header">Reservations</h2>
                                        <hr />
                                    </div>
                                    <br />
                                    <div className="container row">
                                        <div className="col-lg-6 col-md-6 col-sm-12">
                                            <div className="form-group">
                                            <label>Select Table Size</label>
                                            <select className="browser-default custom-select" onChange={(e) => this.changeTableSize(e)}>
                                                <option></option>
                                                <option>2</option>
                                                <option>3</option>
                                                <option>4</option>
                                                <option>5</option>
                                                <option>6</option>
                                            </select>
                                            </div>
                                        </div>
                                        <div className="col-lg-6 col-md-6 col-sm-12">
                                            <div className="form-group">
                                            <label>Select Time</label>
                                            <select className="browser-default custom-select" onChange={(e) => this.changeTimeSlot(e)}>
                                                <option></option>
                                                {this.timeSlots.map((time, index) => {
                                                    return (<option key={index}>{time}</option>);
                                                })}
                                            </select>
                                            </div>
                                        </div>
                                        <div className="col-lg-6 col-md-6 col-sm-12">
                                            <br />
                                            <h5>Reservation For: <span className="font-bold">{this.getTodaysDate()}</span></h5>
                                        </div>
                                        <div className="col-lg-6 col-md-6 col-sm-12">
                                            <br />
                                            <button className="btn btn-danger" onClick={() => this.searchButtonClick()}>Search Reservations</button>
                                        </div>
                                    </div>
                                    <br />
                                    <br />
                                    <hr />
                                    { !this.state.showSpinner ? this.renderAvailableTables() : 
                                        <div className="text-center">
                                            <Spinner animation="border" role="status">
                                                <span className="sr-only">Loading...</span>
                                            </Spinner>
                                            <br />
                                            <br />
                                        </div>
                                    }
                                    <br />
                                    <br /> 
                                </div>
                            </div>
                            {this.state.showLoginModal ? <LoginModal 
                                show={this.state.showLoginModal} 
                                onCloseModal={this.closeLoginModal}
                                loginIsSuccessful={this.loginIsSuccessful}
                                /> 
                                : <div></div>}
                            {this.state.showContinueWithActionModal ? <CustomModal {...this.props} useListOption={false} listMessages={[]} showLoginButton={false} title={"Proceed"} body={"Your login was successful, please proceed with your previous action."} buttontitle={"Close"} show={this.state.showContinueWithActionModal} onCloseModal={this.closeActionModal} /> : <div></div>}
                            {this.state.showNoLoginModal ? <CustomModal {...this.props} useListOption={false} listMessages={[]} showLoginButton={true} title={this.state.modalHeader} body={this.state.modalBodyMessage} buttontitle={"Ok"} show={this.state.showNoLoginModal} onCloseModal={this.closeNoLoginModal} /> : <div></div>}
                            {this.state.showReserveModal ? <CustomModal {...this.props} useListOption={false} listMessages={[]} showLoginButton={false} title={this.state.reserveModalHeader} body={this.state.reserveModalMessage} buttontitle={"Close"} show={this.state.showReserveModal} onCloseModal={this.closeReserveModal} /> : <div></div>}
                            <Footer />
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    private closeActionModal = () => {
        this.setState({
            showContinueWithActionModal: false
        });
    }

    private loginIsSuccessful = (): void => {
        this.setState({
            showLoginModal: false,
            showContinueWithActionModal: true
        });
    }

    private closeNoLoginModal = () => {
        this.setState({
            showNoLoginModal: false
        });
    }

    private closeLoginModal = () => {
        this.setState({
            showLoginModal: false
        });
    }

    private closeReserveModal = () => {
        this.setState({
            showReserveModal: false
        });
    }

    private changeTimeSlot(e: any) {
        this.setState({
            selectedTimeSlot: e.target.value
        });
    }

    private changeTableSize(e: any) {
        this.setState({
            selectedTableSize: e.target.value
        });
    }

    private renderAvailableTables(): JSX.Element {
        if (this.state.availableTables.length > 0) {
            return (
                <div className="table-container">
                    <table className="table table-hover">
                        <thead className="text-left">
                            <tr>
                                <th>Table</th>
                                <th>Size</th>
                                <th>Time</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody className="text-left">
                            {this.state.availableTables.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{item.reservationTable}</td>
                                        <td>{item.tableSize}</td>
                                        <td>{item.timeSlot}</td>
                                        <td>
                                            <button className="btn btn-outline-danger" onClick={() => this.reserveTableClick(item.id, item.reservationTable, item.timeSlot)}>Reserve</button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            );
        }
        else {
            return (
                <h4 className="text-center">No Reservations To Show</h4>
            );
        }
    }

    private reserveTableClick(tableId: number, tableName: string, timeSlot: string): void {
        if (!localStorage.getItem("First name") && !localStorage.getItem("Last name")) {
            this.setState({
                showNoLoginModal: true
            });
        }
        else {
            let customerIdFromLS = localStorage.getItem("Customer ID");
            let customerId: number = 0;
            let selectedPartySize = 0;

            if (customerIdFromLS !== null) {
                customerId = parseInt(customerIdFromLS.toString());
            }

            selectedPartySize = parseInt(this.state.selectedTableSize.toString());

            const requestBody = {
                customerId: customerId,
                tableId: tableId,
                partySize: selectedPartySize
            };

            this.tableService.reserveTable(requestBody)
            .then(response => {
                this.setState({
                    showReserveModal: true,
                    showSpinner: true,
                    reserveModalMessage: `Hi ${localStorage.getItem("First name")}, ${tableName} for ${this.state.selectedTableSize} people is
                    confirmed for ${this.getTodaysDate()} at ${timeSlot}.`
                }, () =>
                this.processAvailableTables());
            })
            .catch (reason => {
                this.setState({
                    showLoginModal: true,

                });
            });
        }
    }

    private processAvailableTables(): void {
        const requestBody = {
            partySize: parseInt(this.state.selectedTableSize) as number,
            reservationDate: this.getTodaysDate(),
            timeSlot: this.state.selectedTimeSlot
        };

        this.tableService.getAvailableTables(requestBody)
        .then(response => {    
            let sortedTables = response;

            if (sortedTables) {
                sortedTables.sort((a: any, b: any) => {
                    if (a.reservationTable > b.reservationTable) {
                        return 1;
                    }
                    else {
                        return 0;
                    }
                });
            }

            this.setState({
                availableTables: sortedTables,
                showSpinner: false
            });
        })
        .catch(reason => {
            this.setState({
                showSpinner: false,
                availableTables: []
            });
        });
    }

    private searchButtonClick(): void {
        this.setState({
            showSpinner: true
        }, () => {
            this.processAvailableTables();
        });
    }

    private getTodaysDate(): string {
        var today = new Date() as any;
        var dd = today.getDate() as any;
        var mm = today.getMonth() + 1 as any; 
        var yyyy = today.getFullYear() as any;
        
        if (dd < 10) {
            dd = '0' + dd;
        } 

        if (mm < 10) {
            mm = '0' + mm;
        } 

        today = mm + '/' + dd + '/' + yyyy;
        return today;
    }

    private getCurrentLocalTime(): void {
        //let date = new Date();

        //let hours = date.getHours() as any;
        //let minutes = date.getMinutes() as any;
        //let ampm = hours >= 12 ? 'PM' : 'AM';
        //hours = hours % 12;
        //hours = hours ? hours : 12; // the hour '0' should be '12'
        //minutes = minutes < 10 ? '0'+ minutes : minutes;
        //let strTime = hours + ':' + minutes + ampm;
    }
}