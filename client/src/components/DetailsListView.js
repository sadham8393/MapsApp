import React from 'react';
import { CardGroup, Card, CardBody, CardTitle, CardSubtitle, Button, Col } from 'reactstrap';


const DetailsListView = ({ locationList }) => {
    return (

        <CardGroup>
            {
                locationList.map((location, index) => {
                    /* const delClick = this.deleteConfirmation.bind(this, location),
                        editClick = this.editLocation.bind(this, location); */
                    return (
                        <Col key={index} xs={12} sm={6} md={4} lg={4}>
                            <Card>
                                <CardBody>
                                    <CardTitle>{location.name}</CardTitle>
                                    <CardSubtitle><b>Latitude :</b> {location.latitude}</CardSubtitle>
                                    <CardSubtitle><b>Longtitude :</b> {location.longitude}</CardSubtitle>
                                </CardBody>
                            </Card>
                        </Col>
                    )

                })
            }
        </CardGroup>

    )
}

export default DetailsListView;