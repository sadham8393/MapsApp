import React, { useState, useEffect } from 'react';
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter, MDBRow, MDBCol } from 'mdbreact';
import { isLatValid, isLngValid, isAreaValid } from '../utils/validation';
import { MDBAlert } from 'mdbreact';


const LocationModal = ({ modalToggle, isModalOpen, addLoc, updateLoc, locationList = [], locationObj = null }) => {
    const [modalOpen, setModalOpen] = useState(isModalOpen);
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);
    const [area, setArea] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [latValid, setLatValid] = useState(true);
    const [lngValid, setLngValid] = useState(true);
    const [areaValid, setAreaValid] = useState(true);
    const [btnDisabled, setBtnDisabled] = useState(true);
    const [latLngExists, setLatLngExists] = useState(null);
    const [nameExists, setNameExists] = useState(null);

    useEffect(() => {
        setModalOpen(isModalOpen);
    }, [isModalOpen]);

    useEffect(() => {
        if (locationObj && locationObj.latitude && locationObj.longitude && locationObj.area) {
            setEditMode(true);
            setLatitude(locationObj.latitude);
            setLongitude(locationObj.longitude);
            setArea(locationObj.area)
        } else {
            setEditMode(false);
            setLatitude(null);
            setLongitude(null);
            setArea(null)
        }
    }, [locationObj]);

    useEffect(() => {
        let latValidated = isLatValid(latitude),
            lngValidated = isLngValid(longitude),
            areaValidated = isAreaValid(area);
        setBtnDisabled(!(latValidated, lngValidated, areaValidated));
    }, [latitude, longitude, area]);

    const toggle = () => {
        resetState();
        modalToggle(!modalOpen);
    }

    const resetState = () => {
        setLatitude(null);
        setLongitude(null);
        setArea(null);
        setEditMode(false);
        setBtnDisabled(true);
        setLatLngExists(null);
        setNameExists(null);
    }

    const handleSave = () => {
        if (locationExists()) {
            return;
        }
        if (isFormValid()) {
            if (editMode) {
                const id = locationObj._id;
                updateLoc({ id, latitude, longitude, area });

            } else {
                addLoc({ latitude, longitude, area });
            }
            toggle();
        }

    }

    const changeHandler = (event) => {
        const value = event.target.value,
            name = event.target.name;
        if (name === "latitude") {
            setLatitude(value);
        } else if (name === "longitude") {
            setLongitude(value);
        } else {
            setArea(value);
        }
    }

    const isFormValid = () => {
        setLatValid(isLatValid(latitude));
        setLngValid(isLngValid(longitude));
        setAreaValid(isAreaValid(area));

        return (isLatValid(latitude) && isLngValid(longitude) && isAreaValid(area));
    }

    const resetAlert = () => {
        setNameExists(null);
        setLatLngExists(null);
    }

    const locationExists = () => {
        let exists = false;
        locationList.forEach((obj) => {
            if (obj.area === area && !editMode) {
                setNameExists(`Name (${area}) already exists. Name should be unique.`);
                exists = true;
            }
            if (obj.latitude === parseFloat(latitude) && obj.longitude === parseFloat(longitude)) {
                setLatLngExists(`Latitude (${latitude}) and Longitude (${longitude}) combination already exists`);
                exists = true;
            }
        })
        return exists;
    }

    return (
        <MDBContainer>
            <MDBModal isOpen={modalOpen} centered>
                <MDBModalHeader toggle={toggle}>{editMode ? `Edit ${locationObj && locationObj.area}` : "Add Location"}</MDBModalHeader>
                {(nameExists || latLngExists) && <MDBAlert color="warning" onClose={resetAlert} dismiss>
                    {nameExists ? nameExists : latLngExists}
                </MDBAlert>}

                <MDBModalBody>
                    <form
                        className="location-modal-form"
                        noValidate
                    >
                        <MDBRow>
                            <MDBCol md="6" className="mb-6">
                                <label
                                    htmlFor="latitideText"
                                    className="grey-text"
                                >
                                    Latitude
                                </label>
                                <input
                                    //onBlur={(e) => blurhandler(e)}
                                    value={latitude || ""}
                                    name="latitude"
                                    onChange={(e) => changeHandler(e)}
                                    type="text"
                                    id="latitideText"
                                    className={`form-control ${latValid ? "" : "invalid"}`}
                                    placeholder="Latitude"
                                />
                                <div className={`invalid-feedback ${latValid ? "display-none" : "display-block"}`}>Enter valid Latitude Coordinate</div>
                            </MDBCol>
                            <MDBCol md="6" className="mb-6">
                                <label
                                    htmlFor="longitudeText"
                                    className="grey-text"
                                >
                                    Longitude
                                </label>
                                <input
                                    //onBlur={(e) => blurhandler(e)}
                                    value={longitude || ""}
                                    name="longitude"
                                    onChange={(e) => changeHandler(e)}
                                    type="text"
                                    id="longitudeText"
                                    className={`form-control ${lngValid ? "" : "invalid"}`}
                                    placeholder="Longitude"
                                />
                                <div className={`invalid-feedback ${lngValid ? "display-none" : "display-block"}`}>Enter valid Longitude Coordinate</div>
                            </MDBCol>
                        </MDBRow>
                        <MDBRow>
                            <MDBCol md="12" className="mb-12">
                                <label
                                    htmlFor="areaText"
                                    className="grey-text"
                                >
                                    Name
                                </label>
                                <input
                                    //onBlur={(e) => blurhandler(e)}
                                    disabled={editMode || false}
                                    value={area || ""}
                                    name="area"
                                    onChange={(e) => changeHandler(e)}
                                    type="text"
                                    id="areaText"
                                    className={`form-control ${areaValid ? "" : "invalid"}`}
                                    placeholder="Area"
                                />
                                <div className={`invalid-feedback ${areaValid ? "display-none" : "display-block"}`}>Enter valid name</div>
                            </MDBCol>
                        </MDBRow>
                    </form>
                </MDBModalBody>
                <MDBModalFooter>
                    <MDBBtn color="secondary" onClick={toggle}>Close</MDBBtn>
                    <MDBBtn disabled={btnDisabled} color="primary" onClick={handleSave}>Save changes</MDBBtn>
                </MDBModalFooter>
            </MDBModal>
        </MDBContainer>
    );
}


export default LocationModal;