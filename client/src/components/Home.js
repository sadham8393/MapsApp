import React, { useEffect, useState } from 'react';
import MapContainer from './MapContainer';
import MapDetails from './MapDetails';
import { Route, NavLink, Switch } from "react-router-dom";
import NotFound from './NotFound';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import Alert from './common/Alert';
import Loader from './common/Loader';

import { MDBBtn } from 'mdbreact';
import LocationModal from './LocationModal';
import ConfirmModal from './common/ConfirmModal';
import { FETCH_LOCATION, ADD_LOCATION, DELETE_LOCATION, UPDATE_LOCATION } from '../utils/constants';
import { useTranslation } from "react-i18next";
import { languageList } from '../utils/language';

const Home = () => {
    const locationList = useSelector(state => state.location.location, shallowEqual);
    const loading = useSelector(state => state.location.isLoading, shallowEqual);

    const [modalOpen, setModalOpen] = useState(false);
    const [confirmModalOpen, setConfirmModalOpen] = useState(false);
    const [deleteConfirmMsg, setDeleteConfirmMsg] = useState(null);
    const [location, setLocation] = useState(null);
    const [deleteBtnDisabled, setDeleteBtnDisabled] = useState(true);

    const dispatch = useDispatch();

    const { t, i18n } = useTranslation();

    const changeLanguage = (e) => {
        i18n.changeLanguage(e.target.value);
    };


    useEffect(() => {
        dispatch({ type: FETCH_LOCATION });
    }, [dispatch]);

    const addLoc = ({ latitude, longitude, area, city, country }) => {
        const location = { latitude, longitude, area, city, country };
        dispatch({ type: ADD_LOCATION, location });
    }

    const editClick = (loc, editMode) => {
        setLocation({ ...loc, new: false });
        setModalOpen(true);
        //To do delete dispatch
    }

    const deleteLoc = (loc) => {
        dispatch({ type: DELETE_LOCATION, location: loc });
        setDeleteBtnDisabled(!deleteBtnDisabled)
    }

    const updateLoc = (loc) => {
        dispatch({ type: UPDATE_LOCATION, location: loc });
    }

    const deleteConfirm = (loc, disabled = true) => {
        setDeleteBtnDisabled(disabled);
        let msg;
        if (loc.areaArr) {
            setLocation(loc);
            msg = loc.areaArr.join(",");

        } else {
            setLocation(loc)
        }
        setDeleteConfirmMsg(`${t('deleteConfirm')} ${msg ? msg : loc.area}?`);
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
                        <NavLink exact to="/" className="nav-link" activeClassName="nav-link--active">{t('map')}</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/details" className="nav-link" activeClassName="nav-link--active">{t('details')}</NavLink>
                    </li>
                </ul>
            </nav>
            <div className="home-nav-container">
                <select onChange={changeLanguage}>
                    {languageList.map(lang => {
                        return <option key={lang.value} value={lang.value}>{lang.type}</option>
                    })}
                </select>
                <MDBBtn color="btn purple-gradient" onClick={() => {
                    setLocation(null);
                    setModalOpen(true);
                }}>
                    {t('addLocation')}
                </MDBBtn>
            </div>

            <LocationModal modalToggle={modalToggle} isModalOpen={modalOpen} addLoc={addLoc}
                updateLoc={updateLoc} locationList={locationList} locationObj={location} />
            <ConfirmModal confirmModalToggle={confirmModalToggle} isModalOpen={confirmModalOpen}
                confirmMsg={deleteConfirmMsg} confirm={deleteLoc} location={location} />

            <Alert />

            {
                loading ?
                    <Loader />
                    :
                    <Switch>
                        <Route path="/details" render={
                            () => (<MapDetails deleteConfirm={deleteConfirm} editClick={editClick} deleteBtnDisabled={deleteBtnDisabled} />)
                        } />
                        <Route exact={true} path="/" component={MapContainer} />
                        <Route component={NotFound} />
                    </Switch>
            }
        </div>
    );
}

export default Home;

