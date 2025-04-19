import { useParams } from "react-router-dom";
import classes from "./MethodPage.module.css";
import { useEffect } from "react";
import { useSidebar } from "../../contexts/SidebarContext";
import { useNavbar } from "../../contexts/NavContext";
import SetChooser from "../../components/SetChooser/SetChooser";
import MethodChooser from "../../components/MethodChooser/MethodChooser";
import SetupPreview from "../../components/SetupPreview/SetupPreview";
import { PC } from "../../scripts/PC";
import Setup from "../../scripts/Setup";
import { PCGroup } from "../../scripts/PCGroup";
import { normalizedSort } from "../../scripts/pieces";

interface MethodPage {
    pc: PC;
}

const testSetups = Setup.testSetups;
const MethodPage = ({ pc }: MethodPage) => {
    const { setSidebar } = useSidebar();
    const { setNavbar } = useNavbar();
    const { queue } = useParams();

    const normalizedQueue = normalizedSort(queue ?? "");
    const pcGroup = PCGroup.from(queue ?? "");

    useEffect(() => {
        setSidebar(`${normalizedQueue} Methods`, <MethodChooser />);
        setNavbar(
            <>
                <a className={classes.link} href={`../${pc.getIter()}`}>{`${pc}`}</a> • {normalizedQueue}
            </>,
            <></>
        );
    }, []);

    // Filter setups that match this PCGroup queue
    const matchingSetups = testSetups.filter(setup =>
        setup.getPCGroup().getNormalizedQueue() === normalizedQueue
    );

    return (
        <div className={classes.methodPage}>
            <div className={classes.setupList}>
                {matchingSetups.map((setup, idx) => (
                    <SetupPreview key={idx} setup={setup} />
                ))}
            </div>
        </div>
    );
};
export default MethodPage