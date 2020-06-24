import React, { useState, useEffect } from 'react';
import DetailsListView from './DetailsListView';
import DetailsTableView from './DetailsTableView';
import { Route, useHistory, Switch, NavLink } from "react-router-dom";
import { useSelector, shallowEqual } from 'react-redux';
import { MDBIcon, MDBTooltip, MDBBtn } from 'mdbreact';
import NoRecords from './common/NoRecords';
import _ from 'lodash'

const MapDetails = (props) => {
    const locationList = useSelector(state => state.location.location, shallowEqual);

    let history = useHistory();

    const [activeBtn, setActiveBtn] = useState("listView");
    const [deleteBtnDisbled, setDeleteBtnDisabled] = useState(true);
    const [multiLocation, setMultiLocation] = useState([]);

    useEffect(() => {
        const pathnameSplit = history.location.pathname.split("/");
        const pathName = pathnameSplit[pathnameSplit.length - 1];
        setActiveBtn(pathName === "details" ? "listView" : pathName);
    }, [history.location.pathname]);

    useEffect(() => {
        setDeleteBtnDisabled(props.deleteBtnDisabled);
    }, [props.deleteBtnDisabled]);

    const multiDelete = (locationArr) => {
        const length = locationArr.length;
        setDeleteBtnDisabled(!(length > 0));
        setMultiLocation(locationArr);
    }

    const deleteLocationList = () => {
        const areaArr = _.map(multiLocation, 'area');
        const _id = _.map(multiLocation, '_id');
        props.deleteConfirm({ areaArr, _id }, deleteBtnDisbled);
    }

    return (
        <div className="details-div">
            {
                (locationList && locationList.length > 0) ?
                    <div>
                        <div className="multi-delete-form">
                            <div></div>
                            <ul className="list-table-view-link">
                                <li className="nav-item">
                                    <MDBTooltip material placement="top">
                                        <NavLink exact to="/details/listView" className={activeBtn === "listView" ? "active-btn" : ""}>
                                            <MDBIcon className="icon-font" icon="th-list" />
                                        </NavLink>
                                        <div>List View</div>
                                    </MDBTooltip>
                                </li>
                                <li className="nav-item">
                                    <MDBTooltip material placement="top">
                                        <NavLink to="/details/tableView" className={activeBtn === "tableView" ? "active-btn" : ""}>
                                            <MDBIcon className="icon-font" icon="table" />
                                        </NavLink>
                                        <div>Table View</div>
                                    </MDBTooltip>
                                </li>
                            </ul>
                            <MDBBtn color="danger" disabled={deleteBtnDisbled} onClick={() => deleteLocationList()}>
                                Delete
                            </MDBBtn>
                        </div>
                        <Switch>
                            <Route exact path="/details" render={
                                () => (<DetailsListView locationList={locationList} deleteConfirm={props.deleteConfirm}
                                    editClick={props.editClick} multiDelete={multiDelete} />)
                            } />
                            <Route path="/details/listView" render={
                                () => (<DetailsListView locationList={locationList} deleteConfirm={props.deleteConfirm}
                                    editClick={props.editClick} multiDelete={multiDelete} />)
                            } />
                            <Route path="/details/tableView" render={
                                () => (<DetailsTableView locationList={locationList} deleteConfirm={props.deleteConfirm}
                                    editClick={props.editClick} multiDelete={multiDelete} />)
                            } />
                        </Switch>
                    </div>
                    :
                    <NoRecords />
            }
        </div>
    );
}

export default MapDetails;