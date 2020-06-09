import React, { useState } from 'react';
import { Map, Marker, GoogleApiWrapper, InfoWindow } from 'google-maps-react';
import locationList from '../data.json';

const MapContainer = (props) => {

    const [selectedMarker, setSelectedMarker] = useState({
        position: { latitude: 47.444, longitude: -122.176 }
    });
    const [activeMarker, setActiveMarker] = useState(null);
    const [infoOpen, setInfoOpen] = useState(false);
    const [location, setLocation] = useState(locationList);

    const mapStyles = {
        width: '100%',
        height: '100%',
    };

    let displayMarkers = () => {
        return location.map((item, index) => {
            onMarkerClick.bind(this, item);
            return (
                <Marker key={item.id} id={`marker-${item.id}`} onClick={onMarkerClick} position={{
                    lat: item.latitude,
                    lng: item.longitude
                }} />
            )
        });
    }

    const onMarkerClick = (item, marker, e) => {
        setSelectedMarker({
            position: {
                latitude: item.position.lat,
                longitude: item.position.lng
            }
        });
        setActiveMarker(marker);
        setInfoOpen(!infoOpen);
    }


    const handleWindowClose = () => {
        setInfoOpen(false);
    }

    return (
        <Map
            google={props.google}
            zoom={6}
            style={mapStyles}
            initialCenter={{ lat: selectedMarker.position.latitude, lng: selectedMarker.position.longitude }}
        >
            {
                displayMarkers()
            }
            {
                <InfoWindow marker={activeMarker} visible={infoOpen} onClose={handleWindowClose} >
                    <div>
                        <h3>Latitude: {selectedMarker.position.latitude}</h3>
                        <h3>Longitude: {selectedMarker.position.longitude}</h3>
                    </div>
                </InfoWindow>
            }
        </Map>
    );
}

export default GoogleApiWrapper(
    (props) => ({
        apiKey: props.apiKey,
        language: props.language,
    }
    ))(MapContainer)