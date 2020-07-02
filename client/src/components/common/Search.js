import React, { useState } from "react";

const Search = ({ onSearch, total = 0, rangeFrom = 0, rangeTo = 0 }) => {
    const [search, setSearch] = useState("");

    const onInputChange = value => {
        setSearch(value);
        onSearch(value);
    };
    return (
        <div className="search-div">
            <input
                type="text"
                placeholder="Search"
                className="form-control"
                value={search}
                onChange={e => onInputChange(e.target.value)}
            />
            {
                total > 0 &&
                <div>
                    Showing <strong> {rangeFrom} - {rangeTo > total ? total : rangeTo} </strong> of <strong>{total}</strong>
                </div>
            }
        </div>
    );
};

export default Search;