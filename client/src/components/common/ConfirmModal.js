import React, { useState, useEffect } from 'react';
import { MDBBtn, MDBModal, MDBModalBody, MDBModalFooter } from 'mdbreact';

const ConfirmModal = ({ confirmModalToggle, isModalOpen, confirmMsg, confirm, location }) => {
    const [modalOpen, setModalOpen] = useState(isModalOpen);

    useEffect(() => {
        setModalOpen(isModalOpen);
    }, [isModalOpen]);

    const toggle = () => {
        confirmModalToggle(!modalOpen);
    }

    const confirmClick = () => {
        confirm(location);
        confirmModalToggle(!modalOpen);
    }

    return (
        <MDBModal isOpen={modalOpen} toggle={toggle} frame position="top">
            <MDBModalBody className="text-center">
                {confirmMsg}
            </MDBModalBody>
            <MDBModalFooter>
                <MDBBtn color="secondary" onClick={toggle}>Close</MDBBtn>
                <MDBBtn color="primary" onClick={confirmClick}>Confirm</MDBBtn>
            </MDBModalFooter>
        </MDBModal>
    );
}

export default ConfirmModal;