export let sortFieldType = null;

/**
 * sort types constants
 */
export const sortTypes = {
    asc: {
        class: 'sort-up',
        fn: (a, b) => {
            return a[sortFieldType].localeCompare(b[sortFieldType], 'en', { sensitivity: 'base' })
        }
    },
    desc: {
        class: 'sort-down',
        fn: (a, b) => {
            return b[sortFieldType].localeCompare(a[sortFieldType], 'en', { sensitivity: 'base' })
        }
    },
    default: {
        class: 'sort',
        fn: (a) => {
            return a
        }
    }
}

/**
 * 
 * @param {*} event 
 * @param {*} location 
 * @param {*} locationList 
 * @param {*} selectedLocation 
 * @param {*} setAllChecked 
 * @param {*} setSelectedLocation 
 * @param {*} multiDelete 
 * 
 * Cleanup to be done
 */
export const singleCheckClick = (event, location, locationList, selectedLocation, setAllChecked, setSelectedLocation, multiDelete) => {
    selectedLocation = selectedLocation.filter(obj => obj._id !== location._id);
    const checked = event.currentTarget.checked || false;
    location.checked = checked;
    if (checked) {
        selectedLocation.push(location);
    }

    setAllChecked(selectedLocation.length === locationList.length);
    setSelectedLocation(selectedLocation);
    multiDelete(selectedLocation);
}

/**
 * 
 * @param {*} event 
 * @param {*} selectedLocation 
 * @param {*} locationList 
 * @param {*} setAllChecked 
 * @param {*} setSelectedLocation 
 * @param {*} multiDelete 
 * 
 * cleanup to be done
 */

export const checkboxAllClick = (event, selectedLocation, locationList, setAllChecked, setSelectedLocation, multiDelete) => {
    const checked = event.currentTarget.checked || false;
    selectedLocation = locationList.map(obj => {
        obj.checked = checked;
        return obj;
    });
    selectedLocation = checked ? selectedLocation : [];
    setAllChecked(checked);
    setSelectedLocation(selectedLocation);
    multiDelete(selectedLocation);
}

/**
 * 
 * @param {"asc" or "desc" or default""} currentSort 
 * @param {total list} list 
 * @param {sort field} type 
 */
export const sortBy = (currentSort, list, sortField) => {
    sortFieldType = sortField;
    return [...list].sort(sortTypes[currentSort].fn);
}