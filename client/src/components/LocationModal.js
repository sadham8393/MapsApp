import React, { useState, useEffect } from 'react';
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter, MDBRow, MDBCol } from 'mdbreact';
import { isLatValid, isLngValid, isAreaValid } from '../utils/validation';
import { MDBAlert } from 'mdbreact';
import geocode from "./common/Geocode";
import PlacesAutoComplete from "./common/PlacesAutocomplete";


const LocationModal = ({ modalToggle, isModalOpen, addLoc, updateLoc, locationList = [], locationObj = null }) => {
    const [modalOpen, setModalOpen] = useState(isModalOpen);
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);
    const [area, setArea] = useState(null);
    const [city, setCity] = useState(null);
    const [country, setCountry] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [latLngChecked, setLatLngChecked] = useState(true);
    const [latValid, setLatValid] = useState(true);
    const [lngValid, setLngValid] = useState(true);
    const [areaValid, setAreaValid] = useState(true);
    const [btnDisabled, setBtnDisabled] = useState(true);
    const [generateBtnDisabled, setGenerateBtnDisabled] = useState(true);
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
        setBtnDisabled(!(latValidated && lngValidated && areaValidated));

        if (latLngChecked) {
            setGenerateBtnDisabled(!(latValidated && lngValidated));
        } else {
            setGenerateBtnDisabled(true);
        }

    }, [latitude, longitude, area, latLngChecked]);

    const toggle = () => {
        resetState();
        modalToggle(!modalOpen);
    }

    const resetState = () => {
        setLatitude(null);
        setLongitude(null);
        setArea(null);
        setCity(null);
        setCountry(null);
        setEditMode(false);
        setBtnDisabled(true);
        setLatLngExists(null);
        setNameExists(null);
        setLatLngChecked(true);
    }

    const handleSave = () => {
        if (locationExists()) {
            return;
        }
        if (isFormValid()) {
            if (editMode) {
                const id = locationObj._id;
                updateLoc({ id, latitude, longitude, area, city, country });

            } else {
                addLoc({ latitude, longitude, area, city, country });
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

    const handleGenerate = async () => {
        if (latitude && longitude && latLngChecked) {
            const location = { lat: latitude, long: longitude };
            const place = await geocode.locate(location);
            const { city, locality, countryName } = place;
            setArea(locality);
            setCity(city || "-");
            setCountry(countryName || "-");
        }
    }

    const handleLatLngChange = () => {
        setLatLngChecked(!latLngChecked);
    }

    const handleAutoComplete = (suggestion) => {
        const { lat, lng } = suggestion.latlng;
        const { name, city, county, administrative } = suggestion;
        setLatitude(lat);
        setLongitude(lng);
        setArea(name);
        setCity(city || county || administrative);
        setCountry(suggestion.country);
    }


    return (
        <MDBContainer>
            <MDBModal isOpen={modalOpen} centered toggle={() => {
                return;
            }}>
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
                                    disabled={!latLngChecked}
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
                                    disabled={!latLngChecked}
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
                            <MDBCol>
                                <input type="checkbox" onChange={handleLatLngChange} checked={latLngChecked} />
                                <label
                                    htmlFor="longitudeText"
                                    className="grey-text"
                                >
                                    Generate Area from Latitude and Longitude coordinates
                                </label>
                            </MDBCol>
                        </MDBRow>

                        <MDBRow>
                            <MDBCol md="12" className="mb-12">
                                <label
                                    htmlFor="areaText"
                                    className="grey-text"
                                >
                                    Area
                                </label>
                                {
                                    latLngChecked ?
                                        <input
                                            disabled
                                            value={area || ""}
                                            name="area"
                                            type="text"
                                            id="areaText"
                                            placeholder="Area"
                                            className={`form-control`}
                                        />
                                        :
                                        <PlacesAutoComplete handleAutoComplete={handleAutoComplete} />
                                }
                                <div className={`invalid-feedback ${areaValid ? "display-none" : "display-block"}`}>Enter valid name</div>
                            </MDBCol>
                        </MDBRow>


                        <MDBRow>
                            <MDBCol md="6" className="mb-6">
                                <label
                                    htmlFor="cityText"
                                    className="grey-text"
                                >
                                    City
                                </label>
                                <input
                                    disabled
                                    value={city || ""}
                                    name="city"
                                    type="text"
                                    id="cityText"
                                    className={`form-control`}
                                    placeholder="City"
                                />
                            </MDBCol>
                            <MDBCol md="6" className="mb-6">
                                <label
                                    htmlFor="countryText"
                                    className="grey-text"
                                >
                                    Country
                                </label>
                                <input
                                    disabled
                                    value={country || ""}
                                    name="country"
                                    type="text"
                                    id="countryText"
                                    className={`form-control`}
                                    placeholder="Country"
                                />
                            </MDBCol>
                        </MDBRow>

                        <MDBRow>
                            <MDBCol>
                                <MDBBtn disabled={generateBtnDisabled} color="primary" onClick={handleGenerate}>Generate</MDBBtn>
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