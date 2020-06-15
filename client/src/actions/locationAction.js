import {
    FETCH_LOCATION, RESET_RESPONSE, ADD_LOCATION, DELETE_LOCATION, CUSTOM_INFO_MESSAGE, UPDATE_LOCATION, DELETE_MULTI_LOCATION
} from '../utils/constants';

export const fetchLocation = () => ({
    type: FETCH_LOCATION
});

export const addLocation = (location) => {
    return {
        type: ADD_LOCATION,
        location
    }
};


export const updateLocation = (location) => {
    return {
        type: UPDATE_LOCATION,
        location
    }
};

export const deleteLocation = (id) => {
    return {
        type: DELETE_LOCATION,
        id
    }
};

export const deleteLocations = (locationObj) => {
    return {
        type: DELETE_MULTI_LOCATION,
        locationObj
    }
};

export const resetResponse = () => {
    return {
        type: RESET_RESPONSE
    };
}

export const customInfoMessage = (info) => {
    return {
        type: CUSTOM_INFO_MESSAGE,
        info
    };
}