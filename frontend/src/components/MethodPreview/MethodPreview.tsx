import Method from "../../scripts/Method";
import classes from "./MethodPreview.module.css";



const MethodPreview = ({method, progress} : {method: Method, progress: number}) => {
    
    function redirect(){
        document.location.href+=(!document.location.href.endsWith("/")?"/":"")+`${method.getSpecificPC()}`;
        
    }

    return (
        <div
          className={`${classes.methodPreview} ${progress === 1 ? classes.complete : ""}`}
          onClick={redirect}
          style={{ "--progress": `${progress * 100}%` } as React.CSSProperties}
        >
          <div className={classes.specificPC}>
            {method.getSpecificPC()}
          </div>
        </div>
      );
      
}
export default MethodPreview;