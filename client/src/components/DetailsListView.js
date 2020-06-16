import React, { useState, useEffect } from 'react';
import { MDBCol, MDBCard, MDBCardTitle, MDBBtn, MDBCardGroup, MDBCardText, MDBCardBody } from 'mdbreact';

const DetailsListView = ({ locationList = [], deleteConfirm, editClick, multiDelete }) => {

    const [allChecked, setAllChecked] = useState(false);
    let [selectedLocation, setSelectedLocation] = useState([]);
    let [location, setLocation] = useState([]);

    useEffect(() => {
        if (locationList.length > 0) {
            setLocation(locationList);
        }
    }, [locationList])

    const checkBoxClick = (event, location, locationList) => {
        selectedLocation = selectedLocation.filter(obj => obj._id !== location._id);
        const checked = event.currentTarget.checked || false;
        location.checked = checked;
        if (checked) {
            selectedLocation.push(location);
        }/*  else {
            setAllChecked(false);
        } */
        setAllChecked(selectedLocation.length === locationList.length);
        setSelectedLocation(selectedLocation);
        multiDelete(selectedLocation);
    }

    const allCheckedChangeHandler = (event, locationList) => {
        const checked = event.currentTarget.checked || false;
        selectedLocation = locationList.map(obj => {
            obj.checked = checked;
            return obj;
        });
        selectedLocation = checked ? selectedLocation : [];
        setAllChecked(checked);
        setSelectedLocation(selectedLocation);
        multiDelete(selectedLocation);
    }

    const sortChange = (e) => {
        let sortType = e.target.value;
        //debugger;
    }

    return (
        <div>
            <div className="card-selectAll-div custom-control custom-checkbox">
                <input type="checkbox" id="defaultUnchecked" checked={allChecked || false} onChange={(e) => allCheckedChangeHandler(e, locationList)}></input>
                <label htmlFor="defaultUnchecked">Select All</label>
                <div className="sort-div">
                    <label htmlFor="sortBy">Sory By</label>
                    <select id="sortBy" onChange={sortChange}>
                        <option value="asc">Ascending</option>
                        <option value="desc">Descending</option>
                    </select>
                </div>
            </div>
            <MDBCardGroup>
                {
                    location.map((item, index) => {
                        return (
                            <MDBCol key={index} xs="12" sm="6" md="4" lg="3">
                                <MDBCard>
                                    <MDBCardBody>
                                        <div className="card-checkbox-div">
                                            <input type="checkbox" checked={allChecked ? allChecked : item.checked ? item.checked : false} onChange={(e) => checkBoxClick(e, item, locationList)} />
                                        </div>
                                        <MDBCardTitle>{item.area}</MDBCardTitle>
                                        <MDBCardText><b>Latitude :</b> {item.latitude}</MDBCardText>
                                        <MDBCardText><b>Longtitude :</b> {item.longitude}</MDBCardText>
                                        <MDBBtn color="primary" onClick={(e) => editClick(item)}>Edit</MDBBtn>
                                        <MDBBtn color="danger" onClick={(e) => deleteConfirm(item)}>Delete</MDBBtn>
                                    </MDBCardBody>
                                </MDBCard>
                            </MDBCol>
                        )

                    })
                }
            </MDBCardGroup>
        </div>

    )
}

export default DetailsListView;