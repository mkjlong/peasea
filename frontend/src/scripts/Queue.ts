import { normalizedSort } from "./pieces";

export class Queue {
    public readonly value: string;

    constructor(value: string) {
        if (!this.validateQueue(value)) {
            throw new Error("Invalid queue format");
        }
        this.value = normalizedSort(value);
    }

    private validateQueue(value: string): boolean {
        // Ensure the queue only contains valid Tetris pieces (TIJLOSZ)
        return /^[TIJLOSZ]*$/.test(value);
    }

    public getLength(): number {
        return this.value.length;
    }

    public contains(piece: string): boolean {
        return this.value.includes(piece);
    }

    public getPieceCount(piece: string): number {
        return this.value.split("").filter(p => p === piece).length;
    }

    public toArray(): string[] {
        return this.value.split("");
    }

    public equals(otherQueue: Queue): boolean {
        return this.value === otherQueue.value;
    }

    public toString(): string {
        return this.value;
    }

    public static fromArray(pieces: string[]): Queue {
        const queueString = pieces.join("");
        return new Queue(queueString);
    }
}