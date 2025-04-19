import Setup from "./Setup";

class Method {
    private name: string;
    private specificPC: string;
    private setups: Setup[];

    private totalCover: number;
    private prioCover: number;
    private cumCover: number;

    private discoveredBy: string;
    private discoveryLink: string;
    private timestamp: Date;

    private tags: string[];
    private difficulty: "easy" | "intermediate" | "advanced";

    private isOutdated: boolean;

    constructor(name: string, specificPC: string, setups: Setup[]) {
        this.name = name;
        this.specificPC = specificPC;
        this.setups = setups;

        this.totalCover = 0;
        this.prioCover = 0;
        this.cumCover = 0;

        this.discoveredBy = "";
        this.discoveryLink = "";
        this.timestamp = new Date();

        this.tags = [];
        this.difficulty = "intermediate";

        this.isOutdated = false;
    }

    // Existing methods
    setName(name: string) { this.name = name; }
    getName() { return this.name; }

    setSpecificPC(specificPC: string) { this.specificPC = specificPC; }
    getSpecificPC() { return this.specificPC; }

    addSetup(setup: Setup) { this.setups.push(setup); }
    getSetups(): Setup[] { return this.setups; }

    // New methods
    setTotalCover(cover: number) { this.totalCover = cover; }
    getTotalCover() { return this.totalCover; }

    setPrioCover(cover: number) { this.prioCover = cover; }
    getPrioCover() { return this.prioCover; }

    setCumulativeCover(cover: number) { this.cumCover = cover; }
    getCumulativeCover() { return this.cumCover; }

    setDiscoveryInfo(discoveredBy: string, link: string, timestamp: Date) {
        this.discoveredBy = discoveredBy;
        this.discoveryLink = link;
        this.timestamp = timestamp;
    }

    getDiscoveryInfo() {
        return {
            discoveredBy: this.discoveredBy,
            discoveryLink: this.discoveryLink,
            timestamp: this.timestamp,
        };
    }

    setDifficulty(difficulty: "easy" | "intermediate" | "advanced") {
        this.difficulty = difficulty;
    }
    getDifficulty() {
        return this.difficulty;
    }

    setTags(tags: string[]) { this.tags = tags; }
    getTags() { return this.tags; }

    markOutdated() { this.isOutdated = true; }
    isMarkedOutdated() { return this.isOutdated; }
}

export default Method;
