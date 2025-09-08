const MAX_PAGES = 5;

export const getPaginationRange = (currentPage: number, totalPages: number): number[] => {
    const halfMaxPages = Math.floor(MAX_PAGES / 2);
    const startPageOffset = currentPage - halfMaxPages;
    let startPage = Math.max(1, startPageOffset);
    const endPage = startPage + (MAX_PAGES - 1);

    if (endPage > totalPages) {
        startPage = Math.max(1, totalPages - MAX_PAGES + 1);
    }

    const paginationLength = totalPages < MAX_PAGES ? totalPages : MAX_PAGES;

    return Array.from({ length: paginationLength }, (_, value) => startPage + value);

    return [1, 2, 3, 4, 5];
};
