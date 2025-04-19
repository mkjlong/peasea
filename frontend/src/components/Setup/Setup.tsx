import React from "react";
import classes from "./Setup.module.css";

export default function Setup({ 
    title, 
    author, 
    profilePic, 
    methods, 
    setups, 
    cover, 
    description 
} : any) {
    return (
        <div className={classes.setup}>
            <div className={classes.info}>
                <div className={classes.title}>
                    <h3>{title}</h3>
                    <hr></hr>
                    <div className={classes.author}>
                        <img src={profilePic} alt="Profile" className={classes.profilePic} />
                        <p>{author}</p>
                    </div>
                </div>
                <div className={classes.stats}>
                    <div className={classes.statRow}>
                        <p>Methods</p>
                        <p>{methods}</p>
                    </div>
                    <div className={classes.statRow}>
                        <p>Setups</p>
                        <p>{setups}</p>
                    </div>
                    <div className={classes.statRow}>
                        <p>Cover</p>
                        <p>{cover}</p>
                    </div>
                </div>
            </div>
            <div className={classes.description}>
                <p>{description}</p>
            </div>
        </div>
    );
}
