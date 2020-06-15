import React, { useState } from 'react';
import { MDBDataTable, MDBInput } from 'mdbreact';

const DetailsTableView = ({ locationList = [], deleteConfirm, editClick, multiDelete }) => {
    const [allChecked, setAllChecked] = useState(false);
    let [selectedLocation, setSelectedLocation] = useState([]);

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

    const data = {
        columns: [
            {
                label: <MDBInput onChange={(e) => allCheckedChangeHandler(e, locationList)} checked={allChecked || false} label=" " type="checkbox" className="checkboxHeader" />,
                field: 'check',
                //sort: 'asc',
                minimal: "sm"
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
                label: 'Area',
                field: 'area',
                sort: 'asc'
            },
            {
                label: 'Created At',
                field: 'createdAt',
                sort: 'asc'
            },
            {
                label: 'Updated At',
                field: 'updatedAt',
                sort: 'asc'
            },
            {
                label: 'Edit/delete',
                field: 'edit'/* ,
                sort: 'asc' */
            }
        ],
        rows: locationList.map((location, index) => {
            return {
                check: <MDBInput key={`check${index}`} label="" type="checkbox" checked={allChecked ? allChecked : location.checked ? location.checked : false}
                    onChange={(e) => checkBoxClick(e, location, locationList)} id={`checkbox${index}`} />,
                latitude: location.latitude,
                longitude: location.longitude,
                area: location.area,
                createdAt: location.createdAt,
                updatedAt: location.updatedAt,
                edit: [
                    <i key={`edit${index}`} onClick={() => editClick(location)} className="fa fa-edit mr-2 blue-text" aria-hidden="true"></i>,
                    <i key={`delete${index}`} onClick={() => deleteConfirm(location)} className="fa fa-trash-alt mr-2 red-text" aria-hidden="true"></i>
                ]
            }
        })
    };

    return (

        <MDBDataTable
            exportToCSV
            striped
            bordered
            small
            noBottomColumns
            entries={10}
            entriesOptions={[10, 50, 100]}
            data={data}
        />
    );
};

export default DetailsTableView;