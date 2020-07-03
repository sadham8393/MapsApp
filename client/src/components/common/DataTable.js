import React from "react";
import { MDBTable, MDBTableBody, MDBTableHead, MDBIcon } from 'mdbreact';

const DataTable = ({ data, onSortingChange, sortingField, sortingOrder }) => {

    const renderTableBody = (item, index) => {
        return Object.entries(item).map(row => {
            const [key, value] = row;
            return <td key={`td-${key}-${index}`}>{value}</td>
        });
    }

    const renderTableHeader = (item) => {
        return (
            <tr>
                {
                    item.columns && item.columns.map(({ header, field, sortable, width}) => {
                        return <th
                            key={`th-${header}`}
                            style={{width: width}}
                            onClick={() =>
                                sortable ? onSortingChange(field) : null
                            }
                        >
                            {header}
                            {sortingField && sortingField === field && (
                                <MDBIcon
                                    icon={
                                        sortingOrder === "asc" ? "arrow-down" : (sortingOrder === "desc" ? "arrow-up" : "")
                                    }
                                />
                            )}
                        </th>
                    })
                }
            </tr>
        )
    }

    return (
        <MDBTable small bordered>
            <MDBTableHead>
                {
                    renderTableHeader(data)
                }
            </MDBTableHead>
            <MDBTableBody>
                {
                    data.rows && data.rows.map((item, index) => {
                        return (
                            <tr key={`loc-table-tr-${index}`}>
                                {
                                    renderTableBody(item, index)
                                }
                            </tr>
                        )
                    })
                }
            </MDBTableBody>
        </MDBTable>
    );
}

export default DataTable;
