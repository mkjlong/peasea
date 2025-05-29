import { PC } from "./PC";
import { normalizedSort, pieces } from "./pieces";
import Tetrimino from "./Tetrimino";

export class PCGroup {
    private static pieceOrder = ['J', 'T', 'S', 'L', 'I', 'Z', 'O'];

    group: Set<Tetrimino>;
    duplicate?: Tetrimino;
    code: number;

    constructor(arg: number | string, access?: boolean) {
        if (typeof arg === "number") {
            if (!Number.isInteger(arg)) {
                throw new RangeError("PCGroup code must be an integer");
            }
            this.code = arg;
            // abc = duplicate (bits 9-7), defghij = group (bits 6-0)
            let dupeBits = (arg >> 7) & 0b111;
            let bagBits = arg & 0b1111111;
            // Special case: both 0000000000 and 1111111000 are "first PC"
            if (arg === 0 || arg === 0b1111111000) {
                this.group = new Set();
                this.duplicate = undefined;
                return;
            }
            // Invalid: all 1s with nonzero dupe
            if (bagBits === 0b1111111 && dupeBits !== 0) {
                throw new RangeError("PCGroup code invalid.");
            }
            // Build group as Set<Tetrimino>
            let group = new Set<Tetrimino>();
            for (let i = 0; i < 7; ++i) {
                if (bagBits & (1 << (6 - i))) {
                    group.add(new Tetrimino(PCGroup.pieceOrder[i] as any));
                }
            }
            this.group = group;
            if (dupeBits > 0) {
                this.duplicate = new Tetrimino(PCGroup.pieceOrder[dupeBits - 1] as any);
            }
        } else if (typeof arg === "string") {
            const queue = arg.toUpperCase();
            const seen = new Map<string, number>();
            for (const c of queue) {
                seen.set(c, (seen.get(c) ?? 0) + 1);
            }
            // Validate only valid pieces
            for (const c of seen.keys()) {
                if (!PCGroup.pieceOrder.includes(c)) {
                    throw new Error(`Invalid piece '${c}' in queue`);
                }
            }
            // Check for too many duplicates
            const dupes = Array.from(seen.entries()).filter(([_, v]) => v > 1);
            if (!access && dupes.length > 1) {
                throw new Error("Multiple duplicate pieces in queue");
            }
            if (!access && dupes.length === 1 && dupes[0][1] > 2) {
                throw new Error("More than two of the same piece in queue");
            }
            this.group = new Set<Tetrimino>();
            this.duplicate = undefined;
            if (access) {
                // First piece is duplicate, rest are group
                if (queue.length === 0) {
                    throw new Error("Queue string is empty");
                }
                this.duplicate = new Tetrimino(queue[0] as any);
                for (let i = 1; i < queue.length; ++i) {
                    this.group.add(new Tetrimino(queue[i] as any));
                }
            } else {
                // If there is a duplicate, one goes to duplicate, one to group
                let usedDuplicate = false;
                for (const c of queue) {
                    if (seen.get(c)! > 1 && !usedDuplicate) {
                        this.duplicate = new Tetrimino(c as any);
                        seen.set(c, seen.get(c)! - 1);
                        usedDuplicate = true;
                    } else {
                        this.group.add(new Tetrimino(c as any));
                    }
                }
            }
            // Set code (optional: you may want to implement encoding logic here)
            this.code = 0; // Placeholder, as code is not defined for string input
        } else {
            throw new Error("Invalid constructor arguments");
        }
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
        this.group = mirrored.group;
        this.duplicate = mirrored.duplicate;
        return this;
    }

    public toString(): string {
        // Collect all piece letters from group and duplicate
        const piecesArr = Array.from(this.group, t => t.toString());
        if (this.duplicate) {
            piecesArr.push(this.duplicate.toString());
        }
        return normalizedSort(piecesArr.join(""));
    }
}
