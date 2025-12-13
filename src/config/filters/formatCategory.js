/**
 * Format category field for display
 * Handles both array and string formats
 * @param {String|Array} category - Category field (can be string or array)
 * @returns {String} Formatted category string
 */
module.exports = function(category) {
    if (!category) return "N/A";
    
    if (Array.isArray(category)) {
        return category.join(", ");
    }
    
    return category;
};

