import Method from "../../scripts/Method";
import { PCGroup } from "../../scripts/PCGroup";
import classes from "./MethodPreview.module.css";

const MethodPreview = ({ method, progress }: { method: Method; progress: number }) => {
    function redirect() {
        document.location.href =  `/${method.getPCGroup().getCode()}`;
    }
    

    return (
        <div
          className={`${classes.methodPreview} ${progress === 1 ? classes.complete : ""}`}
          onClick={redirect}
          style={{ "--progress": `${progress * 100}%` } as React.CSSProperties}
        >
          <div className={classes.specificPC}>
            {method.getPCGroup().toString()} {/* Display PCGroup */}
          </div>
        </div>
    );
};

export default MethodPreview;