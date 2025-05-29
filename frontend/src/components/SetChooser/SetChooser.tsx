import { useState } from "react";
import classes from "./SetChooser.module.css";
import Set from "../../scripts/Set";

const sets: Set[] = [
    new Set(
        "Algebruh's 2nd",
        [],
        "algebruh",
        "This set is organized to minimize difficulty while maintaining reliability and usefulness.",
        "https://cdn.discordapp.com/avatars/554411603609518095/161d78efc00421e3a4e62425221f5311.webp?size=40"
    ),
    new Set(
        "2nd 100% T",
        [],
        "mkjl",
        "This set contains every 2nd PC that has a 100% chance of saving into T 3rd.",
        "https://cdn.discordapp.com/avatars/402657980517974026/1f90c2454cdd8f7ad0111a83e66fc55a.webp?size=48"
    ),
    new Set(
        "Theoretical 2nd",
        [],
        "xp3",
        "We know now that theoretically, T>I>J/L>O>S/Z for 3rd PC. We don't know how, but what would 2nd look like if we did?",
        "https://cdn.discordapp.com/avatars/427589146295664667/bfe2236004af8a55971181f3e629c4f3.webp?size=32"
    ),
    new Set(
        "Beginner 2nd",
        [],
        "10Penta",
        "This is a 2nd PC doc truly oriented towards beginners just starting out and aiming to achieve their first 5-10PCs.",
        "https://cdn.discordapp.com/avatars/1050907244193136785/0e027c306413ba120f8bf01cc1558e36.webp?size=40"
    ),
    new Set(
        "FOUR.LOL 2nd",
        [],
        "FOUR",
        "A 4-height perfect clear requires 10 minos. Therefore, after an opening 4-height perfect clear, you will have 4 minos left from the second bag since each bag contains 7 minos. It turns out that you can arrange these 4 minos to give you a high chance of repeating a perfect clear.",
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAxpelRYdFJhdyBwcm9maWxlIHR5cGUgaWNj..."
    ),
];

const SetChooser = () => {
    const [selectedSet, setSelectedSet] = useState<Set | null>(null);

    const handleSetClick = (set: Set) => {
        setSelectedSet(set);
    };

    const confirmSelection = () => {
        if (selectedSet) {
            console.log(`Confirmed set: ${selectedSet.getName()}`);
            // Add logic to save the selected set as the user's personal set
        }
    };

    return (
        <div className={classes.content}>
            {sets.map((set, index) => (
                <div
                    key={index}
                    className={`${classes.setCard} ${selectedSet === set ? classes.selected : ""}`}
                    onClick={() => handleSetClick(set)}
                >
                    <h2 className={classes.setTitle}>{set.getName()}</h2>
                    <p className={classes.setDescription}>{set.getDescription()}</p>
                    <div className={classes.setAuthor}>
                        <img src={set.getProfilePic()} />
                        <a>{set.getAuthor()}</a>
                    </div>
                    <hr />
                </div>
            ))}
            {selectedSet && (
                <button className={classes.confirmButton} onClick={confirmSelection}>
                    Confirm
                </button>
            )}
        </div>
    );
};

export default SetChooser;
