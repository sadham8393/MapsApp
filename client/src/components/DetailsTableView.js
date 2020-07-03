import React, { useState, useEffect, useMemo } from 'react';
import { singleCheckClick, checkboxAllClick, sortBy } from '../utils/utilities';
import DataTable from '../components/common/DataTable';
import NoRecords from './common/NoRecords';
import { useSelector, shallowEqual } from 'react-redux';
import Pagination from '../components/common/Pagination';
import Search from '../components/common/Search';

const DetailsTableView = ({ deleteConfirm, editClick, multiDelete }) => {
    const locationList = useSelector(state => state.location.location, shallowEqual);
    const [allChecked, setAllChecked] = useState(false);
    let [selectedLocation, setSelectedLocation] = useState([]);
    const [sortingField, setSortingField] = useState("");
    const [sortingOrder, setSortingOrder] = useState("default");

    const [itemsPerPage, setItemsPerPage] = useState(5);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [search, setSearch] = useState('');
    const [totalCount, setTotalCount] = useState(0);
    const [rangeFrom, setRangeFrom] = useState(0);
    const [rangeTo, setRangeTo] = useState(0);


    useEffect(() => {
        if (locationList.length > 0 && itemsPerPage > 0) {
            setTotalPages(Math.ceil(locationList.length / itemsPerPage));
        }
    }, [locationList, itemsPerPage]);

    const locationData = useMemo(() => {
        let computedData = locationList;

        if (search) {
            computedData = computedData.filter(
                item =>
                    item.area.toLowerCase().includes(search.toLowerCase()) ||
                    item.city.toLowerCase().includes(search.toLowerCase()) ||
                    item.country.toLowerCase().includes(search.toLowerCase())
            );
        }

        setTotalCount(computedData.length);
        if (sortingOrder && computedData.length > 0) {
            computedData = sortBy(sortingOrder, computedData, sortingField);
        }

        //Current Page slice
        setRangeFrom((currentPage - 1) * itemsPerPage + 1)
        setRangeTo((currentPage - 1) * itemsPerPage + itemsPerPage)
        return computedData.slice(
            (currentPage - 1) * itemsPerPage,
            (currentPage - 1) * itemsPerPage + itemsPerPage
        );
    }, [locationList, currentPage, itemsPerPage, sortingField, sortingOrder, search]);

    /**
     * 
     * @param {checkBoxClick} event 
     * @param {single location object} location 
     * @param {total location list} locationList 
     * 
     * utility will be called
     */
    const checkBoxClick = (event, item, locationList) => {
        singleCheckClick(event, item, locationList, selectedLocation, setAllChecked, setSelectedLocation, multiDelete);
    };


    /**
     * 
     * @param {allCheckedChangeHandler} event 
     * @param {total location list} locationList 
     * 
     * utility will be called
     */
    const allCheckedChangeHandler = (event, locationList) => {
        checkboxAllClick(event, locationList, locationList, setAllChecked, setSelectedLocation, multiDelete);
    };

    const onSortingChange = (field) => {
        const order = field === sortingField && sortingOrder === "asc" ? "desc" : (sortingOrder === "desc" ? "default" : "asc");
        setSortingField(field);
        setSortingOrder(order);
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    }

    const showChange = (e) => {
        setItemsPerPage(parseInt(e.target.value));
        setCurrentPage(1);
    }

    const data = {
        columns: [
            {
                header: <input onChange={(e) => allCheckedChangeHandler(e, locationList)} checked={allChecked || false} label=" " type="checkbox" />,
                sortable: false,
                width:'1%'
            },
            {
                header: 'Area',
                field: 'area',
                sortingOrder: "",
                sortable: true,
                width:'10%'
            },
            {
                header: 'Latitude',
                field: 'latitude',
                sortingOrder: "",
                sortable: true,
                width:'10%'
            },
            {
                header: 'Longitude',
                field: 'longitude',
                sortingOrder: "",
                sortable: true,
                width:'10%'
            },
            {
                header: 'City',
                field: 'city',
                sortingOrder: "",
                sortable: true,
                width:'10%'
            },
            {
                header: 'Country',
                field: 'country',
                sortingOrder: "",
                sortable: true,
                width:'10%'
            },
            {
                header: 'Action',
                sortable: false,
                width:'1%'
            }
        ],
        rows: locationData.map((item, index) => {
            return {
                check: <input key={`check${index}`} type="checkbox" checked={allChecked ? allChecked : item.checked ? item.checked : false}
                    onChange={(e) => checkBoxClick(e, item, locationList)} />,
                area: item.area,
                latitude: item.latitude,
                longitude: item.longitude,
                city: item.city,
                country: item.country,
                edit: <div className="display-inline-flex">
                    <i key={`edit${index}`} onClick={() => editClick(item)} className="fa fa-edit mr-2 blue-text" aria-hidden="true"></i>
                    <i key={`delete${index}`} onClick={() => deleteConfirm(item)} className="fa fa-trash-alt mr-2 red-text" aria-hidden="true"></i>
                </div>
            }
        })
    }
    return (

        totalCount > 0 ?
            <>
                <Search
                    onSearch={value => {
                        setSearch(value);
                        setCurrentPage(1);
                    }}
                    rangeFrom={rangeFrom}
                    rangeTo={rangeTo}
                    total={totalCount}
                />
                <DataTable data={data} onSortingChange={onSortingChange} sortingField={sortingField} sortingOrder={sortingOrder} />
                <div className="pagination-div">
                    <select onChange={showChange} className="browser-default custom-select">
                        {
                            [5, 10, 50, 100].map(item => {
                                return <option key={`option-${item}`} value={item}>{item}</option>
                            })
                        }
                    </select>
                    {
                        totalPages > 1 &&
                        <Pagination totalCount={totalCount} itemsPerPage={itemsPerPage} currentPage={currentPage} handlePageChange={handlePageChange} />
                    }
                </div>
            </>

            :
            <NoRecords />
    );
}

export default DetailsTableView;