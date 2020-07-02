export let sortFieldType = null;
export let reversed = "";


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
    reversed = currentSort === "asc" ? 1 : (currentSort === "desc" ? -1 : "");
    return [...list].sort((a, b) => {
        if(reversed){
            if(isNaN(a[sortField]) && isNaN(b[sortField])){
                return reversed * a[sortField].localeCompare(b[sortField])
            } else {
                if(currentSort === "asc"){
                    return a[sortField] - b[sortField]
                } else {
                    return b[sortField] - a[sortField]
                }
            }
        } else {
            return a;
        }
    }
    );
}