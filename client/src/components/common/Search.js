import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

const Search = ({ onSearch, total = 0, rangeFrom = 0, rangeTo = 0 }) => {
    const [search, setSearch] = useState("");
    const { t } = useTranslation();
    const onInputChange = value => {
        setSearch(value);
        onSearch(value);
    };
    return (
        <div className="search-div">
            <input
                type="text"
                placeholder={t("search")}
                className="form-control"
                value={search}
                onChange={e => onInputChange(e.target.value)}
            />
        </div>
    );
};

export default Search;