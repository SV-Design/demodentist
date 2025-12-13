/**
 * Get unique transmission and seat options for a category
 * @param {Array} cars - Array of car objects
 * @param {String} categoryTitle - Category title to filter by
 * @returns {Object} Object with transmissions and seats arrays
 */
module.exports = function(cars, categoryTitle) {
    const transmissions = new Set();
    const seats = new Set();
    
    cars.forEach(car => {
        if (car.data && car.data.category) {
            // Handle both array and string formats for backward compatibility
            const carCategories = Array.isArray(car.data.category) 
                ? car.data.category 
                : [car.data.category];
            
            if (carCategories.includes(categoryTitle)) {
            if (car.data.transmission) {
                transmissions.add(car.data.transmission);
            }
            if (car.data.seats) {
                seats.add(car.data.seats);
                }
            }
        }
    });
    
    return {
        transmissions: Array.from(transmissions).sort(),
        seats: Array.from(seats).sort((a, b) => parseInt(a) - parseInt(b))
    };
};

