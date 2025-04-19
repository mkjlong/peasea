import { PC } from "./PC";
import { normalizedSort, pieces } from "./pieces";

export abstract class PCGroup {
    private static FIRSTS = pieces(`[X*]c7`);
    private static SECONDS = pieces(`[X*]c4`);
    private static THIRDS = pieces(`[X*]`);
    private static FOURTHS = pieces(`[X*]5`);
    private static FIFTHS = pieces(`[X*]2`);
    private static SIXTHS = pieces(`[X*]c6`);
    private static SEVENTHS = pieces(`[X*]c3`);

    private queue: string;
    private normalizedQueue: string;
    private pc: PC;

    // Constructor to initialize the queue and PC
    constructor(queue: string, pc: PC) {
        this.queue = queue;
        this.normalizedQueue = normalizedSort(queue);
        this.pc = pc;
    }

    public getQueue():string {
        return this.queue;
    }

    public getNormalizedQueue():string {
        return this.normalizedQueue;
    }

    public getPC():PC {
        return this.pc;
    }

    // Method to validate if the queue matches the group
    private static validateQueue(queue: string): boolean {
        for(const char of queue) {
            if((queue.match(new RegExp(char))?.length??0) > 1){
                return false;
            }
        }
        return true;
    };

    // Factory method to create the appropriate group based on the queue
    static from(queue: string): PCGroup | null {
        let normalizedQueue = normalizedSort(queue)
        if(!this.validateQueue(normalizedQueue))return null;
        switch(normalizedQueue.length){
            case 7:
                return new FirstGroup(queue);
            case 4:
                return new SecondGroup(queue);
            case 1:
                return new ThirdGroup(queue);
            case 5:
                return new FourthGroup(queue);
            case 2:
                return new FifthGroup(queue);
            case 6:
                return new SixthGroup(queue);
            case 3:
                return new SeventhGroup(queue); 
        }
        return null;
    }
    
}
export class FirstGroup extends PCGroup {
    constructor(queue: string){
        super(queue,PC.FIRST);
    }
}
export class SecondGroup extends PCGroup {
    constructor(queue: string){
        super(queue,PC.SECOND);
    }
}
export class ThirdGroup extends PCGroup {
    constructor(queue: string){
        super(queue,PC.THIRD);
    }
}
export class FourthGroup extends PCGroup {
    constructor(queue: string){
        super(queue,PC.FOURTH);
    }
}
export class FifthGroup extends PCGroup {
    constructor(queue: string){
        super(queue,PC.FIFTH);
    }
}
export class SixthGroup extends PCGroup {
    constructor(queue: string){
        super(queue,PC.SIXTH);
    }
}
export class SeventhGroup extends PCGroup {
    constructor(queue: string){
        super(queue,PC.SEVENTH);
    }
}


