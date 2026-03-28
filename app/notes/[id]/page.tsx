import { QueryClient, dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { fetchNoteById } from '@/lib/api';
import NoteDetails from './NoteDetails.client';

export default async function NotePage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {

    const { id } = await params;

    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
        queryKey: ['note', id],
        queryFn: () => fetchNoteById(id),
    });

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <NoteDetails id={id} />
        </HydrationBoundary>
    );
}