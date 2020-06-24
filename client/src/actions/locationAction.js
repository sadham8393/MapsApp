import {
    FETCH_LOCATION, RESET_RESPONSE, ADD_LOCATION, DELETE_LOCATION, CUSTOM_INFO_MESSAGE, UPDATE_LOCATION
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

export const deleteLocation = (location) => {
    return {
        type: DELETE_LOCATION,
        location
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