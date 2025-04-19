import { PC } from "./PC";
import { FifthGroup, FirstGroup, FourthGroup, PCGroup, SecondGroup, SeventhGroup, SixthGroup, ThirdGroup } from "./PCGroup";

class Setup {
    public static testSetups = [
        new Setup({
            name: "See Z",
            setupFumen: "v115@HhglIeglCeR4Aei0hlAeR4zhg0JeAgH",
            solutionFumen: "v115@9ghlwhh0R4AtRpA8glwhg0R4BtRpA8glwhg0B8AtE8?whG8JeAgH",
            PCGroup: new SecondGroup("IJLS")
        }),
        new Setup({
            name: "See SZ",
            setupFumen: "v115@LhhlDeg0zhglBeR4i0BeglAeR4KeAgH",
            solutionFumen: "v115@9gRpzhh0hlRpBtB8g0R4glF8R4E8BtA8g0B8glJeAg?H",
            PCGroup: new SecondGroup("IJLS")
        }),
        new Setup({
            name: "Cradle",
            setupFumen: "v115@DhBthlGeBtglGeBtglDezhBtJeAgH",
            solutionFumen: "v115@DhD8GeC8GeC8DeF8JeAgH",
            PCGroup: new ThirdGroup("Z")
        }),
        new Setup({
            name: "use SZ",
            setupFumen: "v115@IgAAgH",
            solutionFumen: "v115@MgAAgH",
            PCGroup: new FifthGroup("LO")
        }),
        new Setup({
            name: "PCO",
            setupFumen: "v115@9gilEeR4glRpDeR4wwg0RpCeBtxwi0DeBtwwJeAgH",
            solutionFumen: "v115@vhAAgH",
            PCGroup: new FirstGroup("TIJLOSZ")
        }),
        new Setup({
            name: "AntiPCO",
            setupFumen: "v115@WgAAgH",
            solutionFumen: "v115@XgAAgH",
            PCGroup: new FourthGroup("TIJLSZ")
        }),
        new Setup({
            name: "Zed Setup",
            setupFumen: "v115@UgAAgH",
            solutionFumen: "v115@VgAAgH",
            PCGroup: new ThirdGroup("Z")
        }),
        new Setup({
            name: "Corner Cover",
            setupFumen: "v115@PgAAgH",
            solutionFumen: "v115@QgAAgH",
            PCGroup: new SixthGroup("IJLSTZ")
        }),
        new Setup({
            name: "3p",
            setupFumen: "v115@OgAAgH",
            solutionFumen: "v115@NgAAgH",
            PCGroup: new SeventhGroup("ILS")
        }),
        new Setup({
            name: "",
            setupFumen: "v115@YgAAgH",
            solutionFumen: "v115@ZgAAgH",
            PCGroup: new SecondGroup("LTJS")
        }),
    ];
    
    protected name: string;
    protected setupFumen: string;
    protected solutionFumen: string;
    protected PCGroup: PCGroup;

    constructor({name = "Unnamed Setup",setupFumen="v115@vhAAgH",solutionFumen="v115@vhAAgH",PCGroup}: {name: string;setupFumen: string;solutionFumen: string;PCGroup: PCGroup;}) {
        this.name = name;
        this.setupFumen = setupFumen;
        this.solutionFumen = solutionFumen;
        this.PCGroup = PCGroup;
    }

    // Getters
    public getName() { return this.name; }
    public getSetup() { return this.setupFumen; }
    public getSolution() { return this.solutionFumen; }
    public getPCGroup() { return this.PCGroup;}
}


export default Setup;