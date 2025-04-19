import MethodPage from "../MethodPage/MethodPage";
import classes from "./SetPage.module.css";
import Sidebar from "../../components/Sidebar/Sidebar";
import { Fumen } from "../../components/Fumen/Fumen";
import SetChooser from "../../components/SetChooser/SetChooser";
import { useEffect } from "react";
import { useSidebar } from "../../contexts/SidebarContext";
import { useNavbar } from "../../contexts/NavContext";
import Method from "../../scripts/Method";
import MethodPreview from "../../components/MethodPreview/MethodPreview";
import {sortByPCOrder, pieces, normalizedSort, normalizeInput, extractBracketedBlock, getCombinations} from "../../scripts/pieces";
import { useRef } from "react";
import { PC } from "../../scripts/PC";

interface SetPage {
    pc: PC;
}
const sets = [
    {
        title: "Algebruh's 2nd",
        pfp: "https://cdn.discordapp.com/avatars/554411603609518095/161d78efc00421e3a4e62425221f5311.webp?size=40",
        author: "algebruh",
        methods: "29/35",
        setups: 40,
        cover: "100%",
        description:
            "This set is organized to minimize difficulty while maintaining reliability and usefulness.",
    },
    {
        title: "2nd 100% T",
        pfp: "https://cdn.discordapp.com/avatars/402657980517974026/1f90c2454cdd8f7ad0111a83e66fc55a.webp?size=48",
        author: "mkjl",
        methods: "21/35",
        setups: 882,
        cover: "0.11%",
        description:
            "This set contains every 2nd PC that has a 100% chance of saving into T 3rd.",
    },
    {
        title: "Theoretical 2nd",
        pfp: "https://cdn.discordapp.com/avatars/427589146295664667/bfe2236004af8a55971181f3e629c4f3.webp?size=32",
        author: "xp3",
        methods: "342",
        setups: 352,
        cover: "100%",
        description:
            "We know now that theoretically, T>I>J/L>O>S/Z for 3rd PC. We don't know how, but what would 2nd look like if we did?",
    },
    {
        title: "Beginner 2nd",
        pfp: "https://cdn.discordapp.com/avatars/1050907244193136785/0e027c306413ba120f8bf01cc1558e36.webp?size=40",
        author: "10Penta",
        methods: "",
        setups: 0,
        cover: "0%",
        description:
            "This is a 2nd PC doc truly oriented towards beginners just starting out and aiming to achieve their first 5-10PCs.",
    },
];

const SetPage = ({ pc }: SetPage) => {
    const { setSidebar } = useSidebar();
    const { setNavbar } = useNavbar();
    const set = sets[0];
    document.title = pc.toString();

    const containerRef = useRef<HTMLDivElement>(null);
    const methodRefs = useRef<(HTMLDivElement | null)[]>([]);
    const methods: {method:Method,progress:number}[] = [];
    const pcGroups = pieces(`[X*]c${pc.getBagLength()}`)

    console.log(normalizedSort("SZT"));
    
    
    for (let second of pcGroups) {
        methods.push({
            method: new Method("weewoo", second, []),
            progress: Math.random() < 0.2 ? ~~(Math.random() * 2) : Math.random()
        });
    }

    useEffect(() => {
        setSidebar("Sets", <SetChooser />);
        setNavbar(document.title, <></>);
    }, []);

    console.log("hi");
    
    methods.sort((a, b) => b.progress - a.progress);

    console.log(pieces("[TS]c2"));

    return (
        <div className={classes.container} ref={containerRef}>
            {methods.map((method, i) =>
                <div
                    key={method.method.getSpecificPC()}
                    ref={el => methodRefs.current[i] = el}
                >
                    <MethodPreview method={method.method} progress={method.progress} />
                </div>
            )}
        </div>
    );
};

export default SetPage