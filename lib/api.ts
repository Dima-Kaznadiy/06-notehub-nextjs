import axios from 'axios';


const BASE_URL = 'https://notehub-public.goit.study/api';

const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

const instance = axios.create({
    baseURL: BASE_URL,
    headers: {
        Authorization: `Bearer ${token}`,
    },
});


export interface FetchNotesResponse {
    notes: Note[];
    totalPages: number;
}


export interface FetchNotesParams {
    page: number;
    search?: string;
}


export const fetchNotes = async ({
    page,
    search = '',
}: FetchNotesParams): Promise<FetchNotesResponse> => {
    const { data } = await instance.get<FetchNotesResponse>('/notes', {
        params: {
            page,
            perPage: 12,
            search,
        },
    });

    return data;
};


export const createNote = async (
    note: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>
): Promise<Note> => {
    const { data } = await instance.post<Note>('/notes', note);
    return data;
};


export const deleteNote = async (id: string): Promise<Note> => {
    const { data } = await instance.delete<Note>(`/notes/${id}`);
    return data;
};

import type { Note } from '@/types/note';

export const fetchNoteById = async (id: string): Promise<Note> => {
    const { data } = await instance.get<Note>(`/notes/${id}`);
    return data;
};