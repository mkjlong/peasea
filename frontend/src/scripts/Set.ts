import Method from "./Method";

class Set {
    private name: string;
    private description: string;
    private author: string;
    private createdAt: Date;

    private methods: Method[];
    private tags: string[];
    private isPublished: boolean;
    private isUserOwned: boolean;

    constructor(name: string, methods: Method[], author = "unknown", description = "") {
        this.name = name;
        this.methods = methods;
        this.author = author;
        this.description = description;
        this.createdAt = new Date();
        this.tags = [];
        this.isPublished = false;
        this.isUserOwned = false;
    }

    // ---- Basic Info ----
    setName(name: string) { this.name = name; }
    getName() { return this.name; }

    setDescription(desc: string) { this.description = desc; }
    getDescription() { return this.description; }

    getAuthor() { return this.author; }
    getCreatedAt() { return this.createdAt; }

    // ---- Tags & Flags ----
    setTags(tags: string[]) { this.tags = tags; }
    getTags() { return this.tags; }

    publish() { this.isPublished = true; }
    unpublish() { this.isPublished = false; }
    isSetPublished() { return this.isPublished; }

    setUserOwned(flag: boolean) { this.isUserOwned = flag; }
    isOwnedByUser() { return this.isUserOwned; }

    // ---- Method Management ----
    addMethod(method: Method) { this.methods.push(method); }

    removeMethodByName(methodName: string) {
        this.methods = this.methods.filter(m => m.getName() !== methodName);
    }

    replaceMethod(oldMethodName: string, newMethod: Method) {
        const index = this.methods.findIndex(m => m.getName() === oldMethodName);
        if (index !== -1) {
            this.methods[index] = newMethod;
        }
    }

    getMethods(): Method[] { return this.methods; }

    getMethodsByName(name: string): Method[] {
        return this.methods.filter(method => method.getName().toLowerCase().startsWith(name.toLowerCase()));
    }

    // ---- Progress + Stats ----
    getTotalCover(): number {
        return this.methods.reduce((sum, method) => sum + method.getTotalCover(), 0);
    }

    getAverageCover(): number {
        if (this.methods.length === 0) return 0;
        return this.getTotalCover() / this.methods.length;
    }

    getMethodCount(): number {
        return this.methods.length;
    }

    getCompletionRatio(): number {
        const completed = this.methods.filter(m => m.getTotalCover() >= 1.0);
        return completed.length / this.methods.length;
    }
}

export default Set;