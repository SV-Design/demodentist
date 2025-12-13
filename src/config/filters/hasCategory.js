/**
 * Check if a car belongs to a specific category
 * Handles both array and string formats for backward compatibility
 * @param {String|Array} carCategory - Category field from car data (can be string or array)
 * @param {String} categoryTitle - Category title to check against
 * @returns {Boolean} True if car belongs to category
 */
module.exports = function(carCategory, categoryTitle) {
    if (!carCategory) return false;
    
    // Handle both array and string formats for backward compatibility
    if (Array.isArray(carCategory)) {
        return carCategory.includes(categoryTitle);
    }
    
    return carCategory === categoryTitle;
};

