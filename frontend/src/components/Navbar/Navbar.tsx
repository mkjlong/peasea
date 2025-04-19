import { useNavbar } from "../../contexts/NavContext";
import classes from "./Navbar.module.css";
const Nav = () =>{
    const { title, content } = useNavbar();
    return <div className={classes.navbar}>
        {title}
    </div>
}

export default Nav;