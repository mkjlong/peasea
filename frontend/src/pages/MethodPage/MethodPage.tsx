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
import Redirect from "../Redirect/Redirect";

interface MethodPage {}

const testSetups = Setup.testSetups;
const MethodPage = () => {
    const { setSidebar } = useSidebar();
    const { setNavbar } = useNavbar();
    const { queue } = useParams();

    const pcGroup = new PCGroup(queue ?? "");

    if(queue !== pcGroup.getCode().toString()){
        return <Redirect href={`/${pcGroup.getCode()}`} />;
    }

    const pc = pcGroup.getPC();

    useEffect(() => {
        setSidebar(`${pcGroup} Methods`, <MethodChooser />);
        setNavbar(
            <>
                <a
                    className={classes.link}
                    href={`../${pc.getIter()}`}
                >{`${pc}`}</a>{" "}
                • {pcGroup.toString()}
            </>,
            <></>
        );
    }, []);

    console.log(`PCGroup code: ${pcGroup.getCode()}`);
    

    // Filter setups that match this PCGroup queue
    const matchingSetups = testSetups.filter((setup) => setup.getPCGroup().equals(pcGroup));

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
export default MethodPage;
