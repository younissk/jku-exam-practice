import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {fetchBookmarksFromDB} from "../../stores/useBookmarkStore";
import useTestStore from "../../stores/useTestStore";
import { useMutation } from "@tanstack/react-query";



const BookmarkRedirect = () => {

    const navigate = useNavigate();

    const { setQuestions, resetEverything } = useTestStore();

    const mutate = useMutation({
        mutationFn: async () => {
            const bookmarks = await fetchBookmarksFromDB();
            return bookmarks;
        },
        onSuccess: async (data) => {
            console.log("Fetched bookmarks: ", data);
            await resetEverything();
            await setQuestions(data);
            if (data.length === 0) {
                navigate("/");
            } else {
                navigate("/test-simulation");
            }
            
        },
        onError: (error) => {
            console.error("Error fetching bookmarks: ", error);
        }
    });

    useEffect(() => {
        mutate.mutate();
    }, [mutate, resetEverything]);

    return (
        <div>
            <h1>Redirecting to Bookmarks...</h1>
        </div>
    );

}

export default BookmarkRedirect;