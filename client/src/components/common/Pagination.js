import React from "react";
import Pagination from "react-js-pagination";
import { MDBIcon } from 'mdbreact';

const PaginationComponent = ({ totalCount = 0, itemsPerPage = 10, currentPage = 1, handlePageChange }) => {
    return (
        <div>
            <Pagination
                activePage={currentPage}
                itemsCountPerPage={itemsPerPage}
                totalItemsCount={totalCount}
                pageRangeDisplayed={5}
                onChange={handlePageChange}
                prevPageText={<MDBIcon icon="angle-left" />}
                nextPageText={<MDBIcon icon="angle-right" />}
                lastPageText={<MDBIcon icon="angle-double-right" />}
                firstPageText={<MDBIcon icon="angle-double-left" />}
            />
        </div>
    );

}

export default PaginationComponent;