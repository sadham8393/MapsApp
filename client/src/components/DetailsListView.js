import React, { useState, useEffect, useMemo } from 'react';
import { MDBCol, MDBCard, MDBCardTitle, MDBBtn, MDBCardGroup, MDBCardText, MDBCardBody } from 'mdbreact';
import { singleCheckClick, checkboxAllClick, sortBy } from '../utils/utilities';
import { useSelector, shallowEqual } from 'react-redux';
import Pagination from '../components/common/Pagination';
import Search from '../components/common/Search';

const DetailsListView = ({ deleteConfirm, editClick, multiDelete }) => {
    const locationList = useSelector(state => state.location.location, shallowEqual);
    const [allChecked, setAllChecked] = useState(false);
    let [selectedLocation, setSelectedLocation] = useState([]);

    let [sort, setSort] = useState("default");
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
        if (sort && computedData.length > 0) {
            computedData = sortBy(sort, computedData, 'area');
        }

        //Current Page slice
        setRangeFrom((currentPage - 1) * itemsPerPage + 1)
        setRangeTo((currentPage - 1) * itemsPerPage + itemsPerPage)
        return computedData.slice(
            (currentPage - 1) * itemsPerPage,
            (currentPage - 1) * itemsPerPage + itemsPerPage
        );
    }, [sort, locationList, currentPage, itemsPerPage, search]);

    /**
     * 
     * @param {checkBoxClick} event 
     * @param {single location object} location 
     * @param {total location list} locationList 
     * 
     * utility will be called
     */
    const checkBoxClick = (event, location, locationList) => {
        singleCheckClick(event, location, locationList, selectedLocation, setAllChecked, setSelectedLocation, multiDelete);
    }

    /**
     * 
     * @param {allCheckedChangeHandler} event 
     * @param {total location list} locationList 
     * 
     * utility will be called
     */
    const allCheckedChangeHandler = (event, locationList) => {
        checkboxAllClick(event, selectedLocation, locationList, setAllChecked, setSelectedLocation, multiDelete);
    }

    const sortChange = (e) => {
        setSort(e.target.value);
    }

    const handlePageChange = (page) => {
        setCurrentPage(page);
    }

    const showChange = (e) => {
        setItemsPerPage(parseInt(e.target.value));
        setCurrentPage(1);
    }

    return (
        <div>
            <Search
                onSearch={value => {
                    setSearch(value);
                    setCurrentPage(1);
                }}
                rangeFrom={rangeFrom}
                rangeTo={rangeTo}
                total={totalCount}
            />
            {
                totalCount > 0 &&

                <div className="card-selectAll-div custom-control custom-checkbox">

                    <div className="checkbox-div">
                        <input type="checkbox" id="defaultUnchecked" checked={allChecked || false} onChange={(e) => allCheckedChangeHandler(e, locationList)}></input>
                        <label htmlFor="defaultUnchecked">Select All</label>
                    </div>

                    <div className="sort-div">
                        <label htmlFor="sortBy">Sory By</label>
                        <select id="sortBy" onChange={sortChange}>
                            <option value="default">Default</option>
                            <option value="asc">Ascending</option>
                            <option value="desc">Descending</option>
                        </select>
                    </div>

                </div>
            }

            <MDBCardGroup>
                {
                    locationData.map((item, index) => {
                        return (
                            <MDBCol key={`card-${index}`} xs="12" sm="6" md="4" lg="3">
                                <MDBCard>
                                    <MDBCardBody>
                                        <div className="card-checkbox-div">
                                            <input type="checkbox" checked={allChecked ? allChecked : item.checked ? item.checked : false} onChange={(e) => checkBoxClick(e, item, locationList)} />
                                            <MDBCardTitle>{item.area}</MDBCardTitle>
                                            <div></div>
                                        </div>
                                        <MDBCardText><strong>Latitude :</strong> {item.latitude}</MDBCardText>
                                        <MDBCardText><strong>Longtitude :</strong> {item.longitude}</MDBCardText>
                                        <MDBCardText><strong>City :</strong> {item.city}</MDBCardText>
                                        <MDBCardText><strong>Country :</strong> {item.country}</MDBCardText>
                                        <MDBBtn color="primary" onClick={(e) => editClick(item)}>Edit</MDBBtn>
                                        <MDBBtn color="danger" onClick={(e) => deleteConfirm(item)}>Delete</MDBBtn>
                                    </MDBCardBody>
                                </MDBCard>
                            </MDBCol>
                        )
                    })
                }
            </MDBCardGroup>
            <div className="pagination-div">
                {
                    totalCount > 0 &&
                    <>
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
                    </>
                }
            </div>
        </div>

    )
}

export default DetailsListView;