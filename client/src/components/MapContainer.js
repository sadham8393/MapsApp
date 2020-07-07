import React, { useState } from 'react';
import { Map, Marker, GoogleApiWrapper, InfoWindow } from 'google-maps-react';
import { useSelector, shallowEqual } from 'react-redux';
import { useTranslation } from "react-i18next";

const MapContainer = (props) => {
    const [selectedMarker, setSelectedMarker] = useState({
        position: { latitude: 47.444, longitude: -122.176 }
    });
    const [activeMarker, setActiveMarker] = useState(null);
    const [infoOpen, setInfoOpen] = useState(false);

    const { t } = useTranslation();

    const locationList = useSelector(state => state.location.location, shallowEqual);

    const mapStyles = {
        width: '100%',
        height: '100%',
    };

    let displayMarkers = (props) => {
        window.google = props.google;
        return (locationList || []).map((item) => {
            return (
                <Marker key={item._id} id={`marker-${item._id}`} onClick={onMarkerClick} position={{
                    lat: item.latitude,
                    lng: item.longitude,
                    area: item.area
                }} />
            )
        });
    }

    const onMarkerClick = (item, marker, e) => {
        setSelectedMarker({
            position: {
                latitude: item.position.lat,
                longitude: item.position.lng,
                area: item.position.area
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
            zoom={2}
            style={mapStyles}
            initialCenter={{ lat: selectedMarker.position.latitude, lng: selectedMarker.position.longitude }}
        >
            {
                displayMarkers(props)
            }
            {
                <InfoWindow marker={activeMarker} visible={infoOpen} onClose={handleWindowClose} >
                    <div>
                        <h2>{selectedMarker.position.area}</h2>
                        <h3>{t('latitude')}: {selectedMarker.position.latitude}</h3>
                        <h3>{t('longitude')}: {selectedMarker.position.longitude}</h3>
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