import axios from 'axios';
import { LOCATION_API_URL } from '../utils/constants';

export function fetchLocationApi() {
    return axios.get(LOCATION_API_URL)
        .then(response => {
            return response.data
        })
        .catch(error => {
            return error.response.data.message;
        });
}

export function addLocationApi(location) {
    return axios.post(LOCATION_API_URL, location)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            return {
                error: error.response.data.message
            };
        });
}

export function updateLocationApi(location) {
    return axios.put(`${LOCATION_API_URL}/${location.id}`, location)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            return {
                error: error.response.data.message
            };
        });
}

export function deleteLocationApi(ids) {
    return axios.delete(`${LOCATION_API_URL}/${ids}`)
        .then(response => {
            return response.data
        })
        .catch(error => {
            return {
                error: error.response.data.message
            };
        });
}
