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
import Set from "../../scripts/Set";
import { PCGroup } from "../../scripts/PCGroup";

interface SetPage {
    pc: PC;
}

const sets: Set[] = [
    new Set("Algebruh's 2nd", [], "algebruh", "This set is organized to minimize difficulty while maintaining reliability and usefulness."),
    new Set("2nd 100% T", [], "mkjl", "This set contains every 2nd PC that has a 100% chance of saving into T 3rd."),
    new Set("Theoretical 2nd", [], "xp3", "We know now that theoretically, T>I>J/L>O>S/Z for 3rd PC. We don't know how, but what would 2nd look like if we did?"),
    new Set("Beginner 2nd", [], "10Penta", "This is a 2nd PC doc truly oriented towards beginners just starting out and aiming to achieve their first 5-10PCs."),
];

const SetPage = ({ pc }: SetPage) => {
    const { setSidebar } = useSidebar();
    const { setNavbar } = useNavbar();
    const set = sets[0];
    document.title = pc.toString();

    const containerRef = useRef<HTMLDivElement>(null);
    const methodRefs = useRef<(HTMLDivElement | null)[]>([]);
    const methods: {method:Method,progress:number}[] = [];
    const pcGroups = pieces(`[**c7]c${pc.getBagLength()}`)

    
    for (let queue of pcGroups) {
        const pcGroup = new PCGroup(queue) // Create PCGroup from queue
        if (pcGroup) {
            methods.push({
                method: new Method("weewoo", pcGroup, []),
                progress: Math.random() < 0.2 ? ~~(Math.random() * 2) : Math.random(),
            });
        }
    }

    useEffect(() => {
        setSidebar("Sets", <SetChooser />);
        setNavbar(document.title, <></>);
    }, []);
    
    methods.sort((a, b) => b.progress - a.progress);

    return (
        <div className={classes.container} ref={containerRef}>
            {methods.filter(e=>e.progress===1).length}/{methods.length} complete
            {methods.map((method, i) =>
                <div
                    key={method.method.getPCGroup().getCode()}
                    ref={el => methodRefs.current[i] = el}
                >
                    <MethodPreview method={method.method} progress={method.progress} />
                </div>
            )}
        </div>
    );
};

export default SetPage