import { PC } from "./PC";
import { normalizedSort } from "./pieces";
import Tetrimino, { tetrimino, tetriminos } from "./Tetrimino";

export class PCGroup {
    private bag: Set<Tetrimino>;
    private duplicate?: Tetrimino;
    private code: number;

    constructor(arg: string | number) {
        if (/^\d+$/.test(arg.toString()) || typeof arg === "number") {
            if (typeof arg === "string" && /^\d+$/.test(arg)) {
                this.code = parseInt(arg, 10);
            } else if(typeof arg === "number") {
                this.code = arg;
            }else{
                throw new Error(`Invalid PCGroup argument: ${arg}`);
            }
            // abc = duplicate (bits 9-7), defghij = group (bits 6-0)
            let dupeBits = (this.code >> 7) & 0b111;
            let bagBits = this.code & 0b1111111;
            // Special case: both 0000000000 and 1111111000 are "first PC"
            if (this.code === 0 || this.code === 0b1111111000) {
                this.bag = new Set();
                this.duplicate = undefined;
                return;
            }
            // Invalid: all 1s with nonzero dupe
            if (bagBits === 0b1111111 && dupeBits !== 0) bagBits = 0b0000000;
            // Build group as Set<Tetrimino>
            let group = new Set<Tetrimino>();
            for (let i = 1; i <= 7; ++i) {
                if (bagBits & (1 << (7 - i))) {
                    group.add(tetrimino(i));
                }
            }
            this.bag = group;
            if (dupeBits > 0) {
                this.duplicate = tetrimino(dupeBits);
            }
        } else if (typeof arg === "string") {
            this.code = PCGroup.encodeQueue(arg);
            const pcGroup = new PCGroup(this.code);
            this.bag = pcGroup.bag;
            this.duplicate = pcGroup.duplicate;
        } else {
            throw new Error("Invalid constructor arguments");
        }
    }

    public static encodeQueue(str: string): number {
        let dupe = undefined;
        let bag = new Set<Tetrimino>();
        //get rid of all invalid PCGroup string formats
        str = str
            .toUpperCase()
            .replace(/[^JTSLIZO<>\-\+]/g, "")
            .replace("-", ">")
            .replace("+", "<");

        if (str.includes(">")) {
            //Format: X>YZ , X is the duplicate piece, YZ is the INVERTED bag.
            if (str.includes("<"))
                throw new Error("Invalid PCGroup string format");
            let [dupeString, bagString] = str.split(">");
            if (dupeString.length > 1 || bagString.length > 7)
                throw new Error("Invalid PCGroup string format");
            if (bagString.length === 0) bagString = "";
            dupe = tetrimino(dupeString);
            bag = new Set(tetriminos).difference(
                new Set<Tetrimino>(bagString.split("").map(tetrimino))
            );
            if (bag.size !== 7 - bagString.length)
                throw new Error("Invalid PCGroup string format");
        } else if (str.includes("<")) {
            if (str.includes(">"))
                throw new Error("Invalid PCGroup string format");
            //Format: X<YZ , X is the duplicate piece, YZ is the bag.
            let [dupeString, bagString] = str.split("<");
            if (dupeString.length > 1 || bagString.length > 7)
                throw new Error("Invalid PCGroup string format");
            dupe = tetrimino(dupeString);
            bag = new Set<Tetrimino>(bagString.split("").map(tetrimino));
            if (bag.size !== bagString.length)
                throw new Error("Invalid PCGroup string format");
        } else {
            //Queue only consists of tetriminos, there can be up to 1 duplicate.
            if (str.length > 7)
                throw new Error("Invalid PCGroup string format");
            dupe = undefined;
            bag = new Set<Tetrimino>();
            for (const t of str.split("").map(tetrimino)) {
                if (bag.has(t)) {
                    if (dupe)
                        throw new Error(
                            "Invalid PCGroup string format: duplicate piece found"
                        );
                    dupe = t;
                }
                bag.add(t);
            }
        }

        let dupeBits = 0;
        if (dupe) {
            dupeBits = dupe.index << 7;
        }
        let bagBits = 0;
        for (let i = 1; i <= 7; ++i) {
            if (bag.has(tetrimino(i))) {
                bagBits |= 1 << (7 - i);
            }
        }
        const result = dupeBits | bagBits;
        return result;
    }

    /**
     * Static: Mirror a PCGroup code and return a new PCGroup.
     */
    static mirror(code: number): PCGroup {
        // Swap a (bit 9) and d (bit 6)
        let a = (code >> 9) & 1;
        let d = (code >> 6) & 1;
        code = (code & ~(1 << 9)) | (d << 9);
        code = (code & ~(1 << 6)) | (a << 6);

        // Swap c (bit 7) and f (bit 4)
        let c = (code >> 7) & 1;
        let f = (code >> 4) & 1;
        code = (code & ~(1 << 7)) | (f << 7);
        code = (code & ~(1 << 4)) | (c << 4);

        // Swap h (bit 2) and j (bit 0)
        let h = (code >> 2) & 1;
        let j = (code >> 0) & 1;
        code = (code & ~(1 << 2)) | (j << 2);
        code = (code & ~(1 << 0)) | (h << 0);

        return new PCGroup(code);
    }

    /**
     * Instance: Mirror this PCGroup in-place and return this.
     */
    mirror(): this {
        let code = this.code;

        // Swap a (bit 9) and d (bit 6)
        let a = (code >> 9) & 1;
        let d = (code >> 6) & 1;
        code = (code & ~(1 << 9)) | (d << 9);
        code = (code & ~(1 << 6)) | (a << 6);

        // Swap c (bit 7) and f (bit 4)
        let c = (code >> 7) & 1;
        let f = (code >> 4) & 1;
        code = (code & ~(1 << 7)) | (f << 7);
        code = (code & ~(1 << 4)) | (c << 4);

        // Swap h (bit 2) and j (bit 0)
        let h = (code >> 2) & 1;
        let j = (code >> 0) & 1;
        code = (code & ~(1 << 2)) | (j << 2);
        code = (code & ~(1 << 0)) | (h << 0);

        // Reinitialize this PCGroup with the mirrored code
        const mirrored = new PCGroup(code);
        this.code = mirrored.code;
        this.bag = mirrored.bag;
        this.duplicate = mirrored.duplicate;
        return this;
    }

    public toString(): string {
        // Collect all piece letters from group and duplicate
        const piecesArr = Array.from(this.bag, (t) => t.toString());
        if (this.duplicate) {
            piecesArr.push(this.duplicate.toString());
        }
        return normalizedSort(piecesArr.join(""));
    }

    public getCode(): number {
        return this.code;
    }

    public getPC(): PC {
        const queueLength = this.bag.size + (this.duplicate ? 1 : 0);
        switch (queueLength) {
            case 0:
                return PC.FIRST;
            case 1:
                return PC.THIRD;
            case 2:
                return PC.FIFTH;
            case 3:
                return PC.SEVENTH;
            case 4:
                return PC.SECOND;
            case 5:
                return PC.FOURTH;
            case 6:
                return PC.SIXTH;
            case 7:
                return PC.FIRST;
            default:
                throw new Error("Invalid PCGroup");
        }
    }

    public equals(other: PCGroup): boolean {
        return this.getCode() === other.getCode();
    }
}
