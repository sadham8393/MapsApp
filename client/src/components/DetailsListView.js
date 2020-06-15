import React from 'react';
import { MDBCol, MDBCard, MDBCardTitle, MDBBtn, MDBCardGroup, MDBCardText, MDBCardBody } from 'mdbreact';

const DetailsListView = ({ locationList = [], deleteConfirm, editClick }) => {
    return (
        <MDBCardGroup>
            {
                locationList.map((location, index) => {
                    return (
                        <MDBCol key={index} xs="12" sm="6" md="4" lg="3">
                            <MDBCard>
                                <MDBCardBody>
                                    <MDBCardTitle>{location.area}</MDBCardTitle>
                                    <MDBCardText><b>Latitude :</b> {location.latitude}</MDBCardText>
                                    <MDBCardText><b>Longtitude :</b> {location.longitude}</MDBCardText>
                                    <MDBBtn color="primary" onClick={(e) => editClick(location)}>Edit</MDBBtn>
                                    <MDBBtn color="danger" onClick={(e) => deleteConfirm(location)}>Delete</MDBBtn>
                                </MDBCardBody>
                            </MDBCard>
                        </MDBCol>
                    )

                })
            }
        </MDBCardGroup>
    )
}

export default DetailsListView;