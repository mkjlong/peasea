import React, { createContext, useState, useContext, ReactNode } from "react";

interface NavbarContextProps {
    title: string|ReactNode;
    content: ReactNode;
    setNavbar: (title: string|ReactNode, content: ReactNode) => void;
}

const NavbarContext = createContext<NavbarContextProps>({
    title: "",
    content: null,
    setNavbar: () => {},
});

export const NavbarProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [title, setTitle] = useState<string|ReactNode>("PEASEA");
    const [content, setContent] = useState<ReactNode>(<></>);

    const setNavbar = (newTitle: string|ReactNode, newContent: ReactNode) => {
        setTitle(newTitle);
        setContent(newContent);
    };

    return (
        <NavbarContext.Provider value={{ title, content, setNavbar: setNavbar }}>
            {children}
        </NavbarContext.Provider>
    );
};

export const useNavbar = () => useContext(NavbarContext);
