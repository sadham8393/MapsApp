import React, { useState, useEffect } from 'react';
import { MDBCol, MDBCard, MDBCardTitle, MDBBtn, MDBCardGroup, MDBCardText, MDBCardBody } from 'mdbreact';
import { singleCheckClick, checkboxAllClick, sortBy } from '../utils/utilities';

const DetailsListView = ({ locationList = [], deleteConfirm, editClick, multiDelete }) => {

    const [allChecked, setAllChecked] = useState(false);
    let [selectedLocation, setSelectedLocation] = useState([]);
    let [location, setLocation] = useState([]);
    let [sort, setSort] = useState("default");

    useEffect(() => {
        if (locationList.length > 0) {
            setLocation(locationList);
        }
    }, [locationList]);

    useEffect(() => {
        if (sort && locationList && locationList.length > 0) {
            const sortedList = sortBy(sort, locationList, "area");
            setLocation(sortedList);
        }
    }, [sort, locationList]);

    /**
     * 
     * @param {checkBoxClick} event 
     * @param {single location object} location 
     * @param {total location list} locationList 
     * 
     * utility will be called
     */
    const checkBoxClick = (event, location, locationList) => {
        singleCheckClick(event, location, locationList, selectedLocation, setAllChecked, setSelectedLocation, multiDelete);
    }

    /**
     * 
     * @param {allCheckedChangeHandler} event 
     * @param {total location list} locationList 
     * 
     * utility will be called
     */
    const allCheckedChangeHandler = (event, locationList) => {
        checkboxAllClick(event, selectedLocation, locationList, setAllChecked, setSelectedLocation, multiDelete);
    }

    const sortChange = (e) => {
        setSort(e.target.value);
    }

    return (
        <div>
            {
                location.length > 0 &&
                <div className="card-selectAll-div custom-control custom-checkbox">

                    <div className="checkbox-div">
                        <input type="checkbox" id="defaultUnchecked" checked={allChecked || false} onChange={(e) => allCheckedChangeHandler(e, locationList)}></input>
                        <label htmlFor="defaultUnchecked">Select All</label>
                    </div>

                    <div className="sort-div">
                        <label htmlFor="sortBy">Sory By</label>
                        <select id="sortBy" onChange={sortChange}>
                            <option value="default">Default</option>
                            <option value="asc">Ascending</option>
                            <option value="desc">Descending</option>
                        </select>
                    </div>

                </div>
            }
            <MDBCardGroup>
                {
                    location.map((item, index) => {
                        return (
                            <MDBCol key={`card-${index}`} xs="12" sm="6" md="4" lg="3">
                                <MDBCard>
                                    <MDBCardBody>
                                        <div className="card-checkbox-div">
                                            <input type="checkbox" checked={allChecked ? allChecked : item.checked ? item.checked : false} onChange={(e) => checkBoxClick(e, item, locationList)} />
                                            <MDBCardTitle>{item.area}</MDBCardTitle>
                                            <div></div>
                                        </div>
                                        <MDBCardText><strong>Latitude :</strong> {item.latitude}</MDBCardText>
                                        <MDBCardText><strong>Longtitude :</strong> {item.longitude}</MDBCardText>
                                        <MDBCardText><strong>City :</strong> {item.city}</MDBCardText>
                                        <MDBCardText><strong>Country :</strong> {item.country}</MDBCardText>
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