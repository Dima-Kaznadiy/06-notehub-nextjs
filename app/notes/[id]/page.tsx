import { QueryClient, dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { fetchNoteById } from '@/lib/api';
import NoteDetails from './NoteDetails.client';

export default async function NotePage({
    params,
}: {
    params: { id: string };
}) {
    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
        queryKey: ['note', params.id],
        queryFn: () => fetchNoteById(params.id),
    });

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <NoteDetails id={params.id} />
        </HydrationBoundary>
    );
}