import React from "react";
import Pagination from "react-js-pagination";
import { MDBIcon } from 'mdbreact';

const PaginationComponent = ({ totalCount = 0, itemsPerPage = 10, currentPage = 1, handlePageChange,
    rangeFrom = 0, rangeTo = 0, showChange, totalPages = 0 }) => {
    return (
        <div className="pagination-div">
            <div>
                Showing <strong> {rangeFrom}{rangeFrom === totalCount ? '' : (rangeTo > totalCount ? `- ${totalCount}` : `- ${rangeTo}`)} </strong> of <strong>{totalCount}</strong>
            </div>

            <div className="pagination-select">
                <select onChange={showChange} className="browser-default custom-select">
                    {
                        [5, 10, 50, 100].map(item => {
                            return <option key={`option-${item}`} value={item}>{item}</option>
                        })
                    }
                </select>
                {
                    totalPages > 1 &&
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
                    />}
            </div>
        </div>
    );

}

export default PaginationComponent;