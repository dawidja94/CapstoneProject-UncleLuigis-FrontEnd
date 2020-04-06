import React from "react";
import ICustomModalProps from "./ICustomModalProps";
import ICustomModalState from "./ICustomModalState";
import Modal from "react-bootstrap/Modal";
import { Link } from "react-router-dom";

export default class LoginModal extends React.Component<ICustomModalProps, ICustomModalState> {
    constructor(props: any) {
        super(props);

        this.state = {
            hidden: false,
        };
    }

    private onHideHandler() {
        this.props.onCloseModal();
    }

    render() {
        if (this.props.show) {
            return (
                <div className="modal-container">
                    <Modal.Dialog
                        size="lg"
                        aria-labelledby="contained-modal-title-vcenter"
                        centered
                        hidden={false}
                        >
                        <Modal.Header closeButton onHide={() => this.onHideHandler()}>
                            <Modal.Title>{this.props.title}</Modal.Title>
                        </Modal.Header>

                        <Modal.Body>
                            {this.props.useListOption ?  
                                <div>
                                    <ul>
                                        {this.props.listMessages.map((item, key) => {
                                    
                                            return (<li key={key}>{item}</li>)
                                        })}
                                    </ul>
                                </div>
                            :
                            <p>{this.props.body}</p>}
                        </Modal.Body>

                        <Modal.Footer>
                            {this.props.showLoginButton ?
                            <Link to="/Login" className="btn btn-outline-danger">
                                Login
                            </Link> : <label></label>
                            }   
                            <button className="btn btn-outline-danger" onClick={() => this.onHideHandler()}>{this.props.buttontitle}</button>
                        </Modal.Footer>
                    </Modal.Dialog>
                </div>
            );
        }
        else {
            return (<div></div>);
        }
    }
}