import React, { useRef, useState } from "react";
import {useSidebar} from "../../contexts/SidebarContext";
import classes from "./Sidebar.module.css";
import logo from "../../assets/logo.png";


const Sidebar: React.FC = () => {
    const { title, content } = useSidebar();
    const [sidebarWidth, setSidebarWidth] = useState<number>(0);
    const sidebarRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const [isResizing, setIsResizing] = useState<boolean>(false);

    const startResizing = (e: React.MouseEvent) => {
        setIsResizing(true);
        document.addEventListener("mousemove", resize, false);
        document.addEventListener("mouseup", stopResizing, false);
    };

    const stopResizing = () => {
        setIsResizing(false);
        document.removeEventListener("mousemove", resize, false);
        document.removeEventListener("mouseup", stopResizing, false);
    };

    const resize = (e: MouseEvent) => {
        const newWidth = window.innerWidth - e.clientX - 40;
        const titleWidth = titleRef.current?.scrollWidth ?? 0;
        
        if (newWidth >= titleWidth) {
            setSidebarWidth(newWidth);
        }else if(newWidth < 10){
            //here it should hide the sidebar entirely and display the logo
            setSidebarWidth(0)
        }else{
            setSidebarWidth(titleWidth)
        }
    };

    if(sidebarWidth==0){
        return <div className={classes.sidebar} ref={sidebarRef} style={{ padding:`0px` ,width: `${sidebarWidth}px`, userSelect: isResizing ? 'none' : 'auto' }}>
            <img className={classes.logo} src={logo} onClick={()=>{setSidebarWidth(350)}} alt="" />
            <h1 className={classes.title} ref={titleRef} style={{opacity: 0}}>{title} </h1>
            <hr />
        </div>
    }

    return (
        <div className={classes.sidebar} ref={sidebarRef} style={{ width: `${sidebarWidth}px`, userSelect: isResizing ? 'none' : 'auto' }}>
            <div className={classes.vbar} onMouseDown={startResizing}></div>
            <h1 className={classes.title} ref={titleRef}>{title}</h1>
            <hr />
            <div className={classes.content}>{content}</div>
        </div>
    );
};

export default Sidebar;
