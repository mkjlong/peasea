import classes from "./Redirect.module.css";

const Redirect = function({href}:{href:string}){
    document.location.href = href;
    return <div className={classes.redirect}>Redirecting to {href}...</div>

}

export default Redirect;