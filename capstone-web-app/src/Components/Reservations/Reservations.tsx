import React from "react";
import Navbar from "../Navigation/Navbar";
import IReservationsProps from "./IReservationsProps";
import IReservationsState from "./IReservationState";
import TableService from "../../Services/TableService";
import Spinner from "react-bootstrap/Spinner";
import Footer from "../Footer/Footer";

export default class Reservations extends React.Component<IReservationsProps, IReservationsState> {
    private tableService: TableService;
    private timeSlots: string[];
    
    public constructor(props: any) {
        super(props);

        this.state = {
            availableTables: [],
            selectedTableSize: "",
            selectedTimeSlot: "",
            showSpinner: false
        };

        this.tableService = new TableService();
        this.timeSlots = ["9:00AM", "10:00AM", "11:00AM", "12:00PM", "1:00PM", "2:00PM", "3:00PM", "4:00PM",
        "5:00PM", "6:00PM", "7:00PM", "8:00PM", "9:00PM"];
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
                                                {this.timeSlots.map(time => {
                                                    return (<option>{time}</option>);
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
                            <Footer />
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    private changeTimeSlot(e: any) {
        console.log(e.target.value);

        this.setState({
            selectedTimeSlot: e.target.value
        });
    }

    private changeTableSize(e: any) {
        console.log(e.target.value);

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
                                    <tr>
                                        <td>{item.reservationTable}</td>
                                        <td>{item.tableSize}</td>
                                        <td>{item.timeSlot}</td>
                                        <td>
                                            <button className="btn btn-outline-danger">Reserve</button>
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
                <h4 className="text-center">No tables to show.</h4>
            );
        }
    }

    private searchButtonClick(): void {
        this.setState({
            showSpinner: true
        }, () => {
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
                console.log(reason);
    
                this.setState({
                    showSpinner: false,
                    availableTables: []
                });
            });
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
        console.log(today);

        return today;
    }
}