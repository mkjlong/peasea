// src/components/SetupPreview/SetupPreview.tsx

import classes from "./SetupPreview.module.css";
import { Fumen } from "../Fumen/Fumen"; // assuming this is your field renderer
import Setup from "../../scripts/Setup";

interface SetupPreviewProps {
    setup: Setup;
}

const SETUPS = Setup.testSetups;

const SetupPreview = ({ setup }: SetupPreviewProps) => {
    return (
        <>
            <div className={classes.header}>{setup.getName()}</div>
            <div className={classes.preview}>
                <div className={classes.setupContainer}>
                    <Fumen className={classes.setupFumen} fumen={setup.getSetup()} showComments={false}></Fumen>
                </div>
                <div className={classes.solutionContainer}>
                    <h1 className={classes.solutionHeader}>
                        Solves
                    </h1>
                    <Fumen className={classes.solutionFumen} fumen={setup.getSolution()}></Fumen>
                </div>
            </div>
        </>
    );
};

export default SetupPreview;
