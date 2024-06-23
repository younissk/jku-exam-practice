import { create } from "zustand";
import { Question } from "../../data/interfaces/Test";
import { openDB } from 'idb';

export const fetchBookmarksFromDB = async (): Promise<Question[]> => {
    try {
        const db = await openDB('bookmarkDB', 1, {
            upgrade(db) {
                db.createObjectStore('bookmarks');
            },
        });
        const allKeys = await db.getAllKeys('bookmarks');
        const bookmarks = await Promise.all(
            allKeys.map(key => db.get('bookmarks', key))
        );
        return bookmarks.filter(bookmark => bookmark !== undefined) as Question[];
    } catch (error) {
        console.error('Error fetching bookmarks from IndexedDB:', error);
        return [];
    }
};

interface BookmarkStore {
    bookmarks: Question[];
    addBookmark: (bookmark: Question) => void;
    removeBookmark: (bookmark: Question) => void;
    isBookmarked: (bookmark: Question) => Promise<boolean>;
}

const useBookmarkStore = create<BookmarkStore>((set, get) => ({
    bookmarks: [],
    addBookmark: async (bookmark) => {
        try {
            const db = await openDB('bookmarkDB', 1, {
                upgrade(db) {
                    db.createObjectStore('bookmarks');
                },
            });
            await db.put('bookmarks', bookmark, bookmark.id);
            set((state) => ({
                bookmarks: [...state.bookmarks, bookmark],
            }));
        } catch (error) {
            console.error('Error adding bookmark to indexDB:', error);
        }
    },
    removeBookmark: async (bookmark) => {
        try {
            const db = await openDB('bookmarkDB', 1);
            await db.delete('bookmarks', bookmark.id);
            set((state) => ({
                bookmarks: state.bookmarks.filter((b) => b.id !== bookmark.id),
            }));
        } catch (error) {
            console.error('Error removing bookmark from indexDB:', error);
        }
    },
    isBookmarked: async (bookmark) => {
        // look in the store for the bookmark
        const bookmarks = await fetchBookmarksFromDB();
        return bookmarks.some((b) => b.id === bookmark.id);
    },
}));

export default useBookmarkStore;
