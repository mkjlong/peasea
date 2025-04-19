import React, { createContext, useState, useContext, ReactNode } from "react";

interface SidebarContextProps {
    title: string;
    content: ReactNode;
    setSidebar: (title: string, content: ReactNode) => void;
}

const SidebarContext = createContext<SidebarContextProps>({
    title: "",
    content: null,
    setSidebar: () => {},
});

export const SidebarProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [title, setTitle] = useState<string>("PEASEA");
    const [content, setContent] = useState<ReactNode>(<></>);

    const setSidebar = (newTitle: string, newContent: ReactNode) => {
        setTitle(newTitle);
        setContent(newContent);
    };

    return (
        <SidebarContext.Provider value={{ title, content, setSidebar }}>
            {children}
        </SidebarContext.Provider>
    );
};

export const useSidebar = () => useContext(SidebarContext);
