


'use client';

import ReactPaginate from 'react-paginate';
import css from './Pagination.module.css';

interface PaginationProps {
    totalPages: number;
    currentPage: number;
    onPageChange: (page: number) => void;
}

export default function Pagination({
    totalPages,
    currentPage,
    onPageChange,
}: PaginationProps) {
    return (
        <ReactPaginate
            pageCount={totalPages}
            onPageChange={(e) => onPageChange(e.selected + 1)}
            forcePage={currentPage - 1}
            containerClassName={css.pagination}
            activeClassName={css.active}
            pageClassName={css.page}
            previousLabel="←"
            nextLabel="→"
        />
    );
}