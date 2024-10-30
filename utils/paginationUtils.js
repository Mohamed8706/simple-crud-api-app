/**
 * Calculates pagination parameters based on the current page and limit.
 * @param {number} page - Current page number (defaults to 1).
 * @param {number} limit - Number of items per page (defaults to 10).
 * @returns {object} - An object with pagination options for database queries and metadata for response.
 */
const getPagination = (page = 1, limit = 10) => {
    const currentPage = Math.max(1, page); // Ensure page is at least 1
    const itemsPerPage = Math.max(1, limit); // Ensure limit is at least 1
    const skip = (currentPage - 1) * itemsPerPage; // Calculate the number of items to skip

    return {
        skip, // For database query to skip items
        limit: itemsPerPage, // Limit for database query
        currentPage,
        itemsPerPage,
    };
};

/**
 * Calculates pagination metadata for response.
 * @param {number} totalItems - Total number of items available.
 * @param {number} currentPage - The current page requested.
 * @param {number} itemsPerPage - Number of items per page.
 * @returns {object} - Pagination metadata for API response.
 */
const getPaginationMeta = (totalItems, currentPage, itemsPerPage) => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    return {
        totalItems,
        totalPages,
        currentPage,
        itemsPerPage,
    };
};

module.exports = {
    getPagination,
    getPaginationMeta,
};
