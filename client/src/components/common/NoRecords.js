import React from "react";
import { useTranslation } from "react-i18next";

let NoRecords = () => {
    const { t } = useTranslation();
    return (
        <div className="norecords-div">
            {t('noRecordsMessage')}
        </div>
    )
}
export default NoRecords;