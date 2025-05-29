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
                            <Route path="/1" element={<Redirect href={"/1st"}/>} />
                            <Route path="/2nd" element={<SetPage pc={PC.SECOND} />} />
                            <Route path="/2" element={<Redirect href={"/2nd"}/>} />
                            <Route path="/3rd" element={<SetPage pc={PC.THIRD} />} />
                            <Route path="/3" element={<Redirect href={"/3rd"}/>} />
                            <Route path="/4th" element={<SetPage pc={PC.FOURTH} />} />
                            <Route path="/4" element={<Redirect href={"/4th"}/>} />
                            <Route path="/5th" element={<SetPage pc={PC.FIFTH} />} />
                            <Route path="/5" element={<Redirect href={"/5th"}/>} />
                            <Route path="/6th" element={<SetPage pc={PC.SIXTH} />} />
                            <Route path="/6" element={<Redirect href={"/6th"}/>} />
                            <Route path="/7th" element={<SetPage pc={PC.SEVENTH} />} />
                            <Route path="/7" element={<Redirect href={"/7th"}/>} />

                            <Route path="/1st/:queue" element={<MethodPage pc={PC.FIRST}/>} />
                            <Route path="/2nd/:queue" element={<MethodPage pc={PC.SECOND}/>} />
                            <Route path="/3rd/:queue" element={<MethodPage pc={PC.THIRD}/>} />
                            <Route path="/4th/:queue" element={<MethodPage pc={PC.FOURTH}/>} />
                            <Route path="/5th/:queue" element={<MethodPage pc={PC.FIFTH}/>} />
                            <Route path="/6th/:queue" element={<MethodPage pc={PC.SIXTH}/>} />
                            <Route path="/7th/:queue" element={<MethodPage pc={PC.SEVENTH}/>} />
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
