import React, { useEffect } from 'react';
import MapContainer from './MapContainer';
import MapDetails from './MapDetails';
import { Route, NavLink, Switch } from "react-router-dom";
import NotFound from './NotFound';
import axios from 'axios';

const Home = () => {
    
    return (
        <div>
            <nav className="navbar navbar-expand-sm bg-dark">
                <ul className="nav navbar-nav">
                    <li className="nav-item">
                        <NavLink exact to="/" className="nav-link" activeClassName="nav-link--active">Home</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/details" className="nav-link" activeClassName="nav-link--active">Details</NavLink>
                    </li>
                </ul>
            </nav>
            <Switch>
                <Route path="/details" component={MapDetails} />
                <Route exact={true} path="/" component={MapContainer} />
                <Route component={NotFound} />
            </Switch>
        </div>
    );
}

export default Home;

