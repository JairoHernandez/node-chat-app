var isRealString = (str) => { 
    // returns true for any string even with just spaces.
    // trim() removes leading and trailing spaces but not spaces in between characters
    // '  f r  ' --> 'f r'
    return typeof str === 'string' && str.trim().length > 0;
};

module.exports = {isRealString};

