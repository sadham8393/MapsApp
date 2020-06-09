import React, { useState, useEffect } from 'react';
import { ButtonToggle } from 'reactstrap';
import locationList from '../data.json';
import DetailsListView from './DetailsListView';
import DetailsTableView from './DetailsTableView';
import { Route, useHistory, Switch } from "react-router-dom";


const MapDetails = () => {

    let history = useHistory();

    const [activeBtn, setActiveBtn] = useState("listView");

    useEffect(() => {
        const pathnameSplit = history.location.pathname.split("/");
        const pathName = pathnameSplit[pathnameSplit.length - 1];
        setActiveBtn(pathName === "details" ? "listView" : pathName);
    }, [history.location.pathname]);

    const buttonClick = (viewType) => {
        setActiveBtn(viewType);
        history.push(`/details/${viewType}`);
    }
    return (
        <div className="details-div">
            <div>
                <ButtonToggle className={activeBtn === "listView" ? "active-btn" : ""} onClick={(e) => buttonClick("listView")}>List View</ButtonToggle>
                <ButtonToggle className={activeBtn === "tableView" ? "active-btn" : ""} onClick={(e) => buttonClick("tableView")}>Table View</ButtonToggle>
            </div>

            <Switch>
                <Route exact path="/details" render={
                    () => (<DetailsListView locationList={locationList} />)
                } />/>
                <Route path="/details/listView" render={
                    () => (<DetailsListView locationList={locationList} />)
                } />/>
                <Route path="/details/tableView" render={
                    () => (<DetailsTableView locationList={locationList} />)
                } />/>
            </Switch>

            {/* <DetailsListView index={index} locationList={locationList} /> */}
        </div>
    );
}

export default MapDetails;