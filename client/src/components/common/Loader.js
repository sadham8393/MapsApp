import React from "react";
import { useSelector, shallowEqual } from 'react-redux';

let Loader = () => {
    const loading = useSelector(state => state.location.isLoading, shallowEqual);
    if (loading) {
        return (
            <div className="spinner-div">
                <div className="spinner-border" role="status" />
                Loading please wait...
            </div>
        )
    }
    return "";
}
export default Loader;