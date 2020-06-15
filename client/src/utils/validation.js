
export const LAT_REGEX = /^[+-]?(([1-8]?[0-9])(\.[0-9]{1,6})?|90(\.0{1,6})?)$/;
export const LONG_REGEX = /^[+-]?((([1-9]?[0-9]|1[0-7][0-9])(\.[0-9]{1,6})?)|180(\.0{1,6})?)$/;
export const ALPHA_NUM_REGEX = /^\s*([0-9a-zA-Z _]+)\s*$/;

export const isLatValid = (latitude) =>{
    return LAT_REGEX.test(latitude);
} 

export const isLngValid = (longitude) =>{
    return LONG_REGEX.test(longitude);
} 

export const isAreaValid = (area) =>{
    if(!area){
        return false;
    }
    return ALPHA_NUM_REGEX.test(area);
} 