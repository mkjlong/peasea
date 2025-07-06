import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import classes from "./App.module.css";
import HomePage from "./pages/HomePage/HomePage";
import SetPage from "./pages/SetPage/SetPage";
import MethodPage from "./pages/MethodPage/MethodPage";
import Sidebar from "./components/Sidebar/Sidebar"; // Import Sidebar
import { SidebarProvider } from "./contexts/SidebarContext";
import { NavbarProvider } from "./contexts/NavContext";
import Navbar from "./components/Navbar/Navbar";
import Redirect from "./pages/Redirect/Redirect";
import { PC } from "./scripts/PC";
import TestPage from "./pages/TestPage/TestPage";

function App() {
    return (
        <NavbarProvider>
            <SidebarProvider>
                <div className={classes.app}>
                    <div className={classes.content}>
                        <Routes>
                            <Route path="/" element={<HomePage />} />
                            <Route path="/test" element={<TestPage></TestPage>}></Route>
                            <Route path="/1st" element={<SetPage pc={PC.FIRST} />} />
                            <Route path="/2nd" element={<SetPage pc={PC.SECOND} />} />
                            <Route path="/3rd" element={<SetPage pc={PC.THIRD} />} />
                            <Route path="/4th" element={<SetPage pc={PC.FOURTH} />} />
                            <Route path="/5th" element={<SetPage pc={PC.FIFTH} />} />
                            <Route path="/6th" element={<SetPage pc={PC.SIXTH} />} />
                            <Route path="/7th" element={<SetPage pc={PC.SEVENTH} />} />

                            <Route path="/:queue" element={<MethodPage/>} />
                        </Routes>
                    </div>

                    <div className={classes.navbar}>
                        <Navbar />
                    </div>
                    <div className={classes.sidebar}>
                        <Sidebar />
                    </div>

                </div>
            </SidebarProvider>
        </NavbarProvider>
    );
}

export default App;
