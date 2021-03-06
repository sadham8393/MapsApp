import React, { useState, useEffect } from 'react';
import DetailsListView from './DetailsListView';
import DetailsTableView from './DetailsTableView';
import { Route, useHistory, Switch, NavLink } from "react-router-dom";
import { MDBIcon, MDBTooltip, MDBBtn } from 'mdbreact';
import _ from 'lodash'
import { useTranslation } from "react-i18next";

const MapDetails = (props) => {
    let history = useHistory();
    const [activeBtn, setActiveBtn] = useState("listView");
    const [deleteBtnDisbled, setDeleteBtnDisabled] = useState(true);
    const [multiLocation, setMultiLocation] = useState([]);
    const { t } = useTranslation();

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
            <div>
                <div className="multi-delete-form">
                    <div></div>
                    <ul className="list-table-view-link">
                        <li className="nav-item">
                            <MDBTooltip material placement="top">
                                <NavLink exact to="/details/listView" className={activeBtn === "listView" ? "active-btn" : ""}>
                                    <MDBIcon className="icon-font" icon="th-list" />
                                </NavLink>
                                <div>{t('listView')}</div>
                            </MDBTooltip>
                        </li>
                        <li className="nav-item">
                            <MDBTooltip material placement="top">
                                <NavLink to="/details/tableView" className={activeBtn === "tableView" ? "active-btn" : ""}>
                                    <MDBIcon className="icon-font" icon="table" />
                                </NavLink>
                                <div>{t('tableView')}</div>
                            </MDBTooltip>
                        </li>
                    </ul>
                    <MDBBtn color="danger" disabled={deleteBtnDisbled} onClick={() => deleteLocationList()}>
                        {t('delete')}
                    </MDBBtn>
                </div>
                <Switch>
                    <Route exact path="/details" render={
                        () => (<DetailsListView deleteConfirm={props.deleteConfirm}
                            editClick={props.editClick} multiDelete={multiDelete} />)
                    } />
                    <Route path="/details/listView" render={
                        () => (<DetailsListView deleteConfirm={props.deleteConfirm}
                            editClick={props.editClick} multiDelete={multiDelete} />)
                    } />
                    <Route path="/details/tableView" render={
                        () => (<DetailsTableView deleteConfirm={props.deleteConfirm}
                            editClick={props.editClick} multiDelete={multiDelete} />)
                    } />
                </Switch>
            </div>
        </div>
    );
}

export default MapDetails;