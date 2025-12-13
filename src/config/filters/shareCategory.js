/**
 * Check if two cars share at least one category
 * Handles both array and string formats for backward compatibility
 * @param {String|Array} carCategory1 - Category field from first car (can be string or array)
 * @param {String|Array} carCategory2 - Category field from second car (can be string or array)
 * @returns {Boolean} True if cars share at least one category
 */
module.exports = function(carCategory1, carCategory2) {
    if (!carCategory1 || !carCategory2) return false;
    
    // Normalize both to arrays
    const categories1 = Array.isArray(carCategory1) ? carCategory1 : [carCategory1];
    const categories2 = Array.isArray(carCategory2) ? carCategory2 : [carCategory2];
    
    // Check if any category from car1 exists in car2
    return categories1.some(cat => categories2.includes(cat));
};

