import React from "react";
import Modal from "react-bootstrap/Modal";
import IOrderConfirmationModalProps from "./IOrderConfirmationModalProps";
import IOrderConfirmationModalState from "./IOrderConfirmationModalState";

export default class OrderConfirmationModal extends React.Component<IOrderConfirmationModalProps, IOrderConfirmationModalState> {
    constructor(props: any) {
        super(props);

        this.state = {
            hidden: false,
        };
    }

    private onHideHandler() {
        this.props.onCloseModal();
    }

    private onSubmitOrderHandler() {
        this.props.onSubmitOrderClick();
    }

    private onRemoveItemHandler() {
        this.props.onRemoveItemClick();
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
                            <p>{this.props.body}</p>
                        </Modal.Body>

                        <Modal.Footer>
                            {this.props.showSubmitOrderButton ?
                            <button className="btn btn-outline-danger" onClick={() => this.onSubmitOrderHandler()}>Confirm</button>
                            : <label></label>
                            }  
                            {this.props.showRemoveItemButton ?
                            <button className="btn btn-outline-danger" onClick={() => this.onRemoveItemHandler()}>Remove Item</button>
                            : <label></label>
                            }  
                            <button className="btn btn-outline-danger" onClick={() => this.onHideHandler()}>Close</button>
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