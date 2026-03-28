

'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchNoteById } from '@/lib/api';

interface Props {
    id: string;
}

export default function NoteDetails({ id }: Props) {
    const { data, isLoading, isError } = useQuery({
        queryKey: ['note', id],
        queryFn: () => fetchNoteById(id),
        refetchOnMount: false,
    });

    if (isLoading) return <p>Loading note...</p>;
    if (isError || !data) return <p>Error loading note</p>;

    return (
        <div>
            <h2>{data.title}</h2>
            <p>{data.content}</p>

            <div>
                <span>{data.tag}</span>
                <p>Created: {new Date(data.createdAt).toLocaleString()}</p>
            </div>
        </div>
    );
}