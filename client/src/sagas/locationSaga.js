import { fetchLocationApi, addLocationApi, deleteLocationApi, updateLocationApi } from '../api/locationApi'
import { put, call, takeLatest } from 'redux-saga/effects';
import {
    FETCH_LOCATION_SUCCESS, FETCH_LOCATION_ERROR, ADD_LOCATION_SUCCESS, ADD_LOCATION_ERROR,
    DELETE_LOCATION_SUCCESS, DELETE_LOCATION_ERROR, FETCH_LOCATION, ADD_LOCATION, DELETE_LOCATION, 
    UPDATE_LOCATION, UPDATE_LOCATION_ERROR, UPDATE_LOCATION_SUCCESS
} from '../utils/constants';

export function* fetchLocation() {
    try {
        const payload = yield call(fetchLocationApi);
        yield put({ type: FETCH_LOCATION_SUCCESS, location: payload });
    } catch (error) {
        yield put({ type: FETCH_LOCATION_ERROR, error });
    }
}

export function* addLocation(action) {
    try {
        const payload = yield call(addLocationApi, action.location);
        if(payload.error){
             yield put({ type: ADD_LOCATION_ERROR, error: payload.error});
        } else {
            yield put({ type: ADD_LOCATION_SUCCESS, success: payload.message });
        }
        yield fetchLocation();
    } catch (error) {
        yield put({ type: ADD_LOCATION_ERROR, error: error.response.data.message });
    }
}

export function* updateLocation(action) {
    try {
        const payload = yield call(updateLocationApi, action.location);
        if(payload.error){
             yield put({ type: UPDATE_LOCATION_ERROR, error: payload.error});
        } else {
            yield put({ type: UPDATE_LOCATION_SUCCESS, success: payload.message });
        }
        yield fetchLocation();
    } catch (error) {
        yield put({ type: UPDATE_LOCATION_ERROR, error: error.response.data.message });
    }
}

export function* deleteLocation(action) {
    try {
        const payload = yield call(deleteLocationApi, action.location);
        yield put({ type: DELETE_LOCATION_SUCCESS, success: payload.message });
        yield fetchLocation();
    } catch (error) {
        yield put({ type: DELETE_LOCATION_ERROR, error: error.response.data.message });
    }
}

export function* actionWatcher() {
    yield takeLatest(FETCH_LOCATION, fetchLocation);
    yield takeLatest(ADD_LOCATION, addLocation);
    yield takeLatest(DELETE_LOCATION, deleteLocation);
    yield takeLatest(UPDATE_LOCATION, updateLocation);
}