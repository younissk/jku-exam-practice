import {create} from 'zustand';


interface SearchStore {
    subject: string;
    year: string;
    source: string;
    topic: string;
    setTopic: (topic: string) => void;
    setSubject: (subject: string) => void;
    setYear: (year: string) => void;
    setSource: (source: string) => void;
}

const useSearchStore = create<SearchStore>((set) => ({
    subject: '',
    year: '',
    source: '',
    topic: '',
    setTopic: (topic: string) => set({topic}),
    setSubject: (subject: string) => set({subject}),
    setYear: (year: string) => set({year}),
    setSource: (source: string) => set({source}),
}));

export default useSearchStore;