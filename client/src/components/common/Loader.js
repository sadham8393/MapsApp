import React from "react";
import { useSelector, shallowEqual } from 'react-redux';
import { useTranslation } from "react-i18next";

let Loader = () => {
    const { t } = useTranslation();
    const loading = useSelector(state => state.location.isLoading, shallowEqual);
    if (loading) {
        return (
            <div className="spinner-div">
                <div className="spinner-border" role="status" />
                {t('loader')}
            </div>
        )
    }
    return "";
}
export default Loader;