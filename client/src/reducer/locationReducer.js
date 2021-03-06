import {
    FETCH_LOCATION, FETCH_LOCATION_SUCCESS, FETCH_LOCATION_ERROR, CUSTOM_INFO_MESSAGE,
    ADD_LOCATION_SUCCESS, ADD_LOCATION_ERROR, DELETE_LOCATION_SUCCESS, DELETE_LOCATION_ERROR,
    ADD_LOCATION, DELETE_LOCATION, RESET_RESPONSE, UPDATE_LOCATION, UPDATE_LOCATION_SUCCESS, UPDATE_LOCATION_ERROR,
    DELETE_MULTI_LOCATION, DELETE_MULTI_LOCATION_SUCCESS, DELETE_MULTI_LOCATION_ERROR
} from '../utils/constants';

const initialState = {
    isLoading: false,
    location: [],
    error: null,
    success: null,
    info: null,
    totalRecords: 0
};

export default function locationReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_LOCATION:
            return Object.assign({}, state, {
                ...state,
                location: [],
                isLoading: true,
                info: null,
                error: null,
                success: null,
                totalRecords: 0
            });
        case FETCH_LOCATION_SUCCESS:
            return Object.assign({}, state, {
                ...state,
                isLoading: false,
                location: action.location.results,
                totalRecords: action.location.totalRecords
            });
        case FETCH_LOCATION_ERROR:
            return Object.assign({}, state, {
                ...state,
                isLoading: false,
                location: [],
                error: action.error,
                totalRecords: 0
            });
        case ADD_LOCATION:
            return Object.assign({}, state, {
                ...state,
                location: [],
                isLoading: true,
                info: null,
                error: null,
                success: null,
                totalRecords: 0
            });
        case ADD_LOCATION_SUCCESS:
            return Object.assign({}, state, {
                ...state,
                isLoading: false,
                success: action.success,
                info: action.info || null,
                error: null,
                totalRecords: 0
            });
        case ADD_LOCATION_ERROR:
            return Object.assign({}, state, {
                ...state,
                isLoading: false,
                location: [],
                info: null,
                success: null,
                error: action.error,
                totalRecords: 0
            });
        case UPDATE_LOCATION:
            return Object.assign({}, state, {
                ...state,
                location: [],
                isLoading: true,
                info: null,
                error: null,
                success: null,
                totalRecords: 0
            });
        case UPDATE_LOCATION_SUCCESS:
            return Object.assign({}, state, {
                ...state,
                isLoading: false,
                success: action.success,
                info: action.info || null,
                error: null,
                totalRecords: 0
            });
        case UPDATE_LOCATION_ERROR:
            return Object.assign({}, state, {
                ...state,
                isLoading: false,
                location: [],
                info: null,
                success: null,
                error: action.error,
                totalRecords: 0
            });
        case DELETE_LOCATION:
            return Object.assign({}, state, {
                ...state,
                location: [],
                isLoading: true,
                error: null,
                info: null,
                success: null,
                totalRecords: 0
            });
        case DELETE_LOCATION_SUCCESS:
            return Object.assign({}, state, {
                ...state,
                isLoading: false,
                error: null,
                info: action.info || null,
                success: action.success,
                totalRecords: 0
            });
        case DELETE_LOCATION_ERROR:
            return Object.assign({}, state, {
                ...state,
                isLoading: false,
                location: [],
                success: null,
                info: null,
                error: action.error,
                totalRecords: 0
            });
        case DELETE_MULTI_LOCATION:
            return Object.assign({}, state, {
                ...state,
                location: [],
                isLoading: true,
                error: null,
                info: null,
                success: null,
                totalRecords: 0
            });
        case DELETE_MULTI_LOCATION_SUCCESS:
            return Object.assign({}, state, {
                ...state,
                isLoading: false,
                error: null,
                info: action.info || null,
                success: action.success,
                totalRecords: 0
            });
        case DELETE_MULTI_LOCATION_ERROR:
            return Object.assign({}, state, {
                ...state,
                isLoading: false,
                location: [],
                success: null,
                info: null,
                error: action.error,
                totalRecords: 0
            });
        case CUSTOM_INFO_MESSAGE:
            return Object.assign({}, state, {
                ...state,
                isLoading: false,
                success: null,
                info: action.info,
                error: null
            });
        case RESET_RESPONSE:
            return Object.assign({}, state, {
                ...state,
                isLoading: false,
                success: null,
                info: null,
                error: null
            });
        default:
            return state;
    }
}