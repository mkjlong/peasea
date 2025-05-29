import classes from "./Fumen.module.css";
import type { FC } from 'react';
import { encoder, decoder, Pages } from 'tetris-fumen';
import { FumenImage } from './FumenImage/FumenImage';
import { useEffect, useRef, useState } from "react";

interface Props {
    className?: string;
    fumen: string;
    showComments?: boolean;
    setFumen?: (newFumen: string) => void;
}

export const Fumen: FC<Props> = (props: Props) => {
    const { fumen, className, showComments = true, setFumen } = props;
    const commentRef = useRef<HTMLInputElement>(null);

    let pages: Pages;
    try {
        pages = decoder.decode(fumen);
    } catch {
        return <></>;
    }

    const [pageIndex, setPageIndex] = useState(0);
    const currentPage = pages[pageIndex];
    const [comment, setComment] = useState(currentPage.comment ?? "");

    // Sync state when fumen changes from outside
    useEffect(() => {
        try {
            const updatedPages = decoder.decode(fumen);
            const page = updatedPages[pageIndex];
            setComment(page.comment ?? "");
        } catch {}
    }, [fumen, pageIndex]);

    const handleCommentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newComment = e.target.value;
        setComment(newComment);
        currentPage.comment = newComment;

        if (setFumen) {
            const updatedFumen = encoder.encode(pages);
            setFumen(updatedFumen);
        }
    };

    return (
        <div className={classes.fumen + (className ? ` ${className}` : "")}>
            <FumenImage page={currentPage} />
            {showComments && (
                <input
                    type="text"
                    ref={commentRef}
                    className={classes.comments}
                    value={comment}
                    onChange={handleCommentChange}
                />
            )}
        </div>
    );
};
