import React, { useState, memo, useEffect } from 'react';
import { MDBDataTable, MDBInput } from 'mdbreact';
import { singleCheckClick, checkboxAllClick } from '../utils/utilities';

const DetailsTableView = ({ locationList = [], deleteConfirm, editClick, multiDelete }) => {
    const [allChecked, setAllChecked] = useState(false);
    let [selectedLocation, setSelectedLocation] = useState([]);

    useEffect(() => {
        console.log("Useeffect");
    })
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
    };


    /**
     * 
     * @param {allCheckedChangeHandler} event 
     * @param {total location list} locationList 
     * 
     * utility will be called
     */
    const allCheckedChangeHandler = (event, locationList) => {
        checkboxAllClick(event, locationList, locationList, setAllChecked, setSelectedLocation, multiDelete);
    };

    const data = {
        columns: [
            {
                label: <MDBInput onChange={(e) => allCheckedChangeHandler(e, locationList)} checked={allChecked || false} label=" " type="checkbox" className="checkboxHeader" />,
                field: 'check',
                sort: 'disabled',
                minimal: "sm"
            },
            {
                label: 'Area',
                field: 'area',
                sort: 'asc'
            },
            {
                label: 'Latitude',
                field: 'latitude',
                sort: 'asc'
            },
            {
                label: 'Longitude',
                field: 'longitude',
                sort: 'asc'
            },

            {
                label: 'City',
                field: 'city',
                sort: 'asc'
            },
            {
                label: 'Country',
                field: 'country',
                sort: 'asc'
            },
            {
                label: 'Action',
                field: 'edit',
                minimal: "mx",
                sort: 'disabled'
            }
        ],
        rows: locationList.map((location, index) => {
            return {
                check: <MDBInput key={`check${index}`} type="checkbox" checked={allChecked ? allChecked : location.checked ? location.checked : false}
                    onChange={(e) => checkBoxClick(e, location, locationList)} />,
                area: location.area,
                latitude: location.latitude,
                longitude: location.longitude,
                city: location.city,
                country: location.country,
                edit: <div className="display-inline-flex">
                    <i key={`edit${index}`} onClick={() => editClick(location)} className="fa fa-edit mr-2 blue-text" aria-hidden="true"></i>
                    <i key={`delete${index}`} onClick={() => deleteConfirm(location)} className="fa fa-trash-alt mr-2 red-text" aria-hidden="true"></i>
                </div>
            }
        })
    };

    return (

        <MDBDataTable
            striped
            bordered
            small
            noBottomColumns
            entries={10}
            entriesOptions={[10, 50, 100]}
            entriesLabel="Show"
            searchLabel="Filter"
            data={data}
        />
    );
};

export default memo(DetailsTableView, (prevState, nextState) => {
   return JSON.stringify(prevState.locationList) !== JSON.stringify(nextState.locationList);
});