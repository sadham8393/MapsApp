import React from 'react';
import { Table, Button } from 'reactstrap';

const DetailsTableView = ({ locationList }) => {
    return (
        <Table>
            <thead>
                <tr>
                    <th>S.No</th>
                    <th>Name</th>
                    <th>Latitude</th>
                    <th>Longitude</th>
                </tr>
            </thead>
            <tbody>
                {
                    locationList.map((location, index) => {
                        return (
                            <tr key={index}>
                                <th scope="row">{++index} </th>
                                <td>{location.name}</td>
                                <td>{location.latitude}</td>
                                <td>{location.longitude}</td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </Table>
    );
}

export default DetailsTableView;