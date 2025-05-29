import { PC } from "./PC";
import { PCGroup as number, PCGroup } from "./PCGroup";
class Setup {
    public static testSetups = [
        new Setup({
            name: "See Z",
            setupFumen: "v115@HhglIeglCeR4Aei0hlAeR4zhg0JeAgWHAT4UTAS4CC?A",
            solutionFumen: "v115@9ghlwhh0R4AtRpA8glwhg0R4BtRpA8glwhg0B8AtE8?whG8JeAgH",
            PCCode: 0b1011100000,
            success: ["*p3{Z<S}"],
            fails: ["[ST]!Z"],
        }),
        new Setup({
            name: "See SZ",
            setupFumen: "v115@LhhlDeg0zhglBeR4i0BeglAeR4KeAgH",
            solutionFumen: "v115@9gRpzhh0hlRpBtB8g0R4glF8R4E8BtA8g0B8glJeAg?H",
            PCCode: 0b1011100000,
        }),
        new Setup({
            name: "Cradle",
            setupFumen: "v115@DhBthlGeBtglGeBtglDezhBtJeAgH",
            solutionFumen: "v115@DhD8GeC8GeC8DeF8JeAgH",
            PCCode: 0b1011100000,
        }),
        new Setup({
            name: "use SZ",
            setupFumen: "v115@IgAAgH",
            solutionFumen: "v115@MgAAgH",
            PCCode: 0b0001001000,
        }),
        new Setup({
            name: "PCO",
            setupFumen: "v115@9gilEeR4glRpDeR4wwg0RpCeBtxwi0DeBtwwJeAgH",
            solutionFumen: "v115@vhAAgH",
            PCCode: 0b0,
        }),
        new Setup({
            name: "AntiPCO",
            setupFumen: "v115@WgAAgH",
            solutionFumen: "v115@XgAAgH",
            PCCode: 0b0
        }),
        new Setup({
            name: "Zed Setup",
            setupFumen: "v115@UgAAgH",
            solutionFumen: "v115@VgAAgH",
            PCCode: 0b0000010000
        }),
        new Setup({
            name: "Corner Cover",
            setupFumen: "v115@PgAAgH",
            solutionFumen: "v115@QgAAgH",
            PCCode: 0b1111110000,
        }),
        new Setup({
            name: "3p",
            setupFumen: "v115@OgAAgH",
            solutionFumen: "v115@NgAAgH",
            PCCode: 0b0001110000,
        }),
        new Setup({
            name: "",
            setupFumen: "v115@YgAAgH",
            solutionFumen: "v115@ZgAAgH",
            PCCode: 0b0011101000,
        }),
    ];
    
    protected name: string;
    protected setupFumen: string;
    protected solutionFumen: string;
    protected success: string[]|undefined;
    protected fails: string[]|undefined;
    protected PCGroup: PCGroup;

    constructor({name = "Unnamed Setup",setupFumen="v115@vhAAgH",solutionFumen="v115@vhAAgH", success, fails, PCCode}: {name: string;setupFumen: string;solutionFumen: string;success?: string[],fails?: string[]; PCCode: number;}) {
        this.name = name;
        this.setupFumen = setupFumen;
        this.solutionFumen = solutionFumen;
        this.success = success;
        this.fails = fails;
        this.PCGroup = new PCGroup(PCCode);
    }

    // Getters
    public getName() { return this.name; }
    public getSetup() { return this.setupFumen; }
    public getSolution() { return this.solutionFumen; }
    public getFails() {return this.fails; }
    public getPCGroup() { return this.PCGroup;}
}


export default Setup;