

const BookmarkButton = ({ isBookmarked, onClick }: {isBookmarked: boolean,onClick: () => void}) => {

    const onBookmarkClick = () => {
        onClick();
    }

    if (isBookmarked) return (
        <svg onClick={onBookmarkClick} style={{cursor: "pointer"}} xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="#7950F1"  className="icon icon-tabler icons-tabler-filled icon-tabler-bookmark"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M14 2a5 5 0 0 1 5 5v14a1 1 0 0 1 -1.555 .832l-5.445 -3.63l-5.444 3.63a1 1 0 0 1 -1.55 -.72l-.006 -.112v-14a5 5 0 0 1 5 -5h4z" /></svg>
    )


    return (
        <svg onClick={onBookmarkClick} style={{cursor: "pointer"}} xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="#7950F1"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-bookmark"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M18 7v14l-6 -4l-6 4v-14a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4z" /></svg>
    )
};

export default BookmarkButton;