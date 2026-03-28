'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchNotes } from '../../lib/api';
import { useDebouncedCallback } from 'use-debounce';

import NoteList from '../../components/NoteList/NoteList';
import SearchBox from '../../components/SearchBox/SearchBox';
import Pagination from '../../components/Pagination/Pagination';
import Modal from '../../components/Modal/Modal';
import NoteForm from '../../components/NoteForm/NoteForm';

import css from '../notes/Notes.module.css';

export default function App() {
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    // debounce
    const debouncedSearch = useDebouncedCallback((value: string) => {
        setSearch(value);
        setPage(1);
    }, 500);

    // query
    const { data, isLoading, isError } = useQuery({
        queryKey: ['notes', page, search],
        queryFn: () => fetchNotes({ page, search }),


        placeholderData: (previousData) => previousData,
    });

    return (
        <div className={css.app}>
            <header className={css.toolbar}>
                <SearchBox onSearch={debouncedSearch} />

                {data && data.totalPages > 1 && (
                    <Pagination
                        totalPages={data.totalPages}
                        currentPage={page}
                        onPageChange={setPage}
                    />
                )}

                <button
                    className={css.button}
                    onClick={() => setIsModalOpen(true)}
                >
                    Create note +
                </button>
            </header>

            {/* статуси */}
            {isLoading && <p>Loading...</p>}
            {isError && <p>Error loading notes</p>}

            {/* список */}
            {data && data.notes.length > 0 && (
                <NoteList notes={data.notes} />
            )}


            {isModalOpen && (
                <Modal onClose={() => setIsModalOpen(false)}>
                    <NoteForm onClose={() => setIsModalOpen(false)} />
                </Modal>
            )}
        </div>
    );
}

