import React, { useEffect, useState } from 'react';
import MapContainer from './MapContainer';
import MapDetails from './MapDetails';
import { Route, NavLink, Switch } from "react-router-dom";
import NotFound from './NotFound';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { fetchLocation } from '../actions/locationAction';
import Alert from './common/Alert';
import Loader from './common/Loader';

import { MDBBtn } from 'mdbreact';
import LocationModal from './LocationModal';
import ConfirmModal from './common/ConfirmModal';
import { addLocation, deleteLocation, updateLocation } from '../actions/locationAction';


const Home = () => {
    const locationList = useSelector(state => state.location.location, shallowEqual);

    const [modalOpen, setModalOpen] = useState(false);
    const [confirmModalOpen, setConfirmModalOpen] = useState(false);
    const [deleteConfirmMsg, setDeleteConfirmMsg] = useState(null);
    const [location, setLocation] = useState(null);
    const [deleteBtnDisabled, setDeleteBtnDisabled] = useState(true);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchLocation());
    }, [dispatch]);

    const addLoc = ({ latitude, longitude, area, city, country }) => {
        dispatch(addLocation({
            latitude, longitude, area, city, country
        }));
    }

    const editClick = (loc, editMode) => {
        setLocation({...loc, new:false});
        setModalOpen(true);
        //To do delete dispatch
    }

    const deleteLoc = (loc) => {
        dispatch(deleteLocation(loc));
        setDeleteBtnDisabled(!deleteBtnDisabled)
    }

    const updateLoc = (loc) => {
        dispatch(updateLocation(loc));
    }

    const deleteConfirm = (loc, disabled=true) => {
        setDeleteBtnDisabled(disabled);
        let msg;
        if (loc.areaArr) {
            setLocation(loc);
            msg = loc.areaArr.join(",");

        } else {
            setLocation(loc)
        }
        setDeleteConfirmMsg(`Are you sure you want to delete ${msg ? msg : loc.area}?`);
        setConfirmModalOpen(true);
    }


    const modalToggle = (modalOpen) => {
        setModalOpen(modalOpen);
    }

    const confirmModalToggle = (confirmModalOpen) => {
        setConfirmModalOpen(confirmModalOpen);
        setDeleteConfirmMsg(null);
    }

    return (
        <div>
            <nav className="navbar navbar-expand-sm bg-dark">
                <ul className="nav navbar-nav">
                    <li className="nav-item">
                        <NavLink exact to="/" className="nav-link" activeClassName="nav-link--active">Maps</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/details" className="nav-link" activeClassName="nav-link--active">Details</NavLink>
                    </li>
                </ul>
            </nav>
            <div className="home-nav-container">
                <MDBBtn color="btn purple-gradient" onClick={() => {
                    setLocation(null);
                    setModalOpen(true);
                }}>
                    Add Location
                </MDBBtn>
            </div>

            <LocationModal modalToggle={modalToggle} isModalOpen={modalOpen} addLoc={addLoc}
                updateLoc={updateLoc} locationList={locationList} locationObj={location} />
            <ConfirmModal confirmModalToggle={confirmModalToggle} isModalOpen={confirmModalOpen}
                confirmMsg={deleteConfirmMsg} confirm={deleteLoc} location={location} />

            <Loader />
            <Alert />
            <Switch>
                <Route path="/details" render={
                    () => (<MapDetails locationList={locationList} deleteConfirm={deleteConfirm} editClick={editClick} deleteBtnDisabled={deleteBtnDisabled}/>)
                } />
                {/* <Route path="/details" component={MapDetails} /> */}
                <Route exact={true} path="/" component={MapContainer} />
                <Route component={NotFound} />
            </Switch>
        </div>
    );
}

export default Home;

